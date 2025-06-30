import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { Typography, Box } from '@mui/material';

interface VisitSiteProps {
  onClick: (event: React.MouseEvent) => void;
  disabled: boolean;
}

function VisitSite({ onClick, disabled }: VisitSiteProps) {
  return (
    <div
      onClick={disabled ? undefined : onClick} // Disable the click event if disabled
      style={{
        position: 'absolute',
        top: 13,
        left: '5%',
        width: 30,
        height: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer', // Change cursor when disabled
        userSelect: 'none',
        transition: 'all 0.3s ease',
        opacity: disabled ? 0.5 : 1, // Reduce opacity when disabled
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          const target = e.currentTarget as HTMLElement;
          target.style.width = '80px';
          target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
          const visitText = target.querySelector('.visit-text') as HTMLElement;
          if (visitText) visitText.style.opacity = '1';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          const target = e.currentTarget as HTMLElement;
          target.style.width = '30px';
          target.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
          const visitText = target.querySelector('.visit-text') as HTMLElement;
          if (visitText) visitText.style.opacity = '0';
        }
      }}
    >
      <LinkIcon
        fontSize="small"
        style={{
          fontSize: 16,
          color: 'black',
          opacity: 0.9,
          transition: 'all 0.3s ease',
          position: 'absolute',
          left: 7,
        }}
      />
      <Typography
        className="visit-text"
        style={{
          opacity: 0,
          transition: 'opacity 0.3s ease',
          position: 'absolute',
          left: '30px',
        }}
      >
        Visit
      </Typography>
    </div>
  );
}

export default VisitSite;
