# Traveloop - Travel Planning Web Application

A full-stack travel planning application built with Node.js, Express, and MySQL. Plan your trips, manage itineraries, track budgets, and share adventures with friends!

## ✨ Features

### Core Features
- ✅ **User Authentication** - Secure signup/login with JWT
- ✅ **Trip Management** - Create, edit, and delete trips
- ✅ **Itinerary Builder** - Add cities, set dates, organize stops
- ✅ **Activity Management** - Search and add activities to cities
- ✅ **Budget Tracking** - Track expenses with visual charts
- ✅ **Packing Checklist** - Organized packing list with categories
- ✅ **Travel Journal** - Add notes and memories per day
- ✅ **City Exploration** - Browse popular destinations worldwide
- ✅ **Share Trips** - Generate shareable links for friends
- ✅ **Profile Management** - Update profile and settings

### Technical Highlights
- 🎨 **Responsive Design** - Works on desktop, tablet, and mobile
- 📊 **Data Visualization** - Budget breakdown using Chart.js
- 🔒 **Secure** - Password hashing, JWT authentication
- ⚡ **Fast** - Optimized database queries with indexing
- 🎯 **RESTful API** - Well-structured API endpoints
- 📱 **Mobile-Friendly** - Touch-optimized interface

## 📋 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Authentication** | JWT, bcrypt |
| **Visualization** | Chart.js |
| **Dev Tools** | Nodemon, npm |

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MySQL 5.7+
- VS Code (optional)

### Installation

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Setup Database:**
   ```bash
   mysql -u root -p < database/schema.sql
   mysql -u root -p traveloop < database/sample-data.sql
   ```

3. **Configure Environment:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials

4. **Start Server:**
   ```bash
   npm run dev
   ```

5. **Open Browser:**
   ```
   http://localhost:5000
   ```

## 📁 Project Structure

```
TraveloopApp/
├── server.js                  # Express server
├── config/                    # Database configuration
├── models/                    # Database models
├── routes/                    # API routes
├── middleware/                # Auth middleware
├── public/                    # Frontend files
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── trips.html
│   ├── create-trip.html
│   ├── trip-view.html
│   ├── itinerary-builder.html
│   ├── cities.html
│   ├── profile.html
│   ├── shared-trip.html
│   ├── css/style.css
│   └── images/
└── database/
    ├── schema.sql
    └── sample-data.sql
```

## 🎯 Main Pages

- **Home** - Landing page with features overview
- **Login/Signup** - User authentication
- **Dashboard** - User home with stats and recent trips
- **My Trips** - View all user trips
- **Create Trip** - Form to create new trip
- **Trip View** - Trip details with multiple tabs
- **Itinerary Builder** - Add cities and activities
- **Explore Cities** - Browse destinations
- **Profile** - User settings and account management
- **Shared Trip** - Public view of shared trip

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Trips
- `POST /api/trips` - Create
- `GET /api/trips` - List all
- `GET /api/trips/:id` - Get single
- `PUT /api/trips/:id` - Update
- `DELETE /api/trips/:id` - Delete

### Itinerary
- `POST /api/itinerary/add-city/:tripId` - Add city
- `GET /api/itinerary/:tripId` - Get itinerary
- `DELETE /api/itinerary/:itineraryId` - Remove city

### Budget
- `POST /api/budget/:tripId` - Add expense
- `GET /api/budget/:tripId` - Get expenses
- `GET /api/budget/:tripId/summary` - Get summary

### More...
- Checklist CRUD
- Notes CRUD
- Cities search
- Activities search
- Profile management
- Share links

## 🎨 Design Features

- **Color Scheme** - Modern gradient colors (primary: #ff6b6b, secondary: #4ecdc4)
- **Components** - Cards, buttons, forms, modals, alerts
- **Animations** - Smooth transitions and hover effects
- **Responsive Grid** - Auto-fit layout
- **Mobile Menu** - Hamburger navigation
- **Dark/Light Support** - CSS variables for theming

## 🔒 Security

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Protected API routes with middleware
- ✅ SQL injection prevention
- ✅ CORS protection
- ✅ Input validation

## 📊 Database Schema

- **users** - User accounts
- **trips** - Trip records
- **cities** - Destination database
- **itinerary** - Trip cities with dates
- **activities** - Things to do per city
- **trip_activities** - Activities added to trips
- **budget** - Expense tracking
- **packing_checklist** - Packing items
- **notes** - Travel journal entries
- **share_links** - Shareable trip links

## 🚀 Usage Examples

### Create Account
1. Click "Sign Up"
2. Enter name, email, password
3. Dashboard appears

### Plan a Trip
1. Click "Create New Trip"
2. Enter trip name, dates
3. Set budget limit
4. View in My Trips

### Add Itinerary
1. Go to Trip → Edit Itinerary
2. Search and add cities
3. Set dates for each city
4. Add activities

### Track Budget
1. Open Trip → Budget tab
2. Add expenses by category
3. View chart visualization
4. Compare vs budget limit

### Share Trip
1. Open Trip → Share tab
2. Generate share link
3. Copy and send link
4. Friends view trip read-only

## 💡 Tips & Tricks

- Use sample data to test features
- Clear localStorage if auth issues occur
- Check browser console for debugging
- Upload high-quality trip images
- Regularly backup your database
- Use strong JWT secret in production

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MySQL error | Check credentials in .env |
| Port in use | Change PORT in .env |
| Auth not working | Clear localStorage |
| Activities not showing | Ensure city has activities in DB |
| Images not uploading | Check file size limit |

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express Guide](https://expressjs.com/)
- [MySQL Reference](https://dev.mysql.com/doc/)
- [Chart.js Docs](https://www.chartjs.org/)

## 📝 Notes

- This is a development version with sample data
- For production: use environment variables, SSL/HTTPS, proper hosting
- Database backups recommended
- Regular updates and security patches needed

## 🎉 Getting Started

1. Follow SETUP_GUIDE.md for detailed installation
2. Create a test account
3. Create your first trip
4. Explore all features
5. Share with friends!

---

**Traveloop** - Plan • Explore • Share 🌍✈️🗺️
