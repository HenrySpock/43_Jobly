import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JoblyApi from '../JoblyApi';

import './JobsList.css';

function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchJobs() {
    try {
      const data = await JoblyApi.getAllJobs();
      setJobs(data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  async function handleSearch(searchTermToUse) {
    let searchParams = {};
    if (searchTermToUse) {
      searchParams.title = searchTermToUse;
    }
  
    const searchResults = await JoblyApi.searchJobs(searchParams);
    setJobs(searchResults.jobs);
  }

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  function clearSearch() {
    setSearchTerm("");
    fetchJobs();   
  }

  return (
    <div className="centered-content">
      <h1>Jobs</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm); }}>
        <input 
          placeholder="Search by job title" 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={clearSearch}>Clear Search</button>
      </form>
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
