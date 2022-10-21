import React from 'react';

import './notFound.css';

function notFound() {
  window.location.assign('/dashboard');
  return (
    <div className='notFound'>
      <h1>Page not found</h1>
      <h3>Redirecting to Dashboard</h3>
    </div>
  );
}

export default notFound;
