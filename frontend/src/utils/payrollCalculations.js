/**
 * Reusable salary & payroll calculations
 */

export const calculateGrossSalary = (salary) => {
  const basic = Number(salary.basicSalary) || 0;
  const hra = Number(salary.hra) || 0;
  const transport = Number(salary.transportAllowance) || 0;
  const medical = Number(salary.medicalAllowance) || 0;
  const other = Number(salary.otherAllowances) || 0;
  return basic + hra + transport + medical + other;
};

export const calculateTotalAllowances = (salary) => {
  const hra = Number(salary.hra) || 0;
  const transport = Number(salary.transportAllowance) || 0;
  const medical = Number(salary.medicalAllowance) || 0;
  const other = Number(salary.otherAllowances) || 0;
  return hra + transport + medical + other;
};

export const calculateTotalDeductions = (salary) => {
  const pf = Number(salary.pf) || 0;
  const profTax = Number(salary.professionalTax) || 0;
  const incTax = Number(salary.incomeTax) || 0;
  const leaveDed = Number(salary.leaveDeduction) || 0;
  const otherDed = Number(salary.otherDeductions) || 0;
  return pf + profTax + incTax + leaveDed + otherDed;
};

export const calculateNetSalary = (salary) => {
  const gross = calculateGrossSalary(salary);
  const deductions = calculateTotalDeductions(salary);
  return gross - deductions;
};
