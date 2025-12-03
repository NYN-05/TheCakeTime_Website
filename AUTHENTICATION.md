# Authentication System Documentation

## Overview

TheCakeTime uses a **dual authentication ecosystem** with completely separate authentication flows for customers and administrators. This ensures security isolation and prevents role leakage between customer and admin accounts.

## Architecture

### Two Independent Authentication Systems

1. **Customer Authentication** (`/api/auth`)
   - Used for regular customers browsing and ordering cakes
   - Uses standard JWT secret
   - Longer token expiry (7 days)
   - Role: `customer`

2. **Admin Authentication** (`/api/admin/auth`)
   - Used for administrators and staff managing the system
   - Uses separate ADMIN_JWT_SECRET
   - Shorter token expiry (8 hours for security)
   - Roles: `admin` or `staff`

## Customer Authentication

### Endpoints

#### Register Customer
```
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "customer@example.com",
  "password": "securepassword",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "customer@example.com",
    "role": "customer"
  }
}
```

**Notes:**
- Automatically assigns `role: 'customer'`
- Cannot create admin accounts through this endpoint
- Token valid for 7 days

#### Login Customer
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "securepassword"
}
```

**Response:** Same as register

**Notes:**
- Only allows login for accounts with `role: 'customer'`
- Admin accounts cannot login through this endpoint

### Frontend Usage

**Customer Storage Keys:**
- Token: `localStorage.getItem('token')`
- User Data: `localStorage.getItem('user')`

## Admin Authentication

### Endpoints

#### Login Admin
```
POST /api/admin/auth/login
```

**Request Body:**
```json
{
  "email": "admin@thecaketime.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "name": "Admin User",
    "email": "admin@thecaketime.com",
    "role": "admin"
  }
}
```

**Notes:**
- Only allows login for accounts with `role: 'admin'` or `role: 'staff'`
- Uses separate ADMIN_JWT_SECRET
- Token valid for 8 hours
- Customer accounts cannot login through this endpoint

#### Create Admin/Staff (Protected)
```
POST /api/admin/auth/create-admin
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "New Admin",
  "email": "newadmin@example.com",
  "password": "securepassword",
  "role": "admin",
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "message": "Admin user created successfully",
  "user": {
    "_id": "user_id",
    "name": "New Admin",
    "email": "newadmin@example.com",
    "role": "admin"
  }
}
```

**Notes:**
- Only accessible to existing admins
- Can create accounts with role `admin` or `staff`
- Prevents duplicate email addresses

#### Get Current Admin
```
GET /api/admin/auth/me
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "Admin User",
  "email": "admin@thecaketime.com",
  "role": "admin"
}
```

#### Logout Admin
```
POST /api/admin/auth/logout
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### Frontend Usage

**Admin Storage Keys:**
- Token: `localStorage.getItem('adminToken')`
- User Data: `localStorage.getItem('adminUser')`

**Important:** Admin tokens are stored with different keys than customer tokens to prevent conflicts.

## Middleware

### authenticateCustomer
Validates customer JWT tokens using the standard JWT_SECRET. Ensures the user has `role: 'customer'`.

**Usage in Routes:**
```javascript
const { authenticateCustomer } = require('../middleware/authNew')

router.post('/orders', authenticateCustomer, async (req, res) => {
  // req.user contains the authenticated customer
  // req.userId contains the customer's ID
})
```

### authenticateAdmin
Validates admin JWT tokens using the ADMIN_JWT_SECRET. Ensures the user has `role: 'admin'` or `role: 'staff'`.

**Usage in Routes:**
```javascript
const { authenticateAdmin } = require('../middleware/authNew')

router.get('/admin/analytics', authenticateAdmin, async (req, res) => {
  // req.user contains the authenticated admin
  // req.userId contains the admin's ID
  // req.isAdmin is set to true
})
```

### authorizeAdmin
Role-based authorization middleware for fine-grained permission control.

**Usage in Routes:**
```javascript
const { authenticateAdmin, authorizeAdmin } = require('../middleware/authNew')

// Only allow admins, not staff
router.delete('/users/:id', authenticateAdmin, authorizeAdmin('admin'), async (req, res) => {
  // Only users with role 'admin' can access
})

// Allow both admins and staff
router.get('/orders', authenticateAdmin, authorizeAdmin('admin', 'staff'), async (req, res) => {
  // Users with role 'admin' or 'staff' can access
})
```

## Environment Variables

```bash
# Standard customer authentication secret
JWT_SECRET=your-secret-key-change-this-in-production

# Admin authentication secret (keep this very secure!)
ADMIN_JWT_SECRET=admin-super-secret-key-change-in-production
```

**Security Note:** Always use strong, unique secrets in production. The admin secret should be different from the customer secret.

## Initial Admin Setup

### Method 1: Using the Script

Run the admin creation script:

```bash
cd backend
node createAdmin.js
```

This creates an admin user with:
- Email: `admin@thecaketime.com`
- Password: `admin123`
- Role: `admin`

**⚠️ IMPORTANT:** Change the password immediately after first login!

### Method 2: Using MongoDB Directly

```javascript
db.users.insertOne({
  name: "Admin User",
  email: "admin@thecaketime.com",
  password: "$2a$10$hashedPasswordHere", // Use bcrypt to hash
  role: "admin",
  phone: "1234567890",
  createdAt: new Date()
})
```

### Method 3: Using the API (After First Admin Exists)

```bash
curl -X POST http://localhost:5000/api/admin/auth/create-admin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "New Admin",
    "email": "newadmin@example.com",
    "password": "securepassword",
    "role": "admin",
    "phone": "9876543210"
  }'
```

## Security Features

### Separation of Concerns
- **Different endpoints:** `/api/auth` vs `/api/admin/auth`
- **Different JWT secrets:** JWT_SECRET vs ADMIN_JWT_SECRET
- **Different storage keys:** `token` vs `adminToken`
- **Role filtering:** Each system only accepts its designated roles

### Token Expiry
- Customer tokens: 7 days (convenience for regular users)
- Admin tokens: 8 hours (enhanced security for privileged access)

### Role Protection
- Customer registration forces `role: 'customer'`
- Customer login filters for `role: 'customer'` only
- Admin login filters for `role: 'admin'` or `role: 'staff'` only
- No role leakage between systems

### Password Security
- All passwords hashed with bcrypt (salt rounds: 10)
- Passwords never stored in plain text
- Passwords never returned in API responses

## Frontend Integration

### Customer Authentication Flow

```typescript
// Register/Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})

const data = await response.json()
localStorage.setItem('token', data.token)
localStorage.setItem('user', JSON.stringify(data.user))

// Protected requests
const token = localStorage.getItem('token')
const response = await fetch('http://localhost:5000/api/orders', {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

### Admin Authentication Flow

```typescript
// Login
const response = await fetch('http://localhost:5000/api/admin/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})

const data = await response.json()
localStorage.setItem('adminToken', data.token)
localStorage.setItem('adminUser', JSON.stringify(data.user))

// Protected requests
const token = localStorage.getItem('adminToken')
const response = await fetch('http://localhost:5000/api/admin/analytics', {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

## Common Issues & Solutions

### Issue: "Invalid token" error
**Solution:** Check that you're using the correct endpoint and token:
- Customer routes: use token from `/api/auth/login`
- Admin routes: use token from `/api/admin/auth/login`

### Issue: Can't create admin account through registration
**Solution:** This is by design. Admin accounts can only be created:
1. Using the `createAdmin.js` script
2. Through the `/api/admin/auth/create-admin` endpoint (by existing admins)
3. Directly in MongoDB

### Issue: Token expired
**Solution:**
- Customer tokens expire after 7 days
- Admin tokens expire after 8 hours
- User must login again to get a new token

### Issue: Customer trying to access admin routes
**Solution:** Admin routes require admin tokens from `/api/admin/auth/login`. Customer tokens won't work even if the customer role is changed in the database.

## Testing Authentication

### Test Customer Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Customer",
    "email": "test@example.com",
    "password": "password123",
    "phone": "1234567890"
  }'
```

### Test Customer Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@thecaketime.com",
    "password": "admin123"
  }'
```

### Test Protected Customer Route
```bash
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN"
```

### Test Protected Admin Route
```bash
curl http://localhost:5000/api/admin/auth/me \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## Best Practices

1. **Always use HTTPS in production** to protect tokens in transit
2. **Keep JWT secrets secure** and never commit them to version control
3. **Use different secrets** for customer and admin authentication
4. **Implement refresh tokens** for longer sessions (future enhancement)
5. **Log authentication attempts** for security auditing
6. **Implement rate limiting** on login endpoints to prevent brute force
7. **Use strong passwords** for admin accounts
8. **Rotate admin passwords regularly**
9. **Revoke compromised tokens** by implementing a token blacklist (future enhancement)
10. **Monitor admin actions** through audit logging

## Future Enhancements

- [ ] Refresh token mechanism
- [ ] Token blacklist for logout
- [ ] Two-factor authentication (2FA) for admins
- [ ] Password reset functionality
- [ ] Email verification for customers
- [ ] Session management dashboard
- [ ] Failed login attempt tracking
- [ ] IP-based rate limiting
- [ ] Password complexity requirements
- [ ] Account lockout after failed attempts
