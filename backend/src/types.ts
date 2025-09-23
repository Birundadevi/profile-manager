export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  githubUsername?: string;
}

// A type for the login request body
export interface LoginRequest {
  email: string;
}