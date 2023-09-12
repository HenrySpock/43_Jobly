import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import JoblyApi from '../JoblyApi';

import './CompaniesList.css';

function CompaniesList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  async function fetchCompanies() {
    try {
      const data = await JoblyApi.getAllCompanies();
      setCompanies(data.companies);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function handleSearch(searchTermToUse) {
    let searchParams = {};
    if (searchTermToUse) {
      searchParams.name = searchTermToUse;
    }
  
    const searchResults = await JoblyApi.searchCompanies(searchParams);
    setCompanies(searchResults.companies);
  }

  function handleSearchChange(e) {
      setSearchTerm(e.target.value);  
  }

  function clearSearch() {
    setSearchTerm("");
    handleSearch();  
  }
 
  return (
    <div className="centered-content">
      <h1>Companies</h1>     
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm); }}>
        <input 
          placeholder="Search by company name" 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={clearSearch}>Clear Search</button>
      </form>

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
