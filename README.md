# User Management API with Redis Caching

This project demonstrates a simple user management API built with Node.js, Express, and MongoDB, with a strong focus on practical implementation of Redis caching for improved performance and responsiveness.

## Features

- **User Creation:** Add new users with name and email (basic validation included).
- **User Listing:** Retrieve a list of all users.
- **Redis Caching:**
  - Leverages Redis to cache user data, significantly reducing database load and improving response times for frequent requests.
  - Employs a cache expiration mechanism (TTL - Time-to-Live) to ensure data freshness.
  - Efficiently invalidates the cache when new users are created.

## Getting Started

1. **Prerequisites**

   - Node.js and npm (or yarn) installed on your machine.
   - MongoDB instance running.
   - Redis server running (locally or remotely).

2. **Installation**

   ```bash
   git clone <repo URI>
   ```

3. **Check out to backend**
   ```
   cd backend
   npm i
   ```
4. **Checkout to frontend**

   ```
   cd frontend
   npm i
   ```

5. **ENV configuration for the backend**
   ```
   PORT = 3000
   MONGO_URI = <mongodb connection string>
   REDIS_HOST= <redis host>
   REDIS_PORT= <redis port>
   REDIS_PASSWORD=<your redis password>
   ```
6. **Run the server and Client**
   ```
   npm start
   ```
7. **Caching Strategy**
   ```
   Key: allUsers - used to store the list of all users.
   TTL (Time-to-Live): 3600 seconds (1 hour) - Adjust as needed.
   Cache Invalidation: The allUsers cache is deleted when a new user is created to ensure data consistency.
   ```
8. **Contributions**
   Contributions are welcome! Please feel free to submit pull requests or open issues to report bugs or suggest improvements.
