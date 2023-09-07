// JobDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../JoblyApi';

function JobDetails() {
  const { id } = useParams(); // Use id instead of companyHandle
  const [job, setJob] = useState(null);

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
    <div>
      <h2>{job.title}</h2>
      <p>Company Handle: {job.company.handle}</p>
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
    </div>
  );
}

export default JobDetails;
