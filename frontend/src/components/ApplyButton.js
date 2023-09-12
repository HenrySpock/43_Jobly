// Step 9.
import React from 'react';

function ApplyButton({ isApplied, applyForJob }) {
  return (
    <button onClick={applyForJob} disabled={isApplied}>
      {isApplied ? "Already Applied" : "Apply"}
    </button>
  );
}

export default ApplyButton;