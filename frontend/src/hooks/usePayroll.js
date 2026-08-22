import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  getPayrollRecords,
  getPayrollStats,
  processPayroll,
} from '../services/payrollService';

export const usePayroll = () => {
  const [selectedMonth, setSelectedMonth] = useState('2026-08');
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [salaryRangeFilter, setSalaryRangeFilter] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPayrollRecords(selectedMonth);
      setRecords(data);
      const statsData = await getPayrollStats(data, selectedMonth);
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Failed to load payroll records.');
    } finally {
      setLoading(false);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Compute filtered records
  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      // Search
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.employeeName.toLowerCase().includes(term) ||
        item.employeeId.toLowerCase().includes(term) ||
        item.department.toLowerCase().includes(term);

      // Department
      const matchesDept =
        departmentFilter === 'All' ||
        item.department.toLowerCase() === departmentFilter.toLowerCase();

      // Status
      const matchesStatus =
        statusFilter === 'All' ||
        item.status.toLowerCase() === statusFilter.toLowerCase();

      // Salary Range
      let matchesSalary = true;
      const net = item.netSalary || 0;
      if (salaryRangeFilter === 'Below ₹25,000') {
        matchesSalary = net < 25000;
      } else if (salaryRangeFilter === '₹25,000 – ₹50,000') {
        matchesSalary = net >= 25000 && net <= 50000;
      } else if (salaryRangeFilter === '₹50,000 – ₹1,00,000') {
        matchesSalary = net > 50000 && net <= 100000;
      } else if (salaryRangeFilter === 'Above ₹1,00,000') {
        matchesSalary = net > 100000;
      }

      return matchesSearch && matchesDept && matchesStatus && matchesSalary;
    });
  }, [records, searchTerm, departmentFilter, statusFilter, salaryRangeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage, pageSize]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, departmentFilter, statusFilter, salaryRangeFilter, selectedMonth]);

  // Process Payroll Action
  const handleProcessPayroll = async () => {
    setLoading(true);
    try {
      const updated = await processPayroll(selectedMonth);
      setRecords(updated);
      const updatedStats = await getPayrollStats(updated, selectedMonth);
      setStats(updatedStats);
      return true;
    } catch (err) {
      setError('Failed to process payroll.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('All');
    setStatusFilter('All');
    setSalaryRangeFilter('All');
    setCurrentPage(1);
  };

  return {
    selectedMonth,
    setSelectedMonth,
    records,
    filteredRecords,
    paginatedRecords,
    stats,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    salaryRangeFilter,
    setSalaryRangeFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    totalRecordsCount: filteredRecords.length,
    resetFilters,
    processMonthPayroll: handleProcessPayroll,
    refresh: fetchData,
  };
};

export default usePayroll;
