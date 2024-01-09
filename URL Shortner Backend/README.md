# URL Shortener API

This API enables users to shorten URLs into manageable, unique short codes.
[Deployed Link](https://url-shortner-api-lmwn.onrender.com).

## Overview

This URL Shortener API provides functionalities for user management, URL shortening, and redirection. Below are the available endpoints and their functionalities:

### Users

- `POST /api/v1/users/create`: Create a new user account.
- `POST /api/v1/users/create-session`: User login to obtain an authentication token.
- `PATCH /api/v1/users/update`: Update user details.
- `DELETE /api/v1/users/destroy`: Delete a user account.

### URLs

- `POST /api/v1/urls/shorten`: Shorten a long URL to obtain a unique short code.
- `GET /api/v1/urls/{code}`: Retrieve the original URL using a short code.

### Redirect

- `GET /{code}`: Redirect to the original URL associated with the short code. *Note: This endpoint does not return JSON; it redirects to the URL directly.*

## Installation

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the server using `npm start`.

## Usage

1. Ensure you have valid credentials for user-specific endpoints that require authorization.
2. Use the provided endpoints to manage users and shorten URLs.

## API Documentation

For detailed information on each endpoint, refer to the [Swagger Documentation](https://url-shortner-api-lmwn.onrender.com/api-docs).

## Technologies Used

- Node.js
- Express
- MongoDB
- Swagger (for API documentation)

## Security

- JWT-based authentication is used for authorized endpoints.
- Secure endpoints by including a valid bearer token in the request header.

