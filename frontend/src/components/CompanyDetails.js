// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import JoblyApi from '../../JoblyApi';

// function CompanyDetails() {
//   const { handle } = useParams();
//   const [company, setCompany] = useState(null);

//   useEffect(() => {
//     async function fetchCompanyDetails() {
//       try {
//         const data = await JoblyApi.getCompany(handle);
//         console.log("Company details fetched from API:", data);
//         setCompany(data);
//       } catch (error) {
//         console.error('Error fetching company details:', error);
//       }
//     }
//     fetchCompanyDetails();
//   }, [handle]);

//   if (!company) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{company.name}</h1>
//       <p>{company.description}</p>
//       <p>{company.salary}</p>
//       <p>{company.equity}</p> 
//     </div>
//   );
// }

// export default CompanyDetails;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../JoblyApi';

import './CompanyDetails.css';

// step 9
import ApplyButton from './ApplyButton';

                     //  Step 9.
function CompanyDetails({ user, applyToJobFunction }) {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  // Step 9. 
  // const isApplied = user.applications.includes(job?.id);

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

      {/* Step 9. */}
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

// Step 9.
// {company.jobs.map(job => (
//   <div key={job.id}>
//     <h4>{job.title}</h4>
//     <p>Salary: ${job.salary}</p>
//     <p>Equity: {job.equity}</p>
//     {/* step 9. */}
//     <ApplyButton isApplied={isApplied} applyForJob={() => applyToJobFunction(job.id)} />
//   </div>
// ))}