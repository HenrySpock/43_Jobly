// JobDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../JoblyApi';

// step 9
import ApplyButton from './ApplyButton';

import './JobDetails.css';

                      //  Step 9.
function JobDetails({ user, applyToJobFunction }) {
  const { id } = useParams(); // Use id instead of companyHandle
  const [job, setJob] = useState(null);

  // Step 9.
  const isApplied = user.applications.includes(job?.id);

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const data = await JoblyApi.getJobById(id); // Use getJobById function
        setJob(data.job);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    }
    fetchJobDetails();
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="centered-content">
      <h2>{job.title}</h2>
      <p>Company Handle: {job.company.handle}</p>
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
      {/* step 9. */}
      <ApplyButton isApplied={isApplied} applyForJob={() => applyToJobFunction(job.id)} />
    </div>
  );
}

export default JobDetails;
