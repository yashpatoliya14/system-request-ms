# Authentication System Documentation

## Overview

The auth system uses **JWT tokens** stored in **httpOnly cookies** with **OTP-based email verification** for both signup and password reset flows. Passwords are hashed with **bcrypt** (12 rounds).

---

## Auth Flows

### 1. Signup Flow

```
[Signup Page] → POST /api/auth/signup → [Verify OTP Page] → POST /api/auth/verify_otp → [Login Page]
```

| Step | Page / API | What Happens |
|------|-----------|--------------|
| 1 | `/signup` | User enters FullName, Email, Phone, Password |
| 2 | `POST /api/auth/signup` | Validates input, hashes password, generates 6-digit OTP, stores in `tempUser` table, sends OTP via email |
| 3 | `/verify-otp?email=...` | User enters the OTP received via email |
| 4 | `POST /api/auth/verify_otp` | Verifies OTP + expiry, creates real user in `users` table, deletes `tempUser`, returns JWT token |
| 5 | `/login` | User is redirected to login |

### 2. Login Flow

```
[Login Page] → POST /api/auth/login → [Dashboard]
```

| Step | Page / API | What Happens |
|------|-----------|--------------|
| 1 | `/login` | User enters Email and Password |
| 2 | `POST /api/auth/login` | Finds user by email, compares password (supports both bcrypt and legacy plain-text), generates JWT |
| 3 | Response | Sets `auth_token` (httpOnly) and `user_role` cookies, redirects to dashboard |

### 3. Forgot Password Flow

```
[Login] → [Reset Password] → [Verify OTP] → [New Password] → [Login]
```

| Step | Page / API | What Happens |
|------|-----------|--------------|
| 1 | `/login` | User clicks "Forgot Password?" (email is pre-filled if entered) |
| 2 | `/reset-password` | User enters their email |
| 3 | `POST /api/auth/send_reset_otp` | Checks user exists in `users` table, generates OTP, stores in `tempUser`, sends via email |
| 4 | `/verify-otp?email=...&isForgotPassword=true` | User enters OTP |
| 5 | `POST /api/auth/verify_otp` | Verifies OTP, deletes `tempUser` (does NOT create new user since `isForgotPassword=true`) |
| 6 | `/new-password?email=...` | User enters new password + confirm password |
| 7 | `POST /api/auth/reset_password` | Hashes new password with bcrypt, updates user record |
| 8 | `/login` | User is redirected to login with new password |

---

## API Routes

### `POST /api/auth/signup`
- **Body**: `{ FullName, Email, Phone, ProfilePhoto, Password }`
- **Response**: `{ success, message, data }`
- **Notes**: Uses `upsert` on `tempUser` to handle re-signups (same email, never verified)

### `POST /api/auth/login`
- **Body**: `{ Email, Password }`
- **Response**: `{ success, message, data, token }`
- **Cookies Set**: `auth_token` (httpOnly, 7 days), `user_role` (client-readable)

### `POST /api/auth/verify_otp`
- **Body**: `{ Email, Otp, isForgotPassword? }`
- **Response**: `{ success, message, data, token? }`
- **Behavior**:
  - `isForgotPassword=false` (default): Creates user from `tempUser`, returns JWT
  - `isForgotPassword=true`: Only verifies OTP, cleans up `tempUser`

### `POST /api/auth/send_reset_otp`
- **Body**: `{ Email }`
- **Response**: `{ success, message, data }`
- **Notes**: Checks user exists first, then sends OTP

### `POST /api/auth/reset_password`
- **Body**: `{ Email, Password }`
- **Response**: `{ success, message, data }`
- **Notes**: Hashes password with bcrypt before updating

### `POST /api/auth/resend_otp`
- **Body**: `{ Email }`
- **Response**: `{ success, message, data }`
- **Notes**: Generates new OTP for existing `tempUser` entry

### `POST /api/auth/check_user`
- **Body**: `{ email }`
- **Response**: `{ success, user? }` or `{ success: false, message }`

### `GET /api/auth/me`
- **Auth**: Requires `auth_token` cookie
- **Response**: Current user details from JWT

### `POST /api/auth/logout`
- **Response**: Clears auth cookies

---

## Security Details

| Feature | Implementation |
|---------|---------------|
| **Password Hashing** | bcrypt with 12 salt rounds |
| **JWT Storage** | httpOnly cookie (`auth_token`), not accessible via JavaScript |
| **JWT Expiry** | Configured via `JWT_TOKEN_EXPIRY` constant |
| **OTP Expiry** | 10 minutes from generation |
| **OTP Cleanup** | Expired `tempUser` records auto-deleted every 10 minutes via `instrumentation.ts` |
| **Cookie Settings** | `secure` in production, `sameSite: lax`, 7-day max age |

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/auth.ts` | JWT helpers: `generateToken`, `verifyToken`, `getDetailsFromToken` |
| `lib/prisma.ts` | Prisma client singleton |
| `lib/apiClient.ts` | Frontend fetch wrapper |
| `lib/cleanupTempUsers.ts` | Deletes expired `tempUser` records |
| `services/auth.ts` | Email service (sends OTP via nodemailer/Gmail) |
| `middleware.ts` | Route protection via JWT verification |
| `instrumentation.ts` | Schedules `tempUser` cleanup every 10 minutes on server start |
