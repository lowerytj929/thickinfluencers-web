'use client';

import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function AgeVerificationModal() {
  const [visible, setVisible] = useState(true);

  const handleYes = () => {
    try {
      sessionStorage.setItem('ageVerified', 'true');
      document.cookie = 'ti_age_verified=true; path=/; max-age=86400; SameSite=Lax';
    } catch (e) {
      // sessionStorage might not be available
    }
    setVisible(false);
  };

  const handleNo = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          background: '#16162A',
          border: '1px solid #2A2A3E',
          borderRadius: '20px',
          padding: '32px',
          maxWidth: '420px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(217,29,91,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <ShieldCheck style={{ width: '32px', height: '32px', color: '#D91D5B' }} />
        </div>

        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#F1F1F6',
            marginBottom: '8px',
          }}
        >
          Age Verification
        </h2>

        <p
          style={{
            fontSize: '14px',
            color: '#9CA3AF',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          This platform contains media content intended for adults.
          Please confirm that you are at least 18 years of age to continue.
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
          }}
        >
          <button
            onClick={handleYes}
            style={{
              flex: 1,
              padding: '14px 20px',
              background: 'linear-gradient(135deg, #D91D5B, #7C3AED)',
              color: 'white',
              fontWeight: 700,
              fontSize: '14px',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            Yes, I am 18+
          </button>
          <button
            onClick={handleNo}
            style={{
              flex: 1,
              padding: '14px 20px',
              background: 'transparent',
              color: '#F1F1F6',
              fontWeight: 600,
              fontSize: '14px',
              border: '1px solid #2A2A3E',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#D91D5B'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2A2A3E'; }}
          >
            No, Leave Site
          </button>
        </div>

        <p
          style={{
            textAlign: 'center',
            fontSize: '11px',
            color: '#6B7280',
            marginTop: '20px',
          }}
        >
          Your choice is saved for this session only.
        </p>
      </div>
    </div>
  );
}
