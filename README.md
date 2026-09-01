# 🎬 Movie Mafia

> A full-stack movie discovery platform built with the MERN stack, designed to help users discover movies, explore detailed information, save movies for later, and find verified streaming/watch options available in India.

<p align="center">
  <a href="https://movie-mafia-orcin.vercel.app/">🌐 Live Application</a> •
  <a href="https://github.com/atharv7676/MovieMafia">💻 GitHub Repository</a>
</p>

---

## 📌 Overview

**Movie Mafia** is a full-stack movie discovery web application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.

The application combines movie metadata from **The Movie Database (TMDB)** with a custom backend API and MongoDB database to provide a structured movie discovery experience.

Users can browse movies, search and explore movie details, view ratings and genres, check available watch options, authenticate securely, and maintain a personal watch-later/wishlist collection.

The project was designed not only as a frontend movie application, but as a complete full-stack system involving:

* REST API design
* Authentication and authorization
* Database modeling
* External API integration
* Cloud image storage
* Middleware
* API security
* Rate limiting
* Deployment
* Automated movie data generation
* Frontend/backend communication
* Production environment configuration

---

## 🌐 Project Links

| Resource         | Link                                                              |
| ---------------- | ----------------------------------------------------------------- |
| 🚀 Live Frontend | [Movie Mafia](https://movie-mafia-orcin.vercel.app/)              |
| 💻 GitHub        | [atharv7676/MovieMafia](https://github.com/atharv7676/MovieMafia) |
| ⚙️ Backend       | **Add your Render URL here**                                      |
| 🗄️ Database     | MongoDB Atlas                                                     |
| 🎬 Movie Data    | TMDB API                                                          |
| ☁️ Image Storage | Cloudinary                                                        |

> **Note:** The backend is deployed separately from the frontend. Replace the Render placeholder above with your deployed backend URL.

---

# ✨ Features

## 👤 User Features

* User registration
* User login/logout
* Authentication using JWT
* Refresh-token based authentication
* HTTP-only authentication cookies
* Protected routes
* User profile
* Watch Later / Wishlist
* Add movies to watch later
* Remove movies from watch later
* Persistent user data

## 🎥 Movie Features

* Movie discovery
* Movie listing
* Movie search
* Movie details
* Movie posters
* Movie ratings
* Movie genres
* Release year
* Duration
* Language
* Director
* Cast information
* Movie descriptions
* Watch-provider information
* India-specific streaming availability
* Hero movie carousel
* Genre-based movie sections

## 👑 Admin Features

* Admin-only functionality
* Role-based authorization
* Movie management through protected backend functionality

## 🎨 UI/UX

* Responsive interface
* Modern dark movie-themed UI
* Tailwind CSS styling
* shadcn/ui components
* Lucide icons
* Reusable React components
* Animated/interactive movie cards
* Hero carousel
* Star background
* Responsive navigation
* Protected pages

---

# 🏗️ Architecture

Movie Mafia follows a **client-server REST architecture**.

```text
                    ┌──────────────────────┐
                    │      React Client    │
                    │      Vite + React    │
                    └──────────┬───────────┘
                               │
                               │ HTTP Requests
                               ▼
                    ┌──────────────────────┐
                    │     Express API      │
                    │      Node.js         │
                    └──────────┬───────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
          Controllers      Middleware       Routes
                │
                ▼
          ┌──────────────┐
          │   Mongoose   │
          └──────┬───────┘
                 │
                 ▼
          ┌──────────────┐
          │ MongoDB Atlas│
          └──────────────┘


External Services

 React
   │
   ├──────────────► Movie Mafia REST API
   │
   └──────────────► TMDB / Backend Movie Data

 Backend
   │
   ├──────────────► MongoDB Atlas
   │
   ├──────────────► Cloudinary
   │
   └──────────────► TMDB API
```

---

# 🛠️ Tech Stack

## Frontend

| Technology   | Purpose                            |
| ------------ | ---------------------------------- |
| React        | Building the user interface        |
| Vite         | Frontend development/build tooling |
| JavaScript   | Application logic                  |
| Tailwind CSS | Utility-first styling              |
| shadcn/ui    | Reusable UI components             |
| Lucide React | Icons                              |
| React Router | Client-side routing                |
| Axios        | HTTP/API communication             |

---

## Backend

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| Node.js            | JavaScript runtime              |
| Express.js         | REST API framework              |
| MongoDB            | Database                        |
| Mongoose           | MongoDB ODM                     |
| JWT                | Authentication                  |
| bcrypt             | Password hashing                |
| CORS               | Cross-origin communication      |
| Helmet             | HTTP security headers           |
| express-rate-limit | API rate limiting               |
| Morgan             | HTTP request logging            |
| cookie-parser      | Cookie parsing                  |
| Nodemon            | Development server auto-restart |

---

## External Services

### 🎬 TMDB

Movie Mafia uses **The Movie Database (TMDB)** as the primary external movie-data source.

TMDB is used for movie information such as:

* Movie titles
* Descriptions
* Release dates
* Genres
* Ratings
* Runtime
* Languages
* Posters
* Credits
* Cast
* Directors
* Streaming/watch-provider information

The backend processes TMDB data before storing the required information in the Movie Mafia database.

---

### ☁️ Cloudinary

Cloudinary is used for cloud-based image storage and delivery.

Movie poster assets can be uploaded and served through Cloudinary rather than relying entirely on local files.

This provides:

* Cloud storage
* CDN delivery
* Image URLs
* Better production compatibility
* Separation between application code and media assets

---

### 🗄️ MongoDB Atlas

MongoDB Atlas hosts the application's production database.

Mongoose is used to define schemas and interact with MongoDB.

---

# 🎯 Why a Custom Backend?

Instead of making every frontend request directly to TMDB, Movie Mafia uses its own backend API.

```text
Frontend
   │
   ▼
Movie Mafia API
   │
   ├── Authentication
   ├── Authorization
   ├── Database operations
   ├── Movie queries
   └── Business logic
          │
          ▼
       MongoDB
```

This approach allows the application to:

* Keep sensitive credentials on the server
* Control the structure of movie data
* Store movies in MongoDB
* Add custom application logic
* Implement authentication
* Implement authorization
* Add rate limiting
* Validate incoming requests
* Build custom movie queries
* Reduce dependency on direct frontend API access

---

# 📡 REST API Design

The backend follows a REST-style API architecture.

The general request flow is:

```text
Client Request
      ↓
Router
      ↓
Middleware
      ↓
Controller
      ↓
Model
      ↓
MongoDB
      ↓
Controller Response
      ↓
Client
```

The API is organized around resources such as:

* Users
* Movies
* Wishlist / Watch Later

---

# 🔐 Authentication

Movie Mafia implements authentication using **JWT-based authentication**.

The authentication system includes:

* Registration
* Login
* Logout
* Access authentication
* Refresh-token handling
* HTTP-only cookies
* Protected routes
* Role-based authorization

### Authentication Flow

```text
User Login
    ↓
Backend validates credentials
    ↓
Password verification
    ↓
JWT tokens generated
    ↓
Authentication cookie
    ↓
Client makes authenticated request
    ↓
Backend verifies authentication
    ↓
Protected resource returned
```

---

# 🔄 Token Refresh

The frontend uses an Axios instance with an interceptor to handle authentication failures.

When an authenticated API request returns a `401` response, the interceptor can attempt the refresh-token flow before retrying the original request.

Conceptually:

```text
API Request
     ↓
401 Unauthorized
     ↓
Refresh Authentication
     ↓
Receive new access authentication
     ↓
Retry original request
```

This helps prevent users from being unnecessarily logged out when an access token expires.

---

# 🛡️ Backend Middleware

Movie Mafia uses multiple Express middleware layers.

## CORS

CORS allows the separately deployed frontend and backend to communicate.

This becomes especially important because:

```text
Frontend → Vercel
Backend  → Render
```

are different origins.

---

## Helmet

Helmet adds security-related HTTP headers to Express responses.

It helps reduce exposure to several common web security issues.

---

## Rate Limiting

`express-rate-limit` is used to restrict excessive requests to the backend.

This provides a basic layer of protection against:

* Request flooding
* Brute-force attempts
* Accidental API abuse

---

## Morgan

Morgan provides HTTP request logging during development and debugging.

Example:

```text
GET /movies
POST /users/login
GET /users/me
```

This makes backend request flow easier to inspect.

---

## cookie-parser

`cookie-parser` allows Express to read cookies sent by the client.

It is particularly important for the authentication system because authentication information is handled through cookies.

---

## Error Handler

A centralized error-handling middleware is used to prevent error-handling logic from being duplicated across controllers.

Conceptually:

```text
Controller
    ↓
Error
    ↓
next(error)
    ↓
Global Error Handler
    ↓
Consistent API Response
```

---

# 🗃️ Database

MongoDB Atlas is used as the production database.

Mongoose provides schema definitions and database operations.

## Movie Model

The movie data model contains information such as:

* Title
* Description
* Release year
* Genre
* Duration
* Director
* Rating
* Language
* Poster URL
* Cast
* Watch options

The schema also applies validation rules such as:

* Required fields
* Minimum/maximum values
* Description length
* Duration constraints
* Rating range

---

## User Model

The user system contains information such as:

* Name
* Email
* Password
* Role
* Subscription
* Refresh token
* Wishlist / Watch Later movies

Passwords are not stored as plain text.

They are hashed before being persisted.

---

# ❤️ Watch Later / Wishlist

Users can maintain a personal list of movies they want to watch later.

The flow is:

```text
User
 ↓
Add Movie
 ↓
Backend validates user
 ↓
Movie ID stored in user's wishlist
 ↓
Movie can be populated when requested
```

The backend also prevents duplicate movie entries.

---

# 🎨 Frontend Architecture

The frontend is built as a React single-page application.

Major responsibilities are separated between:

* Pages
* Components
* Services
* Context
* Layouts
* Routing
* API communication

A simplified structure is:

```text
React Application
│
├── Main Layout
│   └── Navbar
│
├── Pages
│   ├── Home
│   ├── Movies
│   ├── Movie Details
│   ├── Login
│   ├── Register
│   ├── Profile
│   ├── Watch Later
│   └── Admin
│
├── Components
│   ├── Movie Card
│   ├── Hero
│   ├── Navbar
│   └── UI Components
│
├── Services
│   └── API Requests
│
└── Authentication Context
```

---

# 🎨 UI Libraries

## Tailwind CSS

Tailwind is used for styling the application using utility classes.

This allows the UI to be developed quickly while maintaining responsive layouts.

---

## shadcn/ui

shadcn/ui is used for reusable and customizable interface components.

Rather than depending on a large pre-styled component library, components can be integrated and customized directly inside the project.

---

## Lucide React

Lucide React provides the application's icon system.

Icons are used for actions and UI elements such as:

* Search
* User
* Home
* Back
* Star
* Watch Later
* Admin
* Navigation
* Logout
* Movie-related actions

---

# 🔎 Movie Discovery

The application provides multiple ways to discover movies.

Users can:

* Browse movie collections
* Search movies
* Explore genres
* Open individual movie details
* See ratings
* See release information
* View cast/director information
* Check watch availability

---

# 🤖 Automated Movie Generation

One of the more interesting backend features is the `generateMovies.js` script.

Instead of manually entering every movie into MongoDB, the script can retrieve movie information from TMDB and transform it into the structure expected by Movie Mafia.

### General Flow

```text
             TMDB
               │
               ▼
       Popular / Top Rated
               │
               ▼
        Movie Identification
               │
               ▼
        Detailed Movie Data
               │
        ┌──────┴──────┐
        ▼             ▼
      Credits      Providers
        │             │
        ▼             ▼
      Cast        India (IN)
      Director    Availability
        │             │
        └──────┬──────┘
               ▼
        Movie Mafia Schema
               │
               ▼
            MongoDB
```

The script is responsible for transforming external API data into application-specific movie documents.

It can process information including:

* Title
* Description
* Release year
* Genres
* Runtime
* Rating
* Language
* Poster
* Director
* Cast
* Watch providers

---

# 🇮🇳 India Watch Providers

A specific part of the movie-generation process is checking watch-provider information for **India**.

The application does not simply generate random streaming links.

Provider information returned by TMDB is filtered for the Indian region where available.

This allows Movie Mafia to present watch information that is relevant to Indian users.

If TMDB does not provide verified provider information for a movie in the required region, the application does not invent a provider.

---

# 🌱 Movie Seeding

`seedMovies.js` is responsible for inserting generated movie data into the application's database.

The general workflow is:

```text
Generate movie data
       ↓
Validate movie structure
       ↓
Check existing database records
       ↓
Skip duplicates
       ↓
Insert new movies
       ↓
MongoDB Atlas
```

This makes it possible to expand the movie catalogue without manually creating every database document.

---

# 💻 Available Commands

## Frontend

From the frontend directory:

```bash
npm install
```

Install frontend dependencies.

```bash
npm run dev
```

Start the Vite development server.

```bash
npm run build
```

Create the production frontend build.

```bash
npm run preview
```

Preview the production build locally.

---

## Backend

From the backend directory:

```bash
npm install
```

Install backend dependencies.

```bash
npm run dev
```

Start the backend using Nodemon during development.

```bash
npm start
```

Start the backend normally in production mode, depending on the configured backend script.

---

## Movie Generation

The movie-generation command depends on the scripts configured in the backend `package.json`.

Typical usage:

```bash
node generateMovies.js
```

or the corresponding npm script configured for the project.

The generator retrieves and transforms movie information from TMDB.

---

## Movie Seeding

The seed script can be executed using the corresponding backend command/script.

Example:

```bash
node seedMovies.js
```

> Always use the exact npm script defined in `backend/package.json` if one is provided.

---

# 🔑 Environment Variables

Environment variables are used to keep secrets and deployment-specific configuration outside the source code.

## Backend

The backend uses environment variables for values such as:

```env
MOVIE_URI=

TMDB_API_KEY=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Depending on the final backend configuration, additional authentication or cookie-related environment variables may also be required.

---

## Frontend

The frontend uses a Vite environment variable for the backend API URL:

```env
VITE_API_URL=
```

### Development

```env
VITE_API_URL=http://localhost:3000
```

### Production

```env
VITE_API_URL=<YOUR_RENDER_BACKEND_URL>
```

The production frontend therefore communicates with the deployed Render backend instead of localhost.

---

# 🚀 Deployment

Movie Mafia is deployed using separate frontend and backend services.

```text
                   Internet
                      │
                      ▼
             ┌─────────────────┐
             │     Vercel      │
             │ React Frontend  │
             └────────┬────────┘
                      │
                      │ HTTPS API
                      ▼
             ┌─────────────────┐
             │     Render      │
             │ Node + Express  │
             └────────┬────────┘
                      │
             ┌────────┴─────────┐
             ▼                  ▼
       MongoDB Atlas         Cloudinary
```

## Frontend — Vercel

The React/Vite frontend is deployed on Vercel.

Live application:

https://movie-mafia-orcin.vercel.app/

---

## Backend — Render

The Express/Node backend is deployed separately on Render.

The frontend's:

```env
VITE_API_URL
```

must point to the deployed Render backend.

---

## MongoDB Atlas

MongoDB Atlas provides the production database used by the backend.

---

## Cloudinary

Cloudinary provides cloud-based image storage for movie poster assets.

---

# 🐛 Problems Faced & Solutions

Building Movie Mafia involved several real-world development and deployment problems.

## 1. MongoDB Atlas DNS Issue

One of the backend development issues involved MongoDB Atlas SRV/DNS resolution.

The connection produced DNS-related errors while resolving the MongoDB Atlas cluster.

The database connection was adjusted to handle the DNS environment more reliably.

This was particularly useful during local development where the default DNS resolution was failing.

---

## 2. Environment Variables

The backend initially encountered an issue where the MongoDB URI was undefined.

The root cause was related to environment-variable loading and when the database connection was initialized.

The solution involved correctly loading environment variables and ensuring the database connection was established before starting the server.

---

## 3. Frontend → Backend Deployment

Local development used a localhost backend:

```text
http://localhost:3000
```

After deployment, the frontend was running on Vercel while the backend was running on Render.

The frontend therefore needed to use:

```env
VITE_API_URL=<Render backend URL>
```

instead of localhost.

---

## 4. CORS

Because the frontend and backend are deployed on different origins, browser CORS restrictions had to be handled.

The backend was configured to allow requests from the frontend origin and support credentials where required.

---

## 5. Authentication Cookies

Authentication worked differently after deployment because frontend and backend were hosted on separate domains.

Cookie configuration, CORS, credentials, and authentication flow all needed to work together.

This was an important difference between local development and production deployment.

---

## 6. Access Token Refresh

Authenticated requests could return `401 Unauthorized` when the access token expired.

An Axios response interceptor was implemented to detect authentication failures and attempt the refresh flow before retrying the original request.

---

## 7. TMDB Watch Provider Data

TMDB movie metadata and streaming-provider information are not always available for every movie and region.

Movie Mafia therefore processes provider information specifically for India.

The application avoids fabricating watch links when verified provider data is unavailable.

---

## 8. Duplicate Movies

When automatically generating movies, repeatedly running the generator could potentially create duplicates.

The movie-generation/seeding workflow therefore checks existing records before inserting new movie documents.

This makes the data-generation process safer to run repeatedly.

---

## 9. Frontend API Response Handling

During development, API response structures caused issues where frontend code attempted to operate on the response object instead of the response data.

For example, when Axios is used:

```javascript
response.data
```

contains the actual API response payload.

Understanding the distinction between the Axios response object and its `.data` property resolved the issue.

---

## 10. Movie Details Page

The movie details page initially had routing/data-loading issues where the layout and background rendered but the movie information did not.

The issue required checking:

* Route parameters
* Movie ID
* API request
* API response
* State updates
* Component rendering

This reinforced the importance of debugging the complete frontend → backend → database flow rather than only inspecting the UI.

---

# 🔒 Security Practices

Movie Mafia uses several security-related practices:

* Environment variables for secrets
* Password hashing
* JWT authentication
* HTTP-only cookies
* CORS configuration
* Helmet
* Rate limiting
* Protected routes
* Role-based authorization
* Backend validation
* Centralized error handling

Secrets such as:

```text
TMDB API key
MongoDB credentials
JWT secret
Cloudinary credentials
```

should never be committed to GitHub.

---

# 📁 Project Structure

The project is organized as a full-stack application with separate frontend and backend codebases.

A simplified representation:

```text
MovieMafia/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── layouts/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── generateMovies.js
│   ├── seedMovies.js
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

> The exact directory names should be kept synchronized with the repository structure.

---

# 🧪 API Testing

The backend API can be tested independently using tools such as **Postman**.

Typical testing workflow:

```text
Start Backend
      ↓
Connect MongoDB
      ↓
Send Request via Postman
      ↓
Express Router
      ↓
Controller
      ↓
Database
      ↓
JSON Response
```

This was useful during development for testing backend functionality before connecting every frontend page.

---

# 📚 Development Approach

Movie Mafia was developed incrementally rather than building the entire application at once.

The general development process was:

```text
Database
   ↓
Models
   ↓
Controllers
   ↓
Routes
   ↓
Middleware
   ↓
REST API
   ↓
Frontend Services
   ↓
React Pages
   ↓
UI Components
   ↓
Authentication
   ↓
External APIs
   ↓
Deployment
   ↓
Production Debugging
```

This approach made it easier to isolate problems and understand how each layer communicates with the next.

---

# 🚧 Future Improvements

Potential improvements include:

* Advanced movie filtering
* Pagination
* Reviews and ratings
* Personalized recommendations
* Improved admin dashboard
* Subscription features
* Better movie-provider integration
* Automated scheduled movie updates
* More detailed analytics
* Automated testing
* CI/CD pipeline
* Improved caching
* API documentation using Swagger/OpenAPI
* More granular authorization
* Improved performance optimization

---

# 📖 What I Learned

Building Movie Mafia helped strengthen practical understanding of:

* MERN stack development
* REST API design
* Express middleware
* MongoDB/Mongoose
* JWT authentication
* Refresh-token architecture
* HTTP-only cookies
* CORS
* API security
* Rate limiting
* React state management
* React Router
* Axios interceptors
* External API integration
* Cloudinary
* Environment variables
* Vercel deployment
* Render deployment
* MongoDB Atlas
* Debugging production issues
* Automated data generation
* Database seeding

More importantly, the project provided experience with the difference between **local development and production deployment**, especially around CORS, environment variables, cookies, API URLs, DNS, and independently deployed frontend/backend services.

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/atharv7676/MovieMafia.git
cd MovieMafia
```

## 2. Install frontend dependencies

```bash
cd frontend
npm install
```

## 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

## 4. Configure environment variables

Create the required `.env` files and add your MongoDB, JWT, TMDB, Cloudinary, and frontend API configuration.

## 5. Start the backend

```bash
npm run dev
```

## 6. Start the frontend

```bash
npm run dev
```

## 7. Open the application

Vite will provide the local development URL in the terminal.

---

# 👨‍💻 Author

## Atharv Morabale

Computer Science Engineering graduate and MERN stack developer focused on building full-stack web applications.

### Connect with me

* 💻 GitHub: [atharv7676](https://github.com/atharv7676)
* 🔗 LinkedIn: [Atharv Morabale](https://in.linkedin.com/in/atharv-morabale-15b9a9264)

---

# ⭐ Support

If you found this project interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is intended as a personal portfolio/full-stack development project.

Check the repository for the current license configuration.
