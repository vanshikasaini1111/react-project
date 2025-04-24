import React from 'react';

function Logo({ width = '100px' }) {
  return (
    <div style={{ width }}>
      <img src="path_to_your_logo.png" alt="Logo" style={{ width: '100%' }} />
    </div>
  );
}

export default Logo;