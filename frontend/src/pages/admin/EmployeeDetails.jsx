import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import EmployeeStatusBadge from '../../components/admin/employees/EmployeeStatusBadge';
import EmployeeForm from '../../components/admin/employees/EmployeeForm';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { getEmployeeById, updateEmployee } from '../../services/employeeService';
import { ChevronLeftIcon, UserIcon, ShieldIcon } from '../../components/common/Icons';

const EmployeeDetails = ({ employeeId, onNavigate }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract ID from URL path if not explicitly passed as prop
  const currentId =
    employeeId ||
    window.location.pathname.split('/admin/employees/')[1] ||
    'EMP-001';

  const fetchEmployeeData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployeeById(currentId);
      setEmployee(data);
    } catch (err) {
      setError(err.message || `Employee ${currentId} could not be loaded.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [currentId]);

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('/admin/employees');
    } else {
      window.history.pushState({}, '', '/admin/employees');
      window.dispatchEvent(new Event('popstate'));
    }
  };

  const handleEditSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const updated = await updateEmployee(currentId, formData);
      setEmployee(updated);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Failed to update employee details:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading message="Loading employee profile..." />;
  if (error || !employee) return <ErrorMessage message={error || 'Employee profile not found.'} onRetry={fetchEmployeeData} />;

  const initials = employee.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={handleBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'transparent',
          border: 'none',
          color: 'var(--royal-indigo)',
          fontSize: '13.5px',
          fontWeight: '700',
          cursor: 'pointer',
          marginBottom: '16px',
          padding: '6px 0',
        }}
      >
        <ChevronLeftIcon size={18} />
        <span>Back to Employees</span>
      </button>

      {/* Page Header */}
      <PageHeader
        title={employee.name}
        description={`Employee Profile & Records (${employee.id})`}
        breadcrumb={`People / Employees / ${employee.id}`}
        actionButton={
          <button
            onClick={() => setIsEditModalOpen(true)}
            style={{
              backgroundColor: 'var(--navy-deep)',
              color: 'var(--champagne-gold)',
              border: '1px solid var(--champagne-gold)',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '13.5px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            Edit Profile
          </button>
        }
      />

      {/* Main Profile Header Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-light)',
          padding: '28px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        {/* Large Avatar */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: employee.avatarColor || 'var(--royal-indigo)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: '800',
            border: '2px solid var(--champagne-gold)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            flexShrink: 0,
          }}
        >
          {initials}
        </div>

        {/* Profile Identity Info */}
        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              {employee.name}
            </h2>
            <EmployeeStatusBadge status={employee.status} />
          </div>

          <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--champagne-gold)', marginTop: '4px' }}>
            {employee.jobTitle}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
            <span>
              ID: <strong style={{ color: 'var(--royal-indigo)', fontFamily: 'monospace' }}>{employee.id}</strong>
            </span>
            <span>•</span>
            <span>
              Department: <strong style={{ color: 'var(--text-primary)' }}>{employee.department}</strong>
            </span>
            <span>•</span>
            <span>
              Joined: <strong style={{ color: 'var(--text-primary)' }}>{employee.joiningDate}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Information Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Card 1: Personal Information */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid var(--border-light)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingBottom: '14px',
              marginBottom: '18px',
              borderBottom: '1px solid var(--border-light)',
            }}
          >
            <UserIcon size={20} style={{ color: 'var(--royal-indigo)' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              Personal Contact Details
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                Work Email
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
                {employee.email}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                Phone Number
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
                {employee.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Employment Details */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid var(--border-light)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingBottom: '14px',
              marginBottom: '18px',
              borderBottom: '1px solid var(--border-light)',
            }}
          >
            <ShieldIcon size={20} style={{ color: 'var(--champagne-gold)' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              Employment Information
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                Department
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
                {employee.department}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                Job Title
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
                {employee.jobTitle}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                Joining Date
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
                {employee.joiningDate}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                Status
              </div>
              <div style={{ marginTop: '4px' }}>
                <EmployeeStatusBadge status={employee.status} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing Employee Profile */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Profile - ${employee.name} (${employee.id})`}
        maxWidth="640px"
      >
        <EmployeeForm
          initialValues={employee}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default EmployeeDetails;
