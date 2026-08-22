import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  toggleEmployeeStatus
} from '../services/employeeService';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message || 'Failed to load employee records');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Compute filtered employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      // Search term matching (Name, ID, Email, Job Title)
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        emp.name.toLowerCase().includes(term) ||
        emp.id.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.jobTitle.toLowerCase().includes(term);

      // Department matching
      const matchesDept =
        departmentFilter === 'All' ||
        emp.department.toLowerCase() === departmentFilter.toLowerCase();

      // Status matching
      const matchesStatus =
        statusFilter === 'All' ||
        emp.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  const handleAddEmployee = async (newEmployeeData) => {
    try {
      const created = await createEmployee(newEmployeeData);
      setEmployees((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setError('Failed to add employee');
      throw err;
    }
  };

  const handleEditEmployee = async (id, updatedData) => {
    try {
      const updated = await updateEmployee(id, updatedData);
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? updated : emp))
      );
      return updated;
    } catch (err) {
      setError('Failed to update employee details');
      throw err;
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const updated = await toggleEmployeeStatus(id);
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? updated : emp))
      );
      return updated;
    } catch (err) {
      setError('Failed to change employee status');
      throw err;
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('All');
    setStatusFilter('All');
  };

  return {
    employees,
    filteredEmployees,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    resetFilters,
    addEmployee: handleAddEmployee,
    editEmployee: handleEditEmployee,
    toggleStatus: handleToggleStatus,
    refresh: fetchEmployees,
  };
};

export default useEmployees;
