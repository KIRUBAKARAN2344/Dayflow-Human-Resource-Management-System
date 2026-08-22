import { useState, useEffect, useMemo, useCallback } from 'react';
import { getAttendanceRecords, getAttendanceStats } from '../services/attendanceService';

export const useAttendance = () => {
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('Today');
  const [customDate, setCustomDate] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [recsData, statsData] = await Promise.all([
        getAttendanceRecords(),
        getAttendanceStats(),
      ]);
      setRecords(recsData);
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Failed to load attendance records');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Compute filtered records
  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      // Search term matching (Name, ID)
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.employeeName.toLowerCase().includes(term) ||
        item.employeeId.toLowerCase().includes(term) ||
        item.department.toLowerCase().includes(term);

      // Department matching
      const matchesDept =
        departmentFilter === 'All' ||
        item.department.toLowerCase() === departmentFilter.toLowerCase();

      // Status matching
      const matchesStatus =
        statusFilter === 'All' ||
        item.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [records, searchTerm, departmentFilter, statusFilter]);

  // Compute pagination
  const totalPages = Math.ceil(filteredRecords.length / pageSize) || 1;

  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage, pageSize]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFilter, customDate, departmentFilter, statusFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setDateFilter('Today');
    setCustomDate('');
    setDepartmentFilter('All');
    setStatusFilter('All');
    setCurrentPage(1);
  };

  return {
    records,
    filteredRecords,
    paginatedRecords,
    stats,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    dateFilter,
    setDateFilter,
    customDate,
    setCustomDate,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    totalRecordsCount: filteredRecords.length,
    resetFilters,
    refresh: fetchData,
  };
};

export default useAttendance;
