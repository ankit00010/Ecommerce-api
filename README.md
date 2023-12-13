
# E-Commerce API

 <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
          
          
          
          
          
          
This is a simple E-Commerce API built using Node.js, Express, and MongoDB.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [Middleware](#middleware)
- [Database](#database)
- [Error Handling](#error-handling)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)


## Introduction

This API provides functionality for an e-commerce platform with separate routes for buyers, sellers, and user authentication. The application utilizes Express for handling HTTP requests, MongoDB as the database, and includes middleware for validating access tokens and error handling.

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ankit00010/Ecommerce-api.git



2. **Install Dependencies:**

   To install the required dependencies, run the following command:

   ```bash
   npm install


3. **Set up your MongoDB connection:**

   Create a `.env` file in the root directory of the project and add the following information:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   PORT=your_port

4. **Run the application:**

   Execute the following command to start the server:

   ```bash
   npm run dev


## Project Structure

The project structure is organized into:

- `controller`: Contains controller functions for different routes.
- `middleware`: Includes middleware functions such as token validation and error handling.
- `config`: Holds configuration files, including the database connection.
- `models`: Defines Mongoose models for the database schema.
- `routes`: Specifies routes for different parts of the application.
- `app.js`: Main entry point for the application.

## Endpoints

- `/api/buyer`: Routes for buyers' logic.
- `/api/sellers`: Routes for sellers' logic.
- `/api/auth`: Routes for user authentication.

Detailed information about each endpoint can be found in the respective route files.

## Middleware

- `validateTokenHandler`: Middleware to validate access tokens.

## Database

The application uses MongoDB as the database. Mongoose is used for schema modeling and interaction with the database.

## Error Handling

The application includes a custom error handling middleware (`errorHandler`) to handle various HTTP status codes.

## Configuration

Configuration variables are stored in a `.env` file, including the MongoDB connection string and the access token secret.

## Author

Ankit Mishra








