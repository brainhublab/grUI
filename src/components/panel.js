import React from 'react';

const Panel = ({ title, children }) => (
  <div className="card mb-3">
    <div className="card-header">
      {title}
    </div>
    <div className="card-body" id="root">{children}</div>
  </div>
)

export default Panel
