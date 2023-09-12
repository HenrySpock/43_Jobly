// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; 
// import JoblyApi from '../JoblyApi';

// import './CompaniesList.css';

// function CompaniesList() {
//   const [companies, setCompanies] = useState([]);

//   const [searchTerm, setSearchTerm] = useState(""); 

//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     async function fetchCompanies() {
//       try {
//         const data = await JoblyApi.getAllCompanies();
//         // console.log("Data fetched from API:", data);
//         setCompanies(data.companies);
//       } catch (error) {
//         console.error('Error fetching companies:', error);
//       }
//     }
//     fetchCompanies();
//   }, []);

//   async function handleSearch(evt) {
//     evt.preventDefault();

//     const searchResults = await JoblyApi.searchCompanies({
//       name: searchTerm 
//     });

//     setCompanies(searchResults.companies);
//   };

//   // return (
//   //   <div className="centered-content">
//   //     <h1>Companies</h1>
//   //     <ul>
//   //       {companies.map(company => (
//   //         <li key={company.handle}> 
//   //           <Link to={`/companies/${company.handle}`}>
//   //             <h3>{company.name}</h3>
//   //             <p>{company.description}</p>
//   //           </Link>
//   //         </li>
//   //       ))}
//   //     </ul>
//   //   </div>
//   // );

//   function handleSearchChange(e) {
//       setSearch(e.target.value);
//   }

//   function clearSearch() {
//     setSearch("");
//     fetchCompanies();  // this will fetch all companies again
//   }

//   return (
//     <div className="centered-content">
//       <h1>Companies</h1>
//       <form onSubmit={handleSearch}>
//         <input 
//           placeholder="Search by company name" 
//           value={searchTerm}
//           // onChange={e => setSearchTerm(e.target.value)}
//           onChange={handleSearchChange}
//         />
//         <button type="submit">Search</button>
//         <button onClick={clearSearch}>Clear Search</button>

//       </form>

//       <ul>
//         {companies.map(company => (
//           <li key={company.handle}> 
//             <Link to={`/companies/${company.handle}`}>
//               <h3>{company.name}</h3>
//               <p>{company.description}</p>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// } 

// export default CompaniesList;




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

  // async function handleSearch(evt) {
  //   if (evt) evt.preventDefault();
  
  //   let searchParams = {};
  //   if (searchTerm) {
  //     searchParams.name = searchTerm;
  //   }
  
  //   const searchResults = await JoblyApi.searchCompanies(searchParams);
  //   setCompanies(searchResults.companies);
  // }

  async function handleSearch(searchTermToUse) {
    let searchParams = {};
    if (searchTermToUse) {
      searchParams.name = searchTermToUse;
    }
  
    const searchResults = await JoblyApi.searchCompanies(searchParams);
    setCompanies(searchResults.companies);
  }

  function handleSearchChange(e) {
      setSearchTerm(e.target.value); // changed from setSearch to setSearchTerm
  }

  function clearSearch() {
    setSearchTerm("");
    handleSearch();  // this will fetch all companies again without the name parameter
  }
 
  return (
    <div className="centered-content">
      <h1>Companies</h1>
      {/* <form onSubmit={handleSearch}> */}
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
