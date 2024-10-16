import React from 'react';
import './SkeletonLoading.css';

function SkeletonLoading() {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-id"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-tag"></div>
          <div className="skeleton-tag"></div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoading;
