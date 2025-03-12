User Authentication and Session Management
This is a Node.js Express application that implements user authentication and session management using MongoDB as the primary database and Redis for session caching. The application includes features like user registration, login, session management, password reset, and access control.

Table of Contents
Features

Prerequisites

Setup

Environment Variables

Running the Application

Running Tests

API Endpoints

Technologies Used

License

Features
User Registration: Register with a unique username, email, and secure password.

User Login: Log in using username and password. Returns a JWT token for authenticated sessions.

Session Management: Sessions are stored in Redis with a configurable expiration time.

Password Reset: Securely reset passwords using a time-limited token sent via email.

Access Control: Protect routes using authentication middleware.

Logging: Log important events and errors related to authentication and session management.

Testing: Comprehensive unit and integration tests for all features.

Prerequisites
Before running the application, ensure you have the following installed:

Node.js (v16 or higher)

MongoDB (running locally or remotely)

Redis (running locally or remotely)

NPM (comes with Node.js)

Setup
Clone the repository:

bash
Copy
git clone https://github.com/your-username/user-story.git
cd user-story
Install dependencies:

bash
Copy
npm install
Set up environment variables:
Create a .env file in the root directory and add the following variables:

Copy
SESSION_SECRET=your_session_secret
MONGO_URI=mongodb://localhost:27017/auth_app
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
Replace the placeholders with your actual values.

Environment Variables
Variable	Description	Example Value
SESSION_SECRET	Secret key for signing session cookies	your_session_secret
MONGO_URI	MongoDB connection string	mongodb://localhost:27017/auth_app
REDIS_URL	Redis connection string	redis://localhost:6379
JWT_SECRET	Secret key for signing JWT tokens	your_jwt_secret
EMAIL_USER	Email address for sending password resets	your_email@gmail.com
EMAIL_PASS	Email account password	your_email_password
Running the Application
Start Redis:

bash
Copy
redis-server
Start MongoDB:
Ensure MongoDB is running locally or update the MONGO_URI in .env to point to your remote MongoDB instance.

Run the application:

bash
Copy
npm start
The application will start on port 5000. You can access it at http://localhost:5000.

Running Tests
The application includes unit and integration tests. To run the tests:

Install test dependencies (if not already installed):

bash
Copy
npm install --save-dev jest supertest mongodb-memory-server redis-mock
Run the tests:

bash
Copy
npm test
This will execute all unit and integration tests.

API Endpoints
Authentication
Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Log in and receive a JWT token
POST	/auth/request-password-reset	Request a password reset link
POST	/auth/reset-password	Reset password using a token
Protected Routes
Method	Endpoint	Description
GET	/auth/profile	Get the authenticated user's profile
Technologies Used
Backend: Node.js, Express

Database: MongoDB

Session Management: Redis

Authentication: JWT (JSON Web Tokens)

Email: Nodemailer

Logging: Morgan

Testing: Jest, Supertest, MongoDB Memory Server, Redis Mock

Environment Management: Dotenv