import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../JoblyApi';

function CompanyDetails() {
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
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>

      <h3>Jobs Available:</h3>
      {company.jobs.map(job => (
        <div key={job.id}>
          <h4>{job.title}</h4>
          <p>Salary: ${job.salary}</p>
          <p>Equity: {job.equity}</p>
        </div>
      ))}
    </div>
  );
}

export default CompanyDetails;
