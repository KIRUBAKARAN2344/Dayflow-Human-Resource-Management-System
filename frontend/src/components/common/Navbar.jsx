import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, LogOut, Search } from 'lucide-react';
import { authService } from '../../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const initials = user?.firstName
    ? user.firstName.charAt(0) + (user.lastName ? user.lastName.charAt(0) : '')
    : 'E';

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div style={{ position: 'relative' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-light)',
            }}
          />
          <input
            type="text"
            placeholder="Search..."
            style={{
              background: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 14px 8px 36px',
              fontSize: '13px',
              color: 'var(--text-muted)',
              width: '220px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      <div className="navbar-right">
        <button
          onClick={() => {}}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <Bell size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="navbar-avatar">{initials.toUpperCase()}</div>
          <div>
            <div className="navbar-user-name">
              {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Employee' : 'Employee'}
            </div>
            <div className="navbar-user-role">{user?.role || 'Employee'}</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            background: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.18s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--danger-border)';
            e.currentTarget.style.color = 'var(--danger-text)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
