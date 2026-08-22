// =============================================================================
// LEAVE SERVICE — Combined Admin (mock) + Employee (API)
// =============================================================================

// ── Admin Mock Leave Records (Member 3) ───────────────────────────────────────
const today = new Date().toISOString().split('T')[0];

let mockLeaveRecords = [
  {
    id: 'LV-0001', employeeId: 'EMP-001', employeeName: 'Alexander Wright',
    department: 'Engineering', leaveType: 'Sick Leave', startDate: today, endDate: today,
    days: 1, appliedOn: today, status: 'Pending', reason: 'Feeling unwell — doctor advised rest for today.',
    adminRemarks: '', avatarColor: '#1D4ED8', leaveBalance: { casual: 8, sick: 5, earned: 12 },
  },
  {
    id: 'LV-0002', employeeId: 'EMP-002', employeeName: 'Sophia Martinez',
    department: 'Human Resources', leaveType: 'Casual Leave', startDate: '2026-08-25', endDate: '2026-08-26',
    days: 2, appliedOn: '2026-08-20', status: 'Approved', reason: 'Family function to attend out of station.',
    adminRemarks: 'Approved. Adequate notice given.', avatarColor: '#059669', leaveBalance: { casual: 6, sick: 7, earned: 10 },
  },
  {
    id: 'LV-0003', employeeId: 'EMP-003', employeeName: 'Marcus Chen',
    department: 'Product Design', leaveType: 'Earned Leave', startDate: '2026-08-28', endDate: '2026-09-02',
    days: 5, appliedOn: '2026-08-18', status: 'Approved', reason: 'Annual vacation planned.',
    adminRemarks: 'Approved. Adequate handover completed.', avatarColor: '#D97706', leaveBalance: { casual: 10, sick: 6, earned: 7 },
  },
  {
    id: 'LV-0004', employeeId: 'EMP-004', employeeName: 'Emily Davis',
    department: 'Marketing', leaveType: 'Casual Leave', startDate: '2026-08-23', endDate: '2026-08-23',
    days: 1, appliedOn: '2026-08-21', status: 'Pending', reason: 'Personal work requiring physical presence.',
    adminRemarks: '', avatarColor: '#7C3AED', leaveBalance: { casual: 5, sick: 8, earned: 15 },
  },
  {
    id: 'LV-0005', employeeId: 'EMP-005', employeeName: 'David Kim',
    department: 'Finance', leaveType: 'Annual Leave', startDate: '2026-08-22', endDate: '2026-08-22',
    days: 1, appliedOn: '2026-08-19', status: 'Approved', reason: 'Pre-approved planned leave.',
    adminRemarks: 'Approved per schedule.', avatarColor: '#DC2626', leaveBalance: { casual: 4, sick: 3, earned: 9 },
  },
  {
    id: 'LV-0006', employeeId: 'EMP-006', employeeName: 'Sarah Jenkins',
    department: 'Engineering', leaveType: 'Sick Leave', startDate: '2026-08-24', endDate: '2026-08-25',
    days: 2, appliedOn: '2026-08-22', status: 'Pending', reason: 'Medical follow-up required after recent illness.',
    adminRemarks: '', avatarColor: '#2563EB', leaveBalance: { casual: 7, sick: 4, earned: 11 },
  },
  {
    id: 'LV-0007', employeeId: 'EMP-007', employeeName: 'Michael Chang',
    department: 'Operations', leaveType: 'Unpaid Leave', startDate: '2026-08-26', endDate: '2026-08-28',
    days: 3, appliedOn: '2026-08-15', status: 'Rejected', reason: 'Needed time off for relocation assistance.',
    adminRemarks: 'Rejected — critical project deadline. Please reschedule.', avatarColor: '#0891B2', leaveBalance: { casual: 2, sick: 6, earned: 8 },
  },
  {
    id: 'LV-0008', employeeId: 'EMP-008', employeeName: 'Elena Rostova',
    department: 'Product Design', leaveType: 'Casual Leave', startDate: '2026-08-27', endDate: '2026-08-27',
    days: 1, appliedOn: '2026-08-21', status: 'Pending', reason: 'Personal appointment scheduled.',
    adminRemarks: '', avatarColor: '#4F46E5', leaveBalance: { casual: 9, sick: 5, earned: 14 },
  },
];

export const getLeaveRequests = async () => {
  await new Promise((res) => setTimeout(res, 200));
  return [...mockLeaveRecords];
};

export const getLeaveById = async (id) => {
  await new Promise((res) => setTimeout(res, 150));
  const rec = mockLeaveRecords.find((r) => r.id === id);
  if (!rec) throw new Error(`Leave record ${id} not found.`);
  return { ...rec };
};

export const approveLeave = async (id, adminRemarks = '') => {
  await new Promise((res) => setTimeout(res, 250));
  mockLeaveRecords = mockLeaveRecords.map((rec) =>
    rec.id === id ? { ...rec, status: 'Approved', adminRemarks: adminRemarks || 'Approved by Admin.' } : rec
  );
  return mockLeaveRecords.find((r) => r.id === id);
};

export const rejectLeave = async (id, adminRemarks) => {
  if (!adminRemarks || !adminRemarks.trim()) {
    throw new Error('A rejection reason is required.');
  }
  await new Promise((res) => setTimeout(res, 250));
  mockLeaveRecords = mockLeaveRecords.map((rec) =>
    rec.id === id ? { ...rec, status: 'Rejected', adminRemarks: adminRemarks.trim() } : rec
  );
  return mockLeaveRecords.find((r) => r.id === id);
};

export const updateLeaveStatus = async (id, status) => {
  await new Promise((res) => setTimeout(res, 200));
  mockLeaveRecords = mockLeaveRecords.map((rec) =>
    rec.id === id ? { ...rec, status } : rec
  );
  return mockLeaveRecords.find((r) => r.id === id);
};

export const getLeaveStats = async (records) => {
  const list = records || mockLeaveRecords;
  const total = list.length;
  const pending = list.filter((r) => r.status === 'Pending').length;
  const approved = list.filter((r) => r.status === 'Approved').length;
  const rejected = list.filter((r) => r.status === 'Rejected').length;
  const todayStr = new Date().toISOString().split('T')[0];
  const onLeaveToday = list.filter(
    (r) => r.status === 'Approved' && r.startDate <= todayStr && r.endDate >= todayStr
  ).length;
  return { total, pending, approved, rejected, onLeaveToday };
};

// ── Employee API Leave Service (Member 4) ─────────────────────────────────────
import apiClient from './apiClient';
import { authService } from './authService';

export const leaveService = {
  async applyLeave(leaveData) {
    const user = authService.getCurrentUser();
    const payload = {
      employeeId: leaveData.employeeId || user?.id || 1,
      leaveType: leaveData.leaveType,
      startDate: leaveData.startDate,
      endDate: leaveData.endDate,
      reason: leaveData.reason || '',
    };
    const response = await apiClient.post('/api/leaves', payload);
    return response.data;
  },

  async getMyLeaves(employeeId) {
    const targetId = employeeId || authService.getCurrentUser()?.id || 1;
    const response = await apiClient.get(`/api/leaves/me?employeeId=${targetId}`);
    return response.data;
  },

  async getLeaveById(id) {
    const response = await apiClient.get(`/api/leaves/${id}`);
    return response.data;
  },
};
