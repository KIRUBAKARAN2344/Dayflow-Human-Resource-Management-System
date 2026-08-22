import React, { useState, useEffect } from 'react';
import { isValidEmail, isValidPhone, isRequired } from '../../../utils/validators';

const EmployeeForm = ({ initialValues, onSubmit, onCancel, isSubmitting = false }) => {
  const isEditMode = Boolean(initialValues && initialValues.id);

  const [formData, setFormData] = useState({
    name: '',
    id: '',
    email: '',
    phone: '',
    department: 'Engineering',
    jobTitle: '',
    joiningDate: new Date().toISOString().split('T')[0],
    status: 'Active',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || '',
        id: initialValues.id || '',
        email: initialValues.email || '',
        phone: initialValues.phone || '',
        department: initialValues.department || 'Engineering',
        jobTitle: initialValues.jobTitle || '',
        joiningDate: initialValues.joiningDate || new Date().toISOString().split('T')[0],
        status: initialValues.status || 'Active',
      });
    }
  }, [initialValues]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!isRequired(formData.name)) {
      newErrors.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!isRequired(formData.id)) {
      newErrors.id = 'Employee ID is required.';
    }

    if (!isRequired(formData.email)) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!isRequired(formData.phone)) {
      newErrors.phone = 'Phone number is required.';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!isRequired(formData.department)) {
      newErrors.department = 'Department is required.';
    }

    if (!isRequired(formData.jobTitle)) {
      newErrors.jobTitle = 'Job Title is required.';
    }

    if (!isRequired(formData.joiningDate)) {
      newErrors.joiningDate = 'Joining Date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const departments = [
    'Engineering',
    'Human Resources',
    'Product Design',
    'Marketing',
    'Finance',
    'Operations',
  ];

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* 2-Column Responsive Form Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {/* Full Name */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
            Full Name <span style={{ color: 'var(--status-danger)' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: `1px solid ${errors.name ? 'var(--status-danger)' : 'var(--border-light)'}`,
              fontSize: '13.5px',
              outline: 'none',
              backgroundColor: 'var(--bg-main)',
            }}
          />
          {errors.name && <span style={{ fontSize: '11.5px', color: 'var(--status-danger)', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
        </div>

        {/* Employee ID */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
            Employee ID <span style={{ color: 'var(--status-danger)' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. EMP-009"
            value={formData.id}
            disabled={isEditMode}
            onChange={(e) => handleChange('id', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: `1px solid ${errors.id ? 'var(--status-danger)' : 'var(--border-light)'}`,
              fontSize: '13.5px',
              outline: 'none',
              backgroundColor: isEditMode ? '#E2E8F0' : 'var(--bg-main)',
              cursor: isEditMode ? 'not-allowed' : 'text',
            }}
          />
          {errors.id && <span style={{ fontSize: '11.5px', color: 'var(--status-danger)', marginTop: '4px', display: 'block' }}>{errors.id}</span>}
        </div>

        {/* Email Address */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
            Work Email <span style={{ color: 'var(--status-danger)' }}>*</span>
          </label>
          <input
            type="email"
            placeholder="e.g. john.doe@dayflow.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: `1px solid ${errors.email ? 'var(--status-danger)' : 'var(--border-light)'}`,
              fontSize: '13.5px',
              outline: 'none',
              backgroundColor: 'var(--bg-main)',
            }}
          />
          {errors.email && <span style={{ fontSize: '11.5px', color: 'var(--status-danger)', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
            Phone Number <span style={{ color: 'var(--status-danger)' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. +1 (555) 019-2834"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: `1px solid ${errors.phone ? 'var(--status-danger)' : 'var(--border-light)'}`,
              fontSize: '13.5px',
              outline: 'none',
              backgroundColor: 'var(--bg-main)',
            }}
          />
          {errors.phone && <span style={{ fontSize: '11.5px', color: 'var(--status-danger)', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
        </div>

        {/* Department */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
            Department <span style={{ color: 'var(--status-danger)' }}>*</span>
          </label>
          <select
            value={formData.department}
            onChange={(e) => handleChange('department', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: `1px solid ${errors.department ? 'var(--status-danger)' : 'var(--border-light)'}`,
              fontSize: '13.5px',
              outline: 'none',
              backgroundColor: 'var(--bg-main)',
              cursor: 'pointer',
            }}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && <span style={{ fontSize: '11.5px', color: 'var(--status-danger)', marginTop: '4px', display: 'block' }}>{errors.department}</span>}
        </div>

        {/* Job Title */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
            Job Title / Position <span style={{ color: 'var(--status-danger)' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Senior Software Engineer"
            value={formData.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: `1px solid ${errors.jobTitle ? 'var(--status-danger)' : 'var(--border-light)'}`,
              fontSize: '13.5px',
              outline: 'none',
              backgroundColor: 'var(--bg-main)',
            }}
          />
          {errors.jobTitle && <span style={{ fontSize: '11.5px', color: 'var(--status-danger)', marginTop: '4px', display: 'block' }}>{errors.jobTitle}</span>}
        </div>

        {/* Joining Date */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
            Joining Date <span style={{ color: 'var(--status-danger)' }}>*</span>
          </label>
          <input
            type="date"
            value={formData.joiningDate}
            onChange={(e) => handleChange('joiningDate', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: `1px solid ${errors.joiningDate ? 'var(--status-danger)' : 'var(--border-light)'}`,
              fontSize: '13.5px',
              outline: 'none',
              backgroundColor: 'var(--bg-main)',
            }}
          />
          {errors.joiningDate && <span style={{ fontSize: '11.5px', color: 'var(--status-danger)', marginTop: '4px', display: 'block' }}>{errors.joiningDate}</span>}
        </div>

        {/* Employment Status */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
            Employment Status <span style={{ color: 'var(--status-danger)' }}>*</span>
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              fontSize: '13.5px',
              outline: 'none',
              backgroundColor: 'var(--bg-main)',
              cursor: 'pointer',
            }}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          style={{
            padding: '10px 18px',
            borderRadius: '8px',
            border: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-main)',
            color: 'var(--text-primary)',
            fontSize: '13.5px',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '10px 22px',
            borderRadius: '8px',
            border: '1px solid var(--champagne-gold)',
            backgroundColor: 'var(--navy-deep)',
            color: 'var(--champagne-gold)',
            fontSize: '13.5px',
            fontWeight: '700',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            boxShadow: 'var(--shadow-sm)',
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Employee' : 'Save Employee'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
