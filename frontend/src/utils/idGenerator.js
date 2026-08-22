/**
 * Generates an automatic Login ID according to the Dayflow HRMS specification:
 * Format: [Company Initials] + [First 2 letters of First Name & Last Name] + [Joining Year] + [4-digit Serial]
 * Example: Odoo India + John Doe + 2022 + 1 => "OIJODO20220001"
 */
export const generateLoginId = (
  companyName = 'Odoo India',
  fullName = 'John Doe',
  joiningYear = new Date().getFullYear(),
  serial = 1
) => {
  // 1. Company Initials (e.g. "Odoo India" -> "OI", "Dayflow" -> "DF")
  let compInitials = 'DF';
  if (companyName && companyName.trim()) {
    const compParts = companyName.trim().split(/\s+/);
    if (compParts.length >= 2) {
      compInitials = (compParts[0][0] + compParts[1][0]).toUpperCase();
    } else {
      compInitials = compParts[0].slice(0, 2).toUpperCase();
    }
  }

  // 2. First 2 letters of First Name + First 2 letters of Last Name
  let nameCode = 'EEMP';
  if (fullName && fullName.trim()) {
    const nameParts = fullName.trim().split(/\s+/);
    if (nameParts.length >= 2) {
      const firstPart = (nameParts[0] + 'XX').slice(0, 2).toUpperCase();
      const lastPart = (nameParts[nameParts.length - 1] + 'XX').slice(0, 2).toUpperCase();
      nameCode = firstPart + lastPart;
    } else {
      nameCode = (nameParts[0] + 'XXXX').slice(0, 4).toUpperCase();
    }
  }

  // 3. Year
  const yearStr = String(joiningYear || new Date().getFullYear());

  // 4. 4-digit Serial Number (e.g. 1 -> "0001")
  const serialStr = String(serial).padStart(4, '0');

  return `${compInitials}${nameCode}${yearStr}${serialStr}`;
};

/**
 * Generates a temporary initial password for new employees
 */
export const generateInitialPassword = (fullName = 'Employee', year = new Date().getFullYear()) => {
  const cleanName = fullName.split(' ')[0].replace(/[^a-zA-Z]/g, '') || 'User';
  return `${cleanName}@${year}#temp`;
};
