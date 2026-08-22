import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  getLeaveRequests,
  approveLeave,
  rejectLeave,
  getLeaveStats,
} from '../services/leaveService';

export const useLeave = () => {
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLeaveRequests();
      setRecords(data);
      const statsData = await getLeaveStats(data);
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Failed to load leave requests.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Recompute stats whenever records change
  const recomputeStats = (updatedRecords) => {
    getLeaveStats(updatedRecords).then(setStats);
  };

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.employeeName.toLowerCase().includes(term) ||
        item.employeeId.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === 'All' ||
        item.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesType =
        leaveTypeFilter === 'All' ||
        item.leaveType.toLowerCase() === leaveTypeFilter.toLowerCase();

      const matchesDept =
        departmentFilter === 'All' ||
        item.department.toLowerCase() === departmentFilter.toLowerCase();

      // Date filter
      const today = new Date().toISOString().split('T')[0];
      let matchesDate = true;
      if (dateFilter === 'Today') {
        matchesDate = item.appliedOn === today || item.startDate === today;
      } else if (dateFilter === 'This Week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekAgoStr = weekAgo.toISOString().split('T')[0];
        matchesDate = item.appliedOn >= weekAgoStr;
      } else if (dateFilter === 'This Month') {
        const monthStr = today.substring(0, 7);
        matchesDate = item.appliedOn.startsWith(monthStr);
      }

      return matchesSearch && matchesStatus && matchesType && matchesDept && matchesDate;
    });
  }, [records, searchTerm, statusFilter, leaveTypeFilter, departmentFilter, dateFilter]);

  const totalPages = Math.ceil(filteredRecords.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage, pageSize]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, leaveTypeFilter, departmentFilter, dateFilter]);

  const handleApprove = async (id, adminRemarks = '') => {
    try {
      const updated = await approveLeave(id, adminRemarks);
      const updatedRecords = records.map((r) => (r.id === id ? updated : r));
      setRecords(updatedRecords);
      recomputeStats(updatedRecords);
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const handleReject = async (id, adminRemarks) => {
    try {
      const updated = await rejectLeave(id, adminRemarks);
      const updatedRecords = records.map((r) => (r.id === id ? updated : r));
      setRecords(updatedRecords);
      recomputeStats(updatedRecords);
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setLeaveTypeFilter('All');
    setDepartmentFilter('All');
    setDateFilter('All');
    setCurrentPage(1);
  };

  return {
    records,
    filteredRecords,
    paginatedRecords,
    stats,
    loading,
    error,
    searchTerm, setSearchTerm,
    statusFilter, setStatusFilter,
    leaveTypeFilter, setLeaveTypeFilter,
    departmentFilter, setDepartmentFilter,
    dateFilter, setDateFilter,
    currentPage, setCurrentPage,
    totalPages,
    pageSize,
    totalRecordsCount: filteredRecords.length,
    resetFilters,
    approveRequest: handleApprove,
    rejectRequest: handleReject,
    refresh: fetchData,
  };
};

export default useLeave;
