import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../JoblyApi';

import './CompanyDetails.css';
 
import ApplyButton from './ApplyButton';
 
function CompanyDetails({ user, applyToJobFunction }) {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
 
  useEffect(() => {
    async function fetchCompanyDetails() {
      try {
        const data = await JoblyApi.getCompany(handle);
        setCompany(data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    }

    fetchCompanyDetails();
  }, [handle]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <h2>{company.name}</h2>
      <p>{company.description}</p>

      <h3>Jobs Available:</h3>
 
      {company.jobs.map(job => {
        const isAppliedForCurrentJob = user.applications.includes(job.id);
        
        return (
          <div key={job.id} className='available'>
            <h4>{job.title}</h4>
            <p>Salary: ${job.salary}</p>
            <p>Equity: {job.equity}</p>
            <ApplyButton isApplied={isAppliedForCurrentJob} applyForJob={() => applyToJobFunction(job.id)} />
          </div>
        );
      })}
      
    </div>
  );
}

export default CompanyDetails;
 