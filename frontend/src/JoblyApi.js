import axios from "axios";  


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...
  //Get the list of all companies.
  static async getAllCompanies() { 
    return await this.request('companies');
  }

  //Get the list of all jobs.
  static async getAllJobs() {
    return await this.request('jobs');
  }

  //Get job details when clicking on job card on 'jobs' route.
  static async getJobById(jobId) {
    return await this.request(`jobs/${jobId}`); // Use jobId as the parameter
  }

  // Registration: Create a new user
  static async registerUser(userData) {
    return await this.request('auth/register', userData, 'post');
  }

  // Login: Authenticate a user
  static async loginUser(credentials) {
    return await this.request('auth/token', credentials, 'post');
  }

  // Logout: Remove the user's token
  static async logoutUser() {
    // Clear the stored token
    this.token = null;
  }

  // Get details of the currently logged-in user
  static async getCurrentUser(username) {
    try {
      return await this.request(`users/${username}`);
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }

  // Updating a user profile
  static async updateUser(username, data) {
    try {
      return await this.request(`users/${username}`, data, "patch");
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  // Step 9.
  // Apply for a job
  static async applyForJob(username, jobId) {
    return await this.request(`users/${username}/jobs/${jobId}`, {}, "POST");
  }

  //Forgot to add search bar - CompaniesList:
  static async searchCompanies(filter) {
    return await this.request('companies', filter);
  }

  //Forgot to add search bar - JobsList:
  static async searchJobs(filter) {
    return await this.request('jobs', filter);
  }

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;