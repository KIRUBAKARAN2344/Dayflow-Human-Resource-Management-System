// Mock Employee Records Data Layer
let mockEmployees = [
  {
    id: 'EMP-001',
    name: 'Alexander Wright',
    email: 'alexander.w@dayflow.com',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    jobTitle: 'Senior Software Engineer',
    joiningDate: '2023-01-15',
    status: 'Active',
    avatarColor: '#1D4ED8',
  },
  {
    id: 'EMP-002',
    name: 'Sophia Martinez',
    email: 'sophia.m@dayflow.com',
    phone: '+1 (555) 876-5432',
    department: 'Human Resources',
    jobTitle: 'HR Specialist',
    joiningDate: '2022-11-01',
    status: 'Active',
    avatarColor: '#059669',
  },
  {
    id: 'EMP-003',
    name: 'Marcus Chen',
    email: 'marcus.c@dayflow.com',
    phone: '+1 (555) 345-6789',
    department: 'Product Design',
    jobTitle: 'Lead Product Designer',
    joiningDate: '2023-03-20',
    status: 'Active',
    avatarColor: '#D97706',
  },
  {
    id: 'EMP-004',
    name: 'Emily Davis',
    email: 'emily.d@dayflow.com',
    phone: '+1 (555) 987-6543',
    department: 'Marketing',
    jobTitle: 'Marketing Manager',
    joiningDate: '2021-08-10',
    status: 'Active',
    avatarColor: '#7C3AED',
  },
  {
    id: 'EMP-005',
    name: 'David Kim',
    email: 'david.k@dayflow.com',
    phone: '+1 (555) 456-7890',
    department: 'Finance',
    jobTitle: 'Financial Analyst',
    joiningDate: '2022-04-18',
    status: 'Inactive',
    avatarColor: '#DC2626',
  },
  {
    id: 'EMP-006',
    name: 'Sarah Jenkins',
    email: 'sarah.j@dayflow.com',
    phone: '+1 (555) 654-3210',
    department: 'Engineering',
    jobTitle: 'Backend Developer',
    joiningDate: '2023-06-01',
    status: 'Active',
    avatarColor: '#2563EB',
  },
  {
    id: 'EMP-007',
    name: 'Michael Chang',
    email: 'michael.c@dayflow.com',
    phone: '+1 (555) 789-0123',
    department: 'Operations',
    jobTitle: 'Operations Coordinator',
    joiningDate: '2022-09-12',
    status: 'Active',
    avatarColor: '#0891B2',
  },
  {
    id: 'EMP-008',
    name: 'Elena Rostova',
    email: 'elena.r@dayflow.com',
    phone: '+1 (555) 890-1234',
    department: 'Product Design',
    jobTitle: 'UX Researcher',
    joiningDate: '2023-02-14',
    status: 'Active',
    avatarColor: '#4F46E5',
  },
];

export const getEmployees = async () => {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 200));
  return [...mockEmployees];
};

export const getEmployeeById = async (id) => {
  await new Promise((res) => setTimeout(res, 150));
  const emp = mockEmployees.find((e) => e.id === id);
  if (!emp) throw new Error(`Employee with ID ${id} not found`);
  return { ...emp };
};

export const createEmployee = async (data) => {
  await new Promise((res) => setTimeout(res, 250));
  const newEmp = {
    ...data,
    id: data.id || `EMP-00${mockEmployees.length + 1}`,
    avatarColor: data.avatarColor || '#171D38',
  };
  mockEmployees = [newEmp, ...mockEmployees];
  return { ...newEmp };
};

export const updateEmployee = async (id, data) => {
  await new Promise((res) => setTimeout(res, 250));
  mockEmployees = mockEmployees.map((emp) =>
    emp.id === id ? { ...emp, ...data } : emp
  );
  return mockEmployees.find((e) => e.id === id);
};

export const toggleEmployeeStatus = async (id) => {
  await new Promise((res) => setTimeout(res, 200));
  mockEmployees = mockEmployees.map((emp) =>
    emp.id === id
      ? { ...emp, status: emp.status === 'Active' ? 'Inactive' : 'Active' }
      : emp
  );
  return mockEmployees.find((e) => e.id === id);
};

export const deleteEmployee = async (id) => {
  await new Promise((res) => setTimeout(res, 200));
  mockEmployees = mockEmployees.filter((emp) => emp.id !== id);
  return true;
};
