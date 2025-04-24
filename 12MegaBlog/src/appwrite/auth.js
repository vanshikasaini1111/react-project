import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return await this.login({ email, password });
            }
            return userAccount;
        } catch (error) {
            console.error("Appwrite :: createAccount ::", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Appwrite :: login ::", error);
            throw error;
        }
    }

    async getCurrentUser() {
      try {
          // Get the current session first to verify if the user is logged in
          const session = await this.account.get(); // Get current session
  
          // If there's no valid session, return null or handle accordingly
          if (!session) {
              console.warn('User not logged in or session expired.');
              return null;
          }
  
          // If there's a valid session, fetch the user data
          const user = await this.account.get(); // Fetch current user info
  
          return user; // Return user data
  
      } catch (error) {
          // Handling specific errors based on the error message
          if (error.code === 401) {
              // Unauthorized error, user may not be logged in
              console.warn('User is not logged in or session expired.');
          } else {
              // Log unexpected errors
              console.error("Appwrite :: getCurrentUser ::", error);
          }
          return null; // Return null if an error occurs
      }
  }
  

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite :: logout ::", error);
        }
    }
}

const authService = new AuthService();
export default authService;