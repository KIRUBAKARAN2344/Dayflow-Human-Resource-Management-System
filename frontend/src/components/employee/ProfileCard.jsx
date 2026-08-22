import React, { useState } from 'react';
import {
  User, Mail, Phone, Briefcase, Building, Calendar, Hash, MapPin,
  Shield, CreditCard, DollarSign, FileText, Camera, CheckCircle2, Lock
} from 'lucide-react';
import { authService } from '../../services/authService';

const ProfileCard = ({ profile }) => {
  const [activeSubTab, setActiveSubTab] = useState('Private Info');
  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser?.role === 'ADMIN';

  const firstName   = profile?.firstName   || 'Sarah';
  const lastName    = profile?.lastName    || 'Jenkins';
  const fullName    = `${firstName} ${lastName}`.trim();
  const email       = profile?.email       || 'sarah.jenkins@dayflow.com';
  const phone       = profile?.phone       || '+1 (555) 234-5678';
  const department  = profile?.department  || 'Technology';
  const designation = profile?.designation || 'Senior Software Engineer';
  const joiningDate = profile?.joiningDate || '2023-03-01';
  const empCode     = profile?.id ? `EMP-${profile.id}` : 'EMP-100';
  const initial     = firstName.charAt(0).toUpperCase();

  // Salary calculations (Monthly Wage ₹50,000 baseline)
  const monthlyWage = 50000;
  const yearlyWage = monthlyWage * 12;
  const basicSalary = monthlyWage * 0.50; // 50% of Wage = 25,000
  const hra = basicSalary * 0.50; // 50% of Basic = 12,500
  const standardAllowance = 4167;
  const performanceBonus = 3333;
  const lta = 2500;
  const fixedAllowance = monthlyWage - (basicSalary + hra + standardAllowance + performanceBonus + lta);
  const pfEmployee = basicSalary * 0.12;
  const pfEmployer = basicSalary * 0.12;
  const profTax = 200;

  const subTabs = [
    { id: 'Private Info', label: 'Private Info', icon: User },
    { id: 'Resume', label: 'Resume', icon: FileText },
    { id: 'Salary Info', label: 'Salary Info', icon: DollarSign, adminOnly: false },
    { id: 'Security', label: 'Security', icon: Shield },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Profile Header Card */}
      <div
        className="card"
        style={{
          padding: '28px',
          marginBottom: '24px',
          position: 'relative',
          background: 'var(--bg-card)',
        }}
      >
        <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Avatar with Camera Icon */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '38px',
                fontWeight: '900',
                color: '#ffffff',
                boxShadow: '0 0 32px rgba(139,92,246,0.35)',
              }}
            >
              {initial}
            </div>
            <button
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-600)',
                border: '2px solid var(--bg-card)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              title="Change Photo"
            >
              <Camera size={14} />
            </button>
          </div>

          {/* Profile Name & Primary Columns */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <h1 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
                {fullName}
              </h1>
              <span className="badge badge-present">ACTIVE EMPLOYEE</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginTop: '18px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              {/* Left Column */}
              <div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>Job Position</span>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary-400)' }}>{designation}</div>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>Work Email</span>
                  <div style={{ fontSize: '13px', color: 'var(--text-main)' }}>{email}</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>Mobile</span>
                  <div style={{ fontSize: '13px', color: 'var(--text-main)' }}>{phone}</div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>Company</span>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>Dayflow HRMS Inc.</div>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>Department</span>
                  <div style={{ fontSize: '13px', color: 'var(--text-main)' }}>{department}</div>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>Manager</span>
                  <div style={{ fontSize: '13px', color: 'var(--text-main)' }}>Alex Morgan (Director)</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>Location</span>
                  <div style={{ fontSize: '13px', color: 'var(--text-main)' }}>San Francisco HQ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '24px',
          overflowX: 'auto',
        }}
      >
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? 'var(--primary-400)' : 'var(--text-muted)',
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '3px solid var(--primary-500)' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.18s',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon size={16} />
              {tab.label}
              {tab.id === 'Salary Info' && (
                <span style={{ fontSize: '10px', background: 'rgba(139,92,246,0.2)', padding: '2px 6px', borderRadius: '4px', color: 'var(--primary-300)' }}>
                  Confidential
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Private Info */}
      {activeSubTab === 'Private Info' && (
        <div className="grid-2">
          {/* Personal Details */}
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '18px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} color="var(--primary-400)" /> Personal Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Date of Birth', value: '1995-06-14' },
                { label: 'Residing Address', value: '452 Innovation Blvd, Suite 300, SF, CA' },
                { label: 'Nationality', value: 'United States' },
                { label: 'Personal Email', value: 'sarah.j.personal@example.com' },
                { label: 'Gender', value: 'Female' },
                { label: 'Marital Status', value: 'Single' },
                { label: 'Date of Joining', value: joiningDate },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: '600' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bank Details */}
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '18px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={18} color="var(--primary-400)" /> Bank & Tax Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Account Number', value: '•••• •••• •••• 8842' },
                { label: 'Bank Name', value: 'Silicon Valley National Bank' },
                { label: 'IFSC Code / Routing', value: 'SVNB0004921' },
                { label: 'PAN No', value: 'ABCDE1234F' },
                { label: 'UAN No', value: '100984729103' },
                { label: 'Employee Code', value: empCode },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: '600' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Resume */}
      {activeSubTab === 'Resume' && (
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '18px', color: 'var(--text-main)' }}>
            Work Experience & Education Summary
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '14px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ color: 'var(--primary-400)' }}>Senior Software Engineer — Dayflow HRMS</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>2023 - Present</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Lead full-stack developer managing enterprise core modules.</p>
            </div>
            <div style={{ padding: '14px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ color: 'var(--primary-400)' }}>B.S. Computer Science — University of California</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>2018 - 2022</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Graduated with distinction. Focus on Distributed Systems.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Salary Info (matches the wireframe breakdown) */}
      {activeSubTab === 'Salary Info' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>Salary Information & Wage Structure</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Automatically computed based on defined monthly wage</p>
            </div>
            <div style={{ padding: '4px 10px', background: 'rgba(139,92,246,0.15)', borderRadius: '6px', fontSize: '12px', color: 'var(--primary-400)', fontWeight: '700' }}>
              Wage Type: Fixed Wage
            </div>
          </div>

          {/* Top Wage Stats */}
          <div className="grid-3" style={{ marginBottom: '24px' }}>
            <div style={{ padding: '14px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase' }}>Monthly Wage</span>
              <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-400)', marginTop: '4px' }}>₹{monthlyWage.toLocaleString('en-IN')}</div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ Month</span>
            </div>
            <div style={{ padding: '14px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase' }}>Yearly Wage</span>
              <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px' }}>₹{yearlyWage.toLocaleString('en-IN')}</div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ Yearly</span>
            </div>
            <div style={{ padding: '14px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase' }}>Working Schedule</span>
              <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px' }}>5 Days / Wk</div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>40.00 hrs/week</span>
            </div>
          </div>

          {/* Salary Components Table */}
          <div className="table-container" style={{ marginBottom: '24px' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Salary Component</th>
                  <th>Computation Rule</th>
                  <th>Monthly Amount</th>
                  <th>% of Wage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Basic Salary</strong></td>
                  <td style={{ color: 'var(--text-muted)' }}>50% of monthly wage</td>
                  <td style={{ fontWeight: '700' }}>₹{basicSalary.toLocaleString('en-IN')}</td>
                  <td>50.00%</td>
                </tr>
                <tr>
                  <td><strong>House Rent Allowance (HRA)</strong></td>
                  <td style={{ color: 'var(--text-muted)' }}>50% of Basic Salary</td>
                  <td style={{ fontWeight: '700' }}>₹{hra.toLocaleString('en-IN')}</td>
                  <td>25.00%</td>
                </tr>
                <tr>
                  <td><strong>Standard Allowance</strong></td>
                  <td style={{ color: 'var(--text-muted)' }}>Fixed allowance provided to employee</td>
                  <td style={{ fontWeight: '700' }}>₹{standardAllowance.toLocaleString('en-IN')}</td>
                  <td>8.33%</td>
                </tr>
                <tr>
                  <td><strong>Performance Bonus</strong></td>
                  <td style={{ color: 'var(--text-muted)' }}>Variable incentive defined by company</td>
                  <td style={{ fontWeight: '700' }}>₹{performanceBonus.toLocaleString('en-IN')}</td>
                  <td>6.67%</td>
                </tr>
                <tr>
                  <td><strong>Leave Travel Allowance (LTA)</strong></td>
                  <td style={{ color: 'var(--text-muted)' }}>Travel reimbursement allowance</td>
                  <td style={{ fontWeight: '700' }}>₹{lta.toLocaleString('en-IN')}</td>
                  <td>5.00%</td>
                </tr>
                <tr>
                  <td><strong>Fixed Allowance</strong></td>
                  <td style={{ color: 'var(--text-muted)' }}>Remaining balance of wage</td>
                  <td style={{ fontWeight: '700' }}>₹{fixedAllowance.toLocaleString('en-IN')}</td>
                  <td>5.00%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deductions & Contributions */}
          <div className="grid-2">
            <div style={{ padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '12px' }}>
                Provident Fund (PF) Contribution
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Employee PF (12% of Basic):</span>
                <strong style={{ color: 'var(--text-main)' }}>₹{pfEmployee.toLocaleString('en-IN')} / mo</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Employer PF (12% of Basic):</span>
                <strong style={{ color: 'var(--text-main)' }}>₹{pfEmployer.toLocaleString('en-IN')} / mo</strong>
              </div>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '12px' }}>
                Tax Deductions
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Professional Tax (PT):</span>
                <strong style={{ color: 'var(--danger-text)' }}>₹{profTax.toLocaleString('en-IN')} / mo</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Security */}
      {activeSubTab === 'Security' && (
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '18px', color: 'var(--text-main)' }}>
            Account Security &amp; Credentials
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '480px' }}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input type="password" placeholder="••••••••" className="form-control" readOnly value="password123" />
            </div>
            <div className="form-group">
              <label className="form-label">Two-Factor Authentication (2FA)</label>
              <span className="badge badge-approved">Enabled (SMS Verified)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
