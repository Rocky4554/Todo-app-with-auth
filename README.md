Todo List Application
A full-stack Todo List application with user authentication and complete CRUD operations, built using modern web technologies.

Table of Contents

Features
Tech Stack
Prerequisites
Installation & Setup
MongoDB Atlas Setup
Running the Application
API Endpoints
Project Structure
Security Features
Usage Guide
Testing the Application
Assumptions Made
Troubleshooting
Demo Video
Deployment
License


Features
User Authentication

User Signup: Create a new account with name, email, and password
User Login: Secure login with JWT token authentication
Forgot Password: Request a password reset token
Reset Password: Reset your password using the token

Todo Management

Create Todo: Add new tasks with title and optional description
List Todos: View all your tasks with completion status
Update Todo: Edit task details or mark as complete/incomplete
Delete Todo: Remove tasks you no longer need
Real-time Updates: See changes immediately without page refresh

Additional Features

Error logging stored in MongoDB for debugging
Form validation on both frontend and backend
Responsive design that works on all devices
Clean and intuitive user interface


Tech Stack
Backend
TechnologyPurposeNode.jsRuntime environmentExpress.jsWeb frameworkTypeScriptType-safe JavaScriptMongoDB AtlasCloud databaseMongooseMongoDB object modelingJWTAuthentication tokensBcrypt.jsPassword hashing
Frontend
TechnologyPurposeReact 18UI libraryTypeScriptType-safe JavaScriptReact RouterPage navigationZustandState managementReact QueryServer state & cachingReact Hook FormForm handlingZodSchema validationTailwind CSSStylingLucide ReactIconsAxiosHTTP client

Prerequisites
Before you begin, ensure you have:

Node.js (version 18 or higher) installed
npm or yarn package manager
MongoDB Atlas account (free tier works fine)
Git (optional, for cloning)


Installation & Setup
Step 1: Project Structure Setup
Create the following folder structure:
todo-app/
├── backend/
└── frontend/
Step 2: Backend Setup

Navigate to backend folder:

bashcd backend

Initialize and install dependencies:

bashnpm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv cors express-validator nodemailer
npm install -D @types/express @types/bcryptjs @types/jsonwebtoken @types/cors @types/node @types/nodemailer ts-node-dev typescript

Create .env file in backend folder:

envPORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
NODE_ENV=development
Important:

Replace MONGODB_URI with your actual MongoDB Atlas connection string
Use a strong, random string for JWT_SECRET (at least 32 characters)


Start the backend server:

bashnpm run dev
```

You should see:
```
MongoDB Connected Successfully
Server running on port 5000
Step 3: Frontend Setup

Open a new terminal and navigate to frontend folder:

bashcd frontend

Initialize Vite project:

bashnpm create vite@latest . -- --template react-ts

Install dependencies:

bashnpm install
npm install react-router-dom zustand @tanstack/react-query axios zod react-hook-form @hookform/resolvers lucide-react
npm install -D tailwindcss autoprefixer postcss

Initialize Tailwind CSS:

bashnpx tailwindcss init -p

Create .env file in frontend folder:

envVITE_API_URL=http://localhost:5000/api

Start the frontend development server:

bashnpm run dev
```

Frontend will be available at: `http://localhost:3000`

---

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Paste the complete string in your backend `.env` file as `MONGODB_URI`

**Example:**
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority

Running the Application
Development Mode

Start Backend (Terminal 1):

bashcd backend
npm run dev

Start Frontend (Terminal 2):

bashcd frontend
npm run dev

Access the application:

Frontend: http://localhost:3000
Backend API: http://localhost:5000



Production Build
Backend:
bashcd backend
npm run build
npm start
Frontend:
bashcd frontend
npm run build
npm run preview

API Endpoints
Authentication Routes
MethodEndpointDescriptionAuth RequiredPOST/api/auth/signupRegister new userNoPOST/api/auth/loginLogin userNoPOST/api/auth/forgot-passwordRequest password resetNoPOST/api/auth/reset-passwordReset passwordNo
Todo Routes
MethodEndpointDescriptionAuth RequiredGET/api/todosGet all user todosYesPOST/api/todosCreate new todoYesPUT/api/todos/:idUpdate todoYesDELETE/api/todos/:idDelete todoYes
Request Examples
Signup:
jsonPOST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Create Todo:
jsonPOST /api/todos
Headers: { "Authorization": "Bearer <token>" }
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
Update Todo:
jsonPUT /api/todos/64abc123def456
Headers: { "Authorization": "Bearer <token>" }
{
  "title": "Buy groceries and fruits",
  "completed": true
}
```

---

## Project Structure
```
todo-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts           # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.ts               # User schema
│   │   │   ├── Todo.ts               # Todo schema
│   │   │   └── ErrorLog.ts           # Error log schema
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts    # Auth logic
│   │   │   └── todo.controller.ts    # Todo logic
│   │   ├── routes/
│   │   │   ├── auth.routes.ts        # Auth endpoints
│   │   │   └── todo.routes.ts        # Todo endpoints
│   │   ├── middleware/
│   │   │   ├── auth.ts               # JWT verification
│   │   │   └── errorHandler.ts       # Error handling
│   │   ├── utils/
│   │   │   └── logger.ts             # Error logging
│   │   └── server.ts                 # App entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.ts             # Axios instance
│   │   │   ├── auth.api.ts           # Auth API calls
│   │   │   └── todo.api.ts           # Todo API calls
│   │   ├── components/
│   │   │   ├── TodoForm.tsx          # Create todo form
│   │   │   ├── TodoItem.tsx          # Single todo item
│   │   │   ├── TodoList.tsx          # Todo list container
│   │   │   └── PrivateRoute.tsx      # Protected route wrapper
│   │   ├── pages/
│   │   │   ├── Login.tsx             # Login page
│   │   │   ├── Signup.tsx            # Signup page
│   │   │   ├── ForgotPassword.tsx    # Forgot password page
│   │   │   ├── ResetPassword.tsx     # Reset password page
│   │   │   └── Dashboard.tsx         # Main todo dashboard
│   │   ├── schemas/
│   │   │   ├── auth.schema.ts        # Auth validation schemas
│   │   │   └── todo.schema.ts        # Todo validation schemas
│   │   ├── store/
│   │   │   └── authStore.ts          # Global auth state
│   │   ├── App.tsx                   # Main app component
│   │   ├── main.tsx                  # React entry point
│   │   └── index.css                 # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env
│
└── README.md

Security Features

Password Hashing: Passwords are hashed using bcrypt with salt rounds
JWT Authentication: Secure token-based authentication
Protected Routes: API routes require valid JWT token
Input Validation: All inputs validated using Zod schemas
Error Logging: All errors logged to database for monitoring
CORS Configuration: Prevents unauthorized cross-origin requests


Usage Guide
1. Creating an Account

Click "Sign up here" on the login page
Enter your name, email, and password (min 6 characters)
Click "Sign Up"
You'll be automatically logged in and redirected to the dashboard

2. Logging In

Enter your email and password
Click "Login"
Your session will remain active for 30 days

3. Adding a Todo

On the dashboard, type your task in the "What needs to be done?" field
Optionally add a description
Click "Add Todo"
Your task appears immediately in the list

4. Updating a Todo

Click the edit icon (pencil) on any todo
Modify the title or description
Click "Save" to confirm or "Cancel" to discard changes

5. Completing a Todo

Click the checkbox next to any todo
Completed todos are shown with a strikethrough
Click again to mark as incomplete

6. Deleting a Todo

Click the trash icon on any todo
Confirm the deletion in the popup
The todo is permanently removed

7. Resetting Password

On login page, click "Forgot password?"
Enter your email address
Copy the reset token from the response
Go to "Reset Password" page
Enter the token and your new password
Click "Reset Password"


Testing the Application
Manual Testing Checklist
Authentication:

 Sign up with valid credentials
 Sign up with existing email (should fail)
 Login with correct credentials
 Login with wrong password (should fail)
 Request password reset
 Reset password with valid token
 Try accessing dashboard without login (should redirect)

Todo Operations:

 Create todo with title only
 Create todo with title and description
 View list of all todos
 Edit todo title
 Edit todo description
 Mark todo as completed
 Mark completed todo as incomplete
 Delete a todo
 Verify todo count updates correctly

Error Handling:

 Submit empty todo form (should show validation)
 Try invalid email format (should show validation)
 Check network errors are handled gracefully


Assumptions Made

Email Service: The forgot password feature generates a reset token that is returned in the API response for development purposes. In production, this token should be sent via email using services like SendGrid, Mailgun, or AWS SES.
Token Expiration:

JWT authentication tokens expire after 30 days
Password reset tokens expire after 10 minutes


Database: The application uses MongoDB Atlas free tier (M0) which provides 512MB storage, suitable for development and small-scale production.
CORS Policy: Backend accepts requests from any origin during development. For production, update the CORS configuration to allow only your frontend domain.
Environment: Development setup assumes both services run on localhost. For production deployment, update the environment variables accordingly.
Error Logging: All backend errors are automatically logged to a separate MongoDB collection named errorlogs for debugging and monitoring purposes.
User Data: Each user can only see and manage their own todos. User isolation is enforced at the database query level.
Validation: Input validation is performed on both frontend (immediate feedback) and backend (security) using Zod schemas.
Session Management: User sessions are maintained using JWT tokens stored in localStorage. Tokens are automatically sent with every API request.
Password Security: Passwords must be at least 6 characters long and are hashed using bcrypt before storage.


Troubleshooting
Common Issues and Solutions
Issue: Cannot connect to MongoDB
Solution:

Check your MongoDB Atlas connection string is correct
Ensure your IP address is whitelisted in MongoDB Atlas
Verify database user credentials are correct

Issue: Port already in use
Solution:

Change PORT in backend .env file
Kill the process using the port:

Windows: netstat -ano | findstr :5000
Mac/Linux: lsof -ti:5000 | xargs kill



Issue: CORS errors in browser
Solution:

Verify VITE_API_URL in frontend .env is correct
Ensure backend CORS is configured properly
Check both servers are running

Issue: JWT token invalid
Solution:

Clear localStorage in browser
Login again to get a new token
Verify JWT_SECRET matches between requests

Issue: Todos not loading
Solution:

Check browser console for errors
Verify you're logged in (check localStorage for token)
Ensure backend is running and accessible
Check network tab for API response


Demo Video
The demo video showcases all major features:

User signup and login flow
Creating multiple todos
Editing existing todos
Marking todos as complete/incomplete
Deleting todos
Viewing todo list with counts
Password reset flow

Video Link: https://drive.google.com/file/d/1hUqUuiynGUZgmpfUVY7kA8SwhFMcHHzD/view?usp=drive_link



