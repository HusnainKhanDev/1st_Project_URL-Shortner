# URL Shortener Project

A simple URL Shortener web application built with Node.js, Express, MongoDB, and EJS. Users can sign up, sign in, create short URLs, and view analytics for their shortened links.

## Features

- User signup and signin with session management
- Create short URLs for any original URL
- Redirect to original URL using the short link
- Track number of clicks for each short URL
- View analytics for all URLs created by the user

## Project Structure

- `1 Model/` - Mongoose models for User and URL
- `2 Controller/` - Controllers for business logic
- `3 Route/` - Express route definitions
- `4 Views/` - EJS templates for frontend
- `MiddleWare/` - Middleware for authentication
- `SessionID_Data.JSON` - Stores session data
- `SessionID_Service.js` - Handles session read/write

## API Endpoints

### User APIs

- `POST /api/create/newuser`  
  Create a new user (signup).  
  **Body:** `fullname`, `username`, `email`, `password`

- `POST /api/signin/user`  
  Sign in an existing user.  
  **Body:** `email`, `password`

### URL Shortener APIs

- `POST /api/create/shorturl`  
  Create a new short URL (requires authentication).  
  **Body:** `url`

- `GET /api/redirect/:shorturl`  
  Redirect to the original URL using the short URL.

- `GET /analytics`  
  View analytics for all URLs created by the signed-in user (requires authentication).

### View Routes

- `GET /signup`  
  Render the signup page.

- `GET /signin`  
  Render the signin page.

- `GET /home`  
  Render the home page with user's URLs and analytics (requires authentication).

## How It Works

1. User signs up and signs in.
2. After signing in, user can create a short URL for any original URL.
3. The app generates a unique short ID and stores the mapping in MongoDB.
4. When someone visits the short URL, they are redirected to the original URL and the click is tracked.
5. Users can view analytics (number of clicks) for their URLs on the home page.
