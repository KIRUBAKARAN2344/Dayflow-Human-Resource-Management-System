import {
  calculateGrossSalary,
  calculateTotalAllowances,
  calculateTotalDeductions,
  calculateNetSalary,
} from '../utils/payrollCalculations';

// Mock Payroll Database Layer
let mockPayrollData = {
  '2026-08': [
    {
      id: 'PAY-2608-01',
      employeeId: 'EMP-001',
      employeeName: 'Alexander Wright',
      department: 'Engineering',
      designation: 'Senior Software Engineer',
      month: '2026-08',
      basicSalary: 65000,
      hra: 18000,
      transportAllowance: 4000,
      medicalAllowance: 2500,
      otherAllowances: 3500,
      pf: 7800,
      professionalTax: 200,
      incomeTax: 5500,
      leaveDeduction: 0,
      otherDeductions: 1000,
      status: 'Processed',
      avatarColor: '#1D4ED8',
    },
    {
      id: 'PAY-2608-02',
      employeeId: 'EMP-002',
      employeeName: 'Sophia Martinez',
      department: 'Human Resources',
      designation: 'HR Specialist',
      month: '2026-08',
      basicSalary: 42000,
      hra: 12000,
      transportAllowance: 3000,
      medicalAllowance: 2000,
      otherAllowances: 2000,
      pf: 5040,
      professionalTax: 200,
      incomeTax: 2500,
      leaveDeduction: 0,
      otherDeductions: 500,
      status: 'Processed',
      avatarColor: '#059669',
    },
    {
      id: 'PAY-2608-03',
      employeeId: 'EMP-003',
      employeeName: 'Marcus Chen',
      department: 'Product Design',
      designation: 'Lead Product Designer',
      month: '2026-08',
      basicSalary: 58000,
      hra: 16000,
      transportAllowance: 3500,
      medicalAllowance: 2000,
      otherAllowances: 3000,
      pf: 6960,
      professionalTax: 200,
      incomeTax: 4200,
      leaveDeduction: 0,
      otherDeductions: 800,
      status: 'Pending',
      avatarColor: '#D97706',
    },
    {
      id: 'PAY-2608-04',
      employeeId: 'EMP-004',
      employeeName: 'Emily Davis',
      department: 'Marketing',
      designation: 'Marketing Manager',
      month: '2026-08',
      basicSalary: 48000,
      hra: 14000,
      transportAllowance: 3000,
      medicalAllowance: 2000,
      otherAllowances: 2500,
      pf: 5760,
      professionalTax: 200,
      incomeTax: 3100,
      leaveDeduction: 0,
      otherDeductions: 500,
      status: 'Processed',
      avatarColor: '#7C3AED',
    },
    {
      id: 'PAY-2608-05',
      employeeId: 'EMP-005',
      employeeName: 'David Kim',
      department: 'Finance',
      designation: 'Financial Analyst',
      month: '2026-08',
      basicSalary: 45000,
      hra: 13000,
      transportAllowance: 3000,
      medicalAllowance: 2000,
      otherAllowances: 2000,
      pf: 5400,
      professionalTax: 200,
      incomeTax: 2800,
      leaveDeduction: 1500,
      otherDeductions: 500,
      status: 'Pending',
      avatarColor: '#DC2626',
    },
    {
      id: 'PAY-2608-06',
      employeeId: 'EMP-006',
      employeeName: 'Sarah Jenkins',
      department: 'Engineering',
      designation: 'Backend Developer',
      month: '2026-08',
      basicSalary: 52000,
      hra: 15000,
      transportAllowance: 3500,
      medicalAllowance: 2000,
      otherAllowances: 2500,
      pf: 6240,
      professionalTax: 200,
      incomeTax: 3600,
      leaveDeduction: 0,
      otherDeductions: 600,
      status: 'Processed',
      avatarColor: '#2563EB',
    },
    {
      id: 'PAY-2608-07',
      employeeId: 'EMP-007',
      employeeName: 'Michael Chang',
      department: 'Operations',
      designation: 'Operations Coordinator',
      month: '2026-08',
      basicSalary: 35000,
      hra: 10000,
      transportAllowance: 2500,
      medicalAllowance: 1500,
      otherAllowances: 1500,
      pf: 4200,
      professionalTax: 200,
      incomeTax: 1200,
      leaveDeduction: 2000,
      otherDeductions: 400,
      status: 'Pending',
      avatarColor: '#0891B2',
    },
    {
      id: 'PAY-2608-08',
      employeeId: 'EMP-008',
      employeeName: 'Elena Rostova',
      department: 'Product Design',
      designation: 'UX Researcher',
      month: '2026-08',
      basicSalary: 46000,
      hra: 13500,
      transportAllowance: 3000,
      medicalAllowance: 2000,
      otherAllowances: 2000,
      pf: 5520,
      professionalTax: 200,
      incomeTax: 2900,
      leaveDeduction: 0,
      otherDeductions: 500,
      status: 'Processed',
      avatarColor: '#4F46E5',
    },
  ],
  '2026-07': [
    {
      id: 'PAY-2607-01',
      employeeId: 'EMP-001',
      employeeName: 'Alexander Wright',
      department: 'Engineering',
      designation: 'Senior Software Engineer',
      month: '2026-07',
      basicSalary: 65000,
      hra: 18000,
      transportAllowance: 4000,
      medicalAllowance: 2500,
      otherAllowances: 3500,
      pf: 7800,
      professionalTax: 200,
      incomeTax: 5500,
      leaveDeduction: 0,
      otherDeductions: 1000,
      status: 'Processed',
      avatarColor: '#1D4ED8',
    },
    {
      id: 'PAY-2607-02',
      employeeId: 'EMP-002',
      employeeName: 'Sophia Martinez',
      department: 'Human Resources',
      designation: 'HR Specialist',
      month: '2026-07',
      basicSalary: 42000,
      hra: 12000,
      transportAllowance: 3000,
      medicalAllowance: 2000,
      otherAllowances: 2000,
      pf: 5040,
      professionalTax: 200,
      incomeTax: 2500,
      leaveDeduction: 0,
      otherDeductions: 500,
      status: 'Processed',
      avatarColor: '#059669',
    },
    {
      id: 'PAY-2607-03',
      employeeId: 'EMP-003',
      employeeName: 'Marcus Chen',
      department: 'Product Design',
      designation: 'Lead Product Designer',
      month: '2026-07',
      basicSalary: 58000,
      hra: 16000,
      transportAllowance: 3500,
      medicalAllowance: 2000,
      otherAllowances: 3000,
      pf: 6960,
      professionalTax: 200,
      incomeTax: 4200,
      leaveDeduction: 0,
      otherDeductions: 800,
      status: 'Processed',
      avatarColor: '#D97706',
    },
    {
      id: 'PAY-2607-04',
      employeeId: 'EMP-004',
      employeeName: 'Emily Davis',
      department: 'Marketing',
      designation: 'Marketing Manager',
      month: '2026-07',
      basicSalary: 48000,
      hra: 14000,
      transportAllowance: 3000,
      medicalAllowance: 2000,
      otherAllowances: 2500,
      pf: 5760,
      professionalTax: 200,
      incomeTax: 3100,
      leaveDeduction: 0,
      otherDeductions: 500,
      status: 'Processed',
      avatarColor: '#7C3AED',
    },
  ],
};

// API Preparation Functions

export const getPayrollRecords = async (month = '2026-08') => {
  await new Promise((res) => setTimeout(res, 200));
  const list = mockPayrollData[month] || mockPayrollData['2026-08'];
  // Enrich with computed salary fields
  return list.map((record) => ({
    ...record,
    grossSalary: calculateGrossSalary(record),
    totalAllowances: calculateTotalAllowances(record),
    totalDeductions: calculateTotalDeductions(record),
    netSalary: calculateNetSalary(record),
  }));
};

export const getPayrollById = async (id) => {
  await new Promise((res) => setTimeout(res, 150));
  for (const m in mockPayrollData) {
    const found = mockPayrollData[m].find((r) => r.id === id);
    if (found) {
      return {
        ...found,
        grossSalary: calculateGrossSalary(found),
        totalAllowances: calculateTotalAllowances(found),
        totalDeductions: calculateTotalDeductions(found),
        netSalary: calculateNetSalary(found),
      };
    }
  }
  throw new Error(`Payroll record ${id} not found.`);
};

export const processPayroll = async (month = '2026-08') => {
  await new Promise((res) => setTimeout(res, 300));
  if (mockPayrollData[month]) {
    mockPayrollData[month] = mockPayrollData[month].map((rec) => ({
      ...rec,
      status: 'Processed',
    }));
  }
  return getPayrollRecords(month);
};

export const updateSalaryDetails = async (employeeId, data) => {
  await new Promise((res) => setTimeout(res, 200));
  for (const m in mockPayrollData) {
    mockPayrollData[m] = mockPayrollData[m].map((r) =>
      r.employeeId === employeeId ? { ...r, ...data } : r
    );
  }
  return true;
};

export const getPayrollStats = async (records = [], month = '2026-08') => {
  await new Promise((res) => setTimeout(res, 100));
  const totalEmployees = records.length;
  const totalGross = records.reduce((acc, r) => acc + (r.grossSalary || 0), 0);
  const totalDeductions = records.reduce((acc, r) => acc + (r.totalDeductions || 0), 0);
  const totalNet = records.reduce((acc, r) => acc + (r.netSalary || 0), 0);
  
  const pendingCount = records.filter((r) => r.status === 'Pending').length;
  const processedCount = records.filter((r) => r.status === 'Processed').length;
  
  let overallStatus = 'Processed';
  if (pendingCount === totalEmployees) {
    overallStatus = 'Draft';
  } else if (pendingCount > 0) {
    overallStatus = 'Processing';
  }

  const salaries = records.map((r) => r.netSalary || 0);
  const avgSalary = totalEmployees > 0 ? Math.round(totalNet / totalEmployees) : 0;
  const highestSalary = salaries.length > 0 ? Math.max(...salaries) : 0;
  const lowestSalary = salaries.length > 0 ? Math.min(...salaries) : 0;

  // Department Breakdown
  const deptMap = {};
  records.forEach((r) => {
    const d = r.department || 'Other';
    if (!deptMap[d]) {
      deptMap[d] = { department: d, totalNet: 0, employeeCount: 0 };
    }
    deptMap[d].totalNet += r.netSalary || 0;
    deptMap[d].employeeCount += 1;
  });

  const departmentBreakdown = Object.values(deptMap);

  return {
    totalEmployees,
    totalGross,
    totalDeductions,
    totalNet,
    overallStatus,
    pendingCount,
    processedCount,
    avgSalary,
    highestSalary,
    lowestSalary,
    departmentBreakdown,
    month,
  };
};
