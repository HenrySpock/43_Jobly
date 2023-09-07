import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JoblyApi from '../JoblyApi';

function JobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await JoblyApi.getAllJobs();
        setJobs(data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Jobs</h1>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <Link to={`/jobs/${job.id}`}>
              <h3>{job.title}</h3>
              <p>{job.companyHandle}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobsList;
