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
    ? employee.name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : 'E';

  return (
    <div className="animate-fade-in">
      {/* Back Button */}
      <button
        type="button"
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
          transition: 'color var(--transition-fast)',
        }}
      >
        <ChevronLeftIcon size={18} />
        <span>Back to Employees</span>
      </button>

      {/* Page Header */}
      <PageHeader
        title={employee.name}
        description={`Executive Employee Profile & Lifecycle Records (${employee.id})`}
        breadcrumb={`People / Directory / ${employee.id}`}
        actionButton={
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="nexus-btn-gold"
            style={{
              padding: '10px 20px',
              fontSize: '13.5px',
              borderRadius: 'var(--radius-md)',
            }}
          >
            Edit Profile
          </button>
        }
      />

      {/* Main Profile Header Card */}
      <div
        className="nexus-card"
        style={{
          padding: '28px 32px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '26px',
          flexWrap: 'wrap',
          background: 'linear-gradient(135deg, #FFFFFF 0%, var(--bg-surface-subtle) 100%)',
        }}
      >
        {/* Large Avatar */}
        <div
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '22px',
            background: employee.avatarColor
              ? `linear-gradient(135deg, ${employee.avatarColor} 0%, #171D38 100%)`
              : 'linear-gradient(135deg, var(--royal-indigo) 0%, var(--royal-violet) 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
            fontWeight: '800',
            border: '2px solid var(--champagne-gold)',
            boxShadow: 'var(--shadow-md)',
            flexShrink: 0,
          }}
        >
          {initials}
        </div>

        {/* Profile Identity Info */}
        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.025em' }}>
              {employee.name}
            </h2>
            <EmployeeStatusBadge status={employee.status} />
          </div>

          <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--royal-indigo)', marginTop: '4px' }}>
            {employee.jobTitle}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '10px', fontSize: '13px', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
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
          className="nexus-card"
          style={{
            padding: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingBottom: '14px',
              marginBottom: '18px',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--royal-indigo-light)',
                color: 'var(--royal-indigo)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UserIcon size={18} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>
              Personal Contact Details
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Work Email
              </div>
              <div style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '3px' }}>
                {employee.email}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Phone Number
              </div>
              <div style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '3px' }}>
                {employee.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Employment Details */}
        <div
          className="nexus-card"
          style={{
            padding: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingBottom: '14px',
              marginBottom: '18px',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--champagne-gold-light)',
                color: 'var(--champagne-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldIcon size={18} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>
              Employment Information
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Department
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '3px' }}>
                {employee.department}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Job Title
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '3px' }}>
                {employee.jobTitle}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Joining Date
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '3px' }}>
                {employee.joiningDate}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
