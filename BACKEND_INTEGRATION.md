# Backend Integration Guide

## Overview
HeartLog frontend is designed to connect to your external backend API. This document outlines the expected API contract.

## Configuration

1. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Update `VITE_API_URL` with your backend URL:
   ```
   VITE_API_URL=https://your-backend-api.com
   ```

## Required API Endpoints

### Authentication

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe"
  },
  "token": "jwt-token-here"
}
```

**Error Response (400/409):**
```json
{
  "message": "Email already exists",
  "errors": {
    "email": ["Email is already registered"]
  }
}
```

#### POST /api/auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe"
  },
  "token": "jwt-token-here"
}
```

**Error Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

#### GET /api/auth/me
Get current authenticated user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "johndoe"
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized"
}
```

## CORS Configuration

Your backend must allow requests from the frontend origin. Example CORS headers:

```
Access-Control-Allow-Origin: https://your-frontend.replit.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

## Token Management

- The frontend stores JWT tokens in `localStorage` under the key `auth_token`
- All authenticated requests include the header: `Authorization: Bearer {token}`
- Tokens should be long-lived or implement refresh token mechanism
- On logout, the frontend removes the token from localStorage

## Validation

The frontend validates:
- Email format
- Username minimum 3 characters
- Password minimum 8 characters

Your backend should also validate and return appropriate error messages.

## Error Handling

All error responses should follow this format:

```json
{
  "message": "Human-readable error message",
  "errors": {
    "fieldName": ["Error message for this field"]
  }
}
```

The `errors` object is optional but recommended for field-specific validation errors.
