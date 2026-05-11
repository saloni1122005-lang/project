# Architecture & Code Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND (PUBLIC)                     │
│  HTML5 | CSS3 | Vanilla JavaScript | Chart.js          │
│  (Runs in Browser)                                      │
└─────────────────────────────────────────────────────────┘
                          ↕ HTTP/JSON
┌─────────────────────────────────────────────────────────┐
│              EXPRESS.JS SERVER (server.js)              │
│  Routes → Controllers → Models → Database               │
└─────────────────────────────────────────────────────────┘
                          ↕ SQL Queries
┌─────────────────────────────────────────────────────────┐
│                 MYSQL DATABASE                          │
│  10 Tables | Indexed Queries | Relationships            │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow

### 1. User Signup/Login
```
Browser Form Submit
    ↓
POST /api/auth/signup
    ↓
Validate Input
    ↓
Hash Password (bcrypt)
    ↓
Save to Database
    ↓
Generate JWT Token
    ↓
Return Token to Browser
    ↓
Store in localStorage
```

### 2. Create Trip
```
Browser Form
    ↓
POST /api/trips (with JWT token)
    ↓
Verify Token (middleware)
    ↓
Validate Trip Data
    ↓
Insert into Database
    ↓
Return Trip ID
    ↓
Redirect to Trip View
```

### 3. Add Itinerary
```
Search City
    ↓
GET /api/cities/search
    ↓
Query Cities from DB
    ↓
Display Results
    ↓
User Selects City
    ↓
POST /api/itinerary/add-city
    ↓
Insert City Dates to Itinerary
    ↓
Refresh Display
```

---

## 📦 Code Organization

### Models (Database Layer)
Each model represents a database table with methods:
- `create()` - Insert new record
- `findById()` - Get single record
- `findByX()` - Search records
- `update()` - Modify record
- `delete()` - Remove record

**Example:**
```javascript
const Trip = require('../models/Trip');
const tripId = await Trip.create(userId, name, ...);
const trips = await Trip.findByUserId(userId);
```

### Routes (API Layer)
Each route file defines endpoints for a feature:
- Route definition
- Request validation
- Call model methods
- Return JSON response

**Example:**
```javascript
router.post('/', verifyToken, async (req, res) => {
  // Create trip logic
  const tripId = await Trip.create(...);
  res.status(201).json({ success: true, tripId });
});
```

### Middleware (Processing Layer)
- `auth.js` - JWT token verification
- Validates requests before reaching routes
- Attaches user info to request

**Example:**
```javascript
const token = req.headers.authorization?.split(' ')[1];
const decoded = jwt.verify(token, JWT_SECRET);
req.userId = decoded.userId;
```

### Frontend (Presentation Layer)
- Static HTML files
- Form validation
- API calls using fetch()
- DOM manipulation
- LocalStorage for session

---

## 🔐 Authentication Flow

```
1. User Enters Credentials
        ↓
2. Browser POST /api/auth/login
        ↓
3. Server Hashes Password & Compares
        ↓
4. If Match: Generate JWT Token
        ↓
5. Return Token to Client
        ↓
6. Browser Stores in localStorage
        ↓
7. All Future Requests Include Token in Header:
   Authorization: Bearer eyJhbGc...
        ↓
8. Server Verifies Token with Middleware
        ↓
9. Extract userId from Token
        ↓
10. Proceed with Authorized Action
```

---

## 💾 Database Relationships

```
Users (1) ─────────────────────── (Many) Trips
           user_id (FK)
           
Trips (1) ─────────────────────── (Many) Itinerary
          trip_id (FK)
          
Trips (1) ─────────────────────── (Many) Budget
          trip_id (FK)

Trips (1) ─────────────────────── (Many) Notes
          trip_id (FK)

Cities (1) ────────────────────── (Many) Activities
           city_id (FK)

Itinerary (1) ───────────────── (Many) TripActivities
              itinerary_id (FK)

Cities (Many) ◄──────────────► (Many) Trips
              (via Itinerary junction table)
```

---

## 🎯 Key Technologies

### Bcrypt (Password Hashing)
```javascript
const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hash);
```

### JWT (Token Generation)
```javascript
const token = jwt.sign({ userId }, SECRET, { expiresIn: '7d' });
const decoded = jwt.verify(token, SECRET);
```

### MySQL Connection Pool
```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'traveloop'
});
```

### Fetch API (Frontend)
```javascript
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: JSON.stringify(data)
});
```

---

## 📊 Database Indexing

**Optimized Queries:**
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_trips_user_id ON trips(user_id);
CREATE INDEX idx_itinerary_trip_id ON itinerary(trip_id);
CREATE INDEX idx_share_links_token ON share_links(share_token);
```

---

## 🚀 Performance Optimizations

1. **Connection Pooling** - Reuse DB connections
2. **Indexed Queries** - Fast searches on indexed columns
3. **Pagination** - Load data in chunks
4. **Caching** - Browser cache static assets
5. **Minification** - Reduce file sizes
6. **Lazy Loading** - Load images on demand

---

## 🔒 Security Layers

```
Request
   ↓
CORS Check ─ Allow cross-origin requests
   ↓
Body Parser ─ Parse JSON safely
   ↓
Auth Middleware ─ Verify JWT token
   ↓
Input Validation ─ Check data types
   ↓
SQL Injection Prevention ─ Parameterized queries
   ↓
Business Logic
   ↓
Database
```

---

## 📝 Coding Standards

### Naming Conventions
- **Files:** camelCase (userModel.js)
- **Functions:** camelCase (getUserTrips)
- **Classes:** PascalCase (User, Trip)
- **Constants:** UPPER_SNAKE_CASE (JWT_SECRET)
- **HTML IDs:** kebab-case (user-profile)

### Comments
```javascript
// Single line comments for code explanation
/**
 * Multi-line JSDoc comments for functions
 * @param {string} userId - User identifier
 * @returns {Promise<Array>} User trips
 */
```

### Error Handling
```javascript
try {
  const result = await operation();
  res.json({ success: true, data: result });
} catch (err) {
  console.error('Error:', err);
  res.status(500).json({ success: false, message: err.message });
}
```

---

## 🧪 Testing Endpoints

### Using curl (Terminal)
```bash
# GET request
curl http://localhost:5000/api/trips \
  -H "Authorization: Bearer YOUR_TOKEN"

# POST request
curl -X POST http://localhost:5000/api/trips \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"My Trip","startDate":"2024-05-01"}'
```

### Using browser DevTools
```javascript
// In browser console
fetch('/api/trips', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
})
.then(r => r.json())
.then(d => console.log(d))
```

### Using Postman
1. Import endpoints
2. Set Authorization header
3. Test requests
4. View responses

---

## 📈 Scalability Considerations

### Current Limitations
- Single server (not load balanced)
- File storage (images in memory)
- No caching layer (Redis)

### For Production
1. Use database replicas
2. Implement Redis caching
3. Use CDN for static files
4. Load balancing with Nginx
5. Environment-specific configs
6. API rate limiting

---

## 🔄 Common Development Tasks

### Add New Feature
1. Create database table (schema.sql)
2. Create model class (models/)
3. Create routes (routes/)
4. Create HTML page (public/)
5. Add JavaScript functionality
6. Test end-to-end

### Modify API Response
1. Update model method
2. Update route handler
3. Update frontend JavaScript
4. Test in browser
5. Check console errors

### Debug Issue
1. Check browser console (F12)
2. Check server terminal output
3. Check MySQL queries
4. Review model methods
5. Add console.log() statements

---

## 📚 File Size Reference

Typical file sizes:
- HTML files: 5-20 KB
- CSS file: 20-40 KB
- JavaScript (in HTML): 2-10 KB per page
- Images: 100-500 KB (should optimize)
- Model files: 2-5 KB
- Route files: 3-10 KB

---

## 🎓 Further Learning

### Recommended Topics
- Express middleware
- MySQL optimization
- JWT best practices
- Error handling patterns
- API design principles
- Database normalization

### Resources
- Express.js Guide
- MySQL Documentation
- Node.js Best Practices
- Web Security Fundamentals

---

**Traveloop Architecture Overview Complete!**
