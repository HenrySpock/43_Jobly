import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import JoblyApi from '../JoblyApi';

function CompaniesList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const data = await JoblyApi.getAllCompanies();
        // console.log("Data fetched from API:", data);
        setCompanies(data.companies);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    }
    fetchCompanies();
  }, []);

  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {companies.map(company => (
          <li key={company.handle}> 
            <Link to={`/companies/${company.handle}`}>
              <h3>{company.name}</h3>
              <p>{company.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompaniesList;




