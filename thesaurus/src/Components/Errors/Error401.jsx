import * as React from 'react';
import { Link } from 'react-router-dom';

export const Error401 = () => {
  return (
    <div className="error">
      <p className="errorNum">401</p>
      <p className="errorDescription">Unauthorized</p>
      <p><Link to="/login">Go to login</Link></p>
    </div>
  );
};
