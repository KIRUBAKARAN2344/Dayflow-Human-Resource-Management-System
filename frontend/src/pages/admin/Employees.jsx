import React, { useState } from 'react';
import useEmployees from '../../hooks/useEmployees';
import PageHeader from '../../components/common/PageHeader';
import EmployeeTable from '../../components/admin/employees/EmployeeTable';
import EmployeeSearch from '../../components/admin/employees/EmployeeSearch';
import EmployeeFilters from '../../components/admin/employees/EmployeeFilters';
import EmployeeForm from '../../components/admin/employees/EmployeeForm';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { PlusIcon, EmployeesIcon } from '../../components/common/Icons';

const Employees = ({ onNavigate }) => {
  const {
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
    addEmployee,
    editEmployee,
    toggleStatus,
  } = useEmployees();

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status Change Confirmation State
  const [confirmingEmployee, setConfirmingEmployee] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (emp) => {
    setEditingEmployee(emp);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingEmployee(null);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingEmployee) {
        await editEmployee(editingEmployee.id, formData);
      } else {
        await addEmployee(formData);
      }
      handleCloseFormModal();
    } catch (err) {
      console.error('Form submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenToggleStatus = (emp) => {
    setConfirmingEmployee(emp);
    setIsConfirmOpen(true);
  };

  const handleConfirmToggleStatus = async () => {
    if (confirmingEmployee) {
      await toggleStatus(confirmingEmployee.id);
      setConfirmingEmployee(null);
    }
  };

  const handleViewDetails = (emp) => {
    const targetPath = `/admin/employees/${emp.id}`;
    if (onNavigate) {
      onNavigate(targetPath);
    } else {
      window.history.pushState({}, '', targetPath);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  const totalCount = employees.length;
  const activeCount = employees.filter((e) => e.status === 'Active').length;
  const inactiveCount = employees.filter((e) => e.status === 'Inactive').length;

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Employee Directory"
        description="Manage workforce records, profiles, and employment status."
        breadcrumb="People / Employees"
        actionButton={
          <button
            onClick={handleOpenAdd}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--navy-deep)',
              color: 'var(--champagne-gold)',
              border: '1px solid var(--champagne-gold)',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '13.5px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--royal-indigo)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy-deep)')}
          >
            <PlusIcon size={16} />
            <span>Add Employee</span>
          </button>
        }
      />

      {/* Summary KPI Badges Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            padding: '10px 16px',
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <EmployeesIcon size={18} style={{ color: 'var(--royal-indigo)' }} />
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total Employees:</span>
          <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{totalCount}</strong>
        </div>

        <div
          style={{
            padding: '10px 16px',
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--status-success)' }} />
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Active:</span>
          <strong style={{ fontSize: '15px', color: 'var(--status-success)' }}>{activeCount}</strong>
        </div>

        <div
          style={{
            padding: '10px 16px',
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-muted)' }} />
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Inactive:</span>
          <strong style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>{inactiveCount}</strong>
        </div>
      </div>

      {/* Toolbar: Search + Filters */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <EmployeeSearch value={searchTerm} onChange={setSearchTerm} />
        <EmployeeFilters
          departmentFilter={departmentFilter}
          onDepartmentChange={setDepartmentFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onReset={resetFilters}
        />
      </div>

      {/* Loading & Error States */}
      {loading && <Loading message="Loading employee directory..." />}
      {error && <ErrorMessage message={error} />}

      {/* Main Employee Table */}
      {!loading && (
        <EmployeeTable
          employees={filteredEmployees}
          onView={handleViewDetails}
          onEdit={handleOpenEdit}
          onToggleStatus={handleOpenToggleStatus}
          onResetFilters={resetFilters}
        />
      )}

      {/* Add / Edit Employee Modal Form */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={editingEmployee ? `Edit Employee (${editingEmployee.id})` : 'Add New Employee'}
        maxWidth="640px"
      >
        <EmployeeForm
          initialValues={editingEmployee}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseFormModal}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Status Toggle Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmToggleStatus}
        title={confirmingEmployee?.status === 'Active' ? 'Deactivate Employee' : 'Activate Employee'}
        message={
          confirmingEmployee
            ? `Are you sure you want to change status for ${confirmingEmployee.name} (${confirmingEmployee.id}) to ${
                confirmingEmployee.status === 'Active' ? 'Inactive' : 'Active'
              }?`
            : ''
        }
        confirmText={confirmingEmployee?.status === 'Active' ? 'Deactivate' : 'Activate'}
        isDanger={confirmingEmployee?.status === 'Active'}
      />
    </div>
  );
};

export default Employees;
