<!-- Basic sketch of component hierarchy: -->

App
├── NavBar (conditionally rendered based on user authentication)
│   ├── HomeLink (Jobly link)
│   ├── LoginLink
│   ├── SignupLink
│   ├── CompaniesLink (conditionally rendered)
│   ├── JobsLink (conditionally rendered)
│   ├── ProfileLink (conditionally rendered)
│   ├── LogoutButton (conditionally rendered with username)
│   └── UserInfo (conditionally rendered)
│
├── Routes (React Router to handle navigation)
│   ├── Home (default route)
│   ├── Login
│   ├── Signup
│   ├── CompaniesList
│   │   ├── CompanyCard
│   │   └── CompanyDetails
│   │       └── JobList
│   │           └── JobCard (with Apply button)
│   │
│   ├── JobsList
│   │   ├── JobCard (with Apply button)
│   │   └── JobDetails
│   │       └── JobList (of same title from different companies)
│   │           └── JobCard (with Apply button)
│   └── CompaniesList
│   │   ├── CompanyCard
│   │   └── CompanyDetails
│   │       └── JobList
│   │           └── JobCard (with Apply button)
│   │
│   └── Profile
│       └── UserProfile
│
└── Footer
