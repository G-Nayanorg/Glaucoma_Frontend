# Glaucoma Detection - Frontend Integration Summary

## Quick Overview

**Base URL:** `http://localhost:8000` (dev) | `https://your-domain.com` (prod)  
**Authentication:** JWT Bearer Token  
**Access Token:** 30 minutes | **Refresh Token:** 7 days

---

## 🎨 UI Modules to Implement

### 1. **Authentication Module**
- **Login Page** - Username/password form
- **Registration Page** - User signup with validation
- **Logout Function** - Clear tokens and redirect

### 2. **User Profile Module**
- **Profile View** - Display user info (name, email, role, tenant)
- **Session Management** - Token refresh handling

### 3. **Prediction Module**
- **Single Image Upload** - File input with preview
- **Batch Upload** - Multiple image selection (max 20)
- **Results Display** - Show prediction, confidence, risk level, recommendations
- **Processing Indicator** - Loading state during analysis

### 4. **Dashboard Module**
- **Role-Based Navigation** - Show/hide features by permission
- **User Info Display** - Username, role badge
- **Quick Actions** - Based on user permissions

### 5. **Permission Management UI**
- **Feature Gating** - Show/hide buttons based on RBAC
- **Error Handling** - Display permission denied messages
- **Role Indicators** - Visual badges for user roles

### 6. **Error Handling Module**
- **Toast/Alert System** - Show errors (401, 403, 500)
- **Session Expiry Handler** - Auto-refresh or redirect
- **Validation Feedback** - Form error messages

---

## 📡 API Endpoints to Integrate

### **Authentication APIs**

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/v1/auth/login` | POST | User login | ❌ No |
| `/api/v1/auth/register` | POST | User registration | ❌ No |
| `/api/v1/auth/refresh` | POST | Refresh access token | ❌ No |
| `/api/v1/auth/me` | GET | Get user profile | ✅ Yes |

### **Prediction APIs**

| Endpoint | Method | Purpose | Auth Required | Permission |
|----------|--------|---------|---------------|------------|
| `/predict` | POST | Single image prediction | ✅ Yes | `prediction:create` |
| `/batch-predict` | POST | Batch prediction (max 20) | ✅ Yes | `prediction:create` |

---

## 🔑 API Integration Details

### 1. **Login API**
```javascript
POST /api/v1/auth/login
Content-Type: application/x-www-form-urlencoded

Body: username=admin&password=iscs

Response: {
  access_token, refresh_token, token_type, 
  user_id, tenant_id, email, role
}
```

### 2. **Register API**
```javascript
POST /api/v1/auth/register
Content-Type: application/json

Body: {
  email, username, password, 
  first_name, last_name, 
  tenant_id: "default"
}

Response: {
  access_token, refresh_token, token_type,
  user_id, tenant_id, email, role: "no_role"
}
```

### 3. **Get User Profile API**
```javascript
GET /api/v1/auth/me
Authorization: Bearer {access_token}

Response: {
  id, user_id, email, username, 
  first_name, last_name, tenant_id, 
  role, is_active, is_verified, is_superuser
}
```

### 4. **Refresh Token API**
```javascript
POST /api/v1/auth/refresh
Content-Type: application/json

Body: { refresh_token }

Response: {
  access_token, refresh_token, token_type,
  user_id, tenant_id, email, role
}
```

### 5. **Prediction API**
```javascript
POST /predict
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

Body: 
  file: [Image File]
  use_cache: true (optional)

Response: {
  status, prediction, label, probability, 
  confidence, risk_level, recommendations, 
  processing_time_ms, timestamp, cached
}
```

### 6. **Batch Prediction API**
```javascript
POST /batch-predict
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

Body:
  files: [Image1, Image2, ...] (max 20)
  use_cache: true (optional)

Response: {
  status, total_images, successful, failed,
  cache_hits, cache_misses, cache_hit_rate,
  processing_time_ms, timestamp,
  results: [{ 
    index, filename, status, prediction, 
    label, probability, confidence, 
    risk_level, recommendations, cached 
  }]
}
```

---

## 🔐 RBAC Permissions Matrix

| Role | Patient Create/Read/Update/Delete | Prediction Create/Read/Update/Delete/Review |
|------|-----------------------------------|---------------------------------------------|
| **admin** | ✅ ✅ ✅ ✅ | ✅ ✅ ✅ ✅ ✅ |
| **doctor** | ✅ ✅ ❌ ❌ | ✅ ✅ ❌ ❌ ✅ |
| **radiologist** | ❌ ✅ ❌ ❌ | ✅ ✅ ✅ ❌ ✅ |
| **technician** | ✅ ✅ ✅ ❌ | ✅ ✅ ❌ ❌ ❌ |
| **viewer** | ❌ ✅ ❌ ❌ | ❌ ✅ ❌ ❌ ❌ |

---

## 🛠️ Implementation Checklist

### **Phase 1: Authentication Setup**
- [ ] Create login page with form validation
- [ ] Implement token storage (sessionStorage recommended)
- [ ] Create registration page with tenant_id="default"
- [ ] Implement logout functionality
- [ ] Add automatic token refresh on 401 errors

### **Phase 2: User Profile**
- [ ] Fetch and display user info from `/api/v1/auth/me`
- [ ] Show user role badge in UI
- [ ] Display tenant information

### **Phase 3: Prediction Features**
- [ ] Single image upload component
- [ ] Batch upload component (max 20 images)
- [ ] Results display with risk levels
- [ ] Processing/loading indicators
- [ ] Cache status display

### **Phase 4: RBAC Implementation**
- [ ] Create permission checker function
- [ ] Show/hide UI elements based on role
- [ ] Handle 403 errors gracefully
- [ ] Display permission-denied messages

### **Phase 5: Error Handling**
- [ ] Implement global error handler
- [ ] Auto token refresh on 401
- [ ] Display user-friendly error messages
- [ ] Handle network failures

---

## 📝 Code Snippets

### **Token Storage**
```javascript
// Store tokens after login/register
sessionStorage.setItem('access_token', data.access_token);
sessionStorage.setItem('refresh_token', data.refresh_token);
sessionStorage.setItem('user_role', data.role);
sessionStorage.setItem('user_id', data.user_id);
```

### **Authorization Header**
```javascript
// Add to all protected API calls
headers: {
  'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
}
```

### **Permission Check**
```javascript
const ROLE_PERMISSIONS = {
  admin: ['*'],
  doctor: ['patient:create', 'patient:read', 'prediction:create', 'prediction:read', 'prediction:review'],
  radiologist: ['patient:read', 'prediction:create', 'prediction:read', 'prediction:update', 'prediction:review'],
  technician: ['patient:create', 'patient:read', 'patient:update', 'prediction:create', 'prediction:read'],
  viewer: ['patient:read', 'prediction:read']
};

function hasPermission(userRole, permission) {
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes('*') || permissions.includes(permission);
}
```

### **Auto Token Refresh**
```javascript
// Intercept 401 errors and refresh token
if (response.status === 401) {
  const refreshToken = sessionStorage.getItem('refresh_token');
  
  const refreshResponse = await fetch('/api/v1/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken })
  });
  
  if (refreshResponse.ok) {
    const data = await refreshResponse.json();
    sessionStorage.setItem('access_token', data.access_token);
    sessionStorage.setItem('refresh_token', data.refresh_token);
    // Retry original request
  } else {
    // Logout and redirect to login
  }
}
```

---

## 🧪 Test Credentials

| Username | Password | Role | Use Case |
|----------|----------|------|----------|
| `admin` | `iscs` | admin | Full system access |
| `doctor1` | `iscs` | doctor | Create patients, predictions |
| `radiologist1` | `iscs` | radiologist | Review predictions |
| `technician1` | `iscs` | technician | Upload images |
| `viewer1` | `iscs` | viewer | Read-only access |

---

## 🚨 Common Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| **200** | Success | Process data |
| **201** | Created | Process data |
| **400** | Bad Request | Show validation errors |
| **401** | Unauthorized | Refresh token or login |
| **403** | Forbidden | Show permission error |
| **422** | Validation Failed | Show field errors |
| **500** | Server Error | Show retry message |

---

## 📚 Quick Reference

**API Docs:** `http://localhost:8000/docs`  
**Auth Method:** JWT Bearer Token  
**Token Lifetime:** Access: 30min | Refresh: 7 days  
**Max Batch Size:** 20 images  
**Multi-Tenancy:** Use `tenant_id: "default"` for single tenant  
**Security:** Store tokens in sessionStorage (or HTTP-only cookies for production)

---

**Last Updated:** November 13, 2025
