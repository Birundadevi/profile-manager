## Profile Manager Application

This is a full-stack web application for managing user profiles. It includes a secure login and registration flow, and a dashboard for authenticated users to view and update their profile information. The application is built with a React frontend and a TypeScript Express backend.

-----

### Key Features

  * **User Authentication**: Secure registration and login using email.
  * **Profile Management**: Users can update their name and GitHub username.
  * **In-Memory Database**: A simple, file-based mock database for data persistence during runtime.
  * **Backend Security**: API rate limiting to protect against brute-force and DoS attacks.
  * **Comprehensive Testing**: Jest and React Testing Library are used for both backend and frontend testing.

-----

### Prerequisites

Before you begin, ensure you have the following installed:

  * **Node.js**: [LTS version recommended](https://nodejs.org/en)
  * **npm**: Comes with Node.js

-----

### Installation & Setup

Follow these steps to get the application up and running on your local machine.

#### 1\. Backend Setup

Navigate to the `backend` directory and install the dependencies:

```bash
cd backend
npm install
```

Start the backend server:

```bash
npm start
```

The backend server will run on `http://localhost:5000`.

#### 2\. Frontend Setup

Open a new terminal window, navigate to the `frontend` directory, and install the dependencies:

```bash
cd frontend
npm install
```

Start the frontend application:

```bash
npm start
```

The frontend application will be available at `http://localhost:3000`.

-----

### Running Tests

To run the test suites for both the backend and frontend, use the following commands.

#### Backend Tests

From the `backend` directory:

```bash
npm test
```

#### Frontend Tests

From the `frontend` directory:

```bash
npm test
```

-----

### Technologies Used

  * **Frontend**: React, TypeScript, Material-UI, React Hook Form, Zod
  * **Backend**: Node.js, Express.js, TypeScript
  * **Testing**: Jest, Supertest, React Testing Library
