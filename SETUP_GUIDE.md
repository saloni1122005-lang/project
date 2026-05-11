# Traveloop - Full Stack Travel Planning Application
## Setup & Installation Guide

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v5.7 or higher) - [Download](https://www.mysql.com/downloads/)
- **Visual Studio Code** - [Download](https://code.visualstudio.com/)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Quick Start Guide

### Step 1: Install Node Dependencies

Open the terminal in VS Code and run:

```bash
npm install
```

This will install all required packages:
- **express** - Web framework
- **mysql2** - MySQL database driver
- **bcrypt** - Password encryption
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **multer** - File upload handling
- **nodemon** - Auto-restart during development

---

### Step 2: Setup MySQL Database

1. **Open MySQL Command Line** or **MySQL Workbench**

2. **Run the Database Schema Script:**
   
   **On Windows (PowerShell):**
   ```powershell
   Get-Content database/schema.sql | mysql -u root -p
   ```
   
   **On Mac/Linux (Terminal):**
   ```bash
   mysql -u root -p < database/schema.sql
   ```
   
   Or manually:
   - Open `database/schema.sql` in MySQL Workbench
   - Execute the entire script
   - This creates the database and all tables

3. **(Optional) Load Sample Data:**
   
   **On Windows (PowerShell):**
   ```powershell
   Get-Content database/sample-data.sql | mysql -u root -p traveloop
   ```
   
   **On Mac/Linux (Terminal):**
   ```bash
   mysql -u root -p traveloop < database/sample-data.sql
   ```
   
   This loads sample cities and activities for testing.

---

### Step 3: Configure Environment Variables

1. **Create `.env` file** in the project root:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file** and set your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=traveloop
   JWT_SECRET=traveloop_secret_key
   PORT=5000
   ```

   Replace `your_mysql_password` with your actual MySQL password.

---

### Step 4: Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

You should see:
```
Traveloop server running on http://localhost:5000
```

---

### Step 5: Access the Application

Open your browser and go to:
```
http://localhost:5000
```

---

## 🎯 First Time Setup

1. **Create an Account:**
   - Click "Sign Up"
   - Enter your name, email, and password
   - Password must be at least 6 characters

2. **Explore the Dashboard:**
   - View your profile
   - See recommended destinations
   - Create your first trip

3. **Create a Trip:**
   - Click "+ Create New Trip"
   - Enter trip details
   - Set start and end dates

4. **Build Itinerary:**
   - Go to My Trips → View Trip
   - Click "Edit Itinerary"
   - Search and add cities

5. **Add Activities & Budget:**
   - Add activities to cities
   - Track expenses in budget tab
   - Create packing checklist

---

## 📁 Project Structure

```
TraveloopApp/
├── server.js                 # Main Express server
├── package.json              # Project dependencies
├── .env.example              # Environment variables template
├── config/
│   └── database.js           # MySQL connection setup
├── middleware/
│   └── auth.js               # JWT authentication
├── models/                   # Database models
│   ├── User.js
│   ├── Trip.js
│   ├── City.js
│   ├── Activity.js
│   ├── Itinerary.js
│   ├── Budget.js
│   ├── Checklist.js
│   ├── Note.js
│   └── Share.js
├── routes/                   # API endpoints
│   ├── auth.js               # Authentication routes
│   ├── trips.js              # Trip CRUD routes
│   ├── itinerary.js          # Itinerary management
│   ├── cities.js             # City search/browse
│   ├── activities.js         # Activity search
│   ├── budget.js             # Budget tracking
│   ├── checklist.js          # Packing checklist
│   ├── notes.js              # Notes/journal
│   ├── profile.js            # User profile
│   └── share.js              # Share functionality
├── public/
│   ├── index.html            # Landing page
│   ├── login.html            # Login page
│   ├── signup.html           # Sign up page
│   ├── dashboard.html        # User dashboard
│   ├── trips.html            # All trips list
│   ├── create-trip.html      # Create trip form
│   ├── trip-view.html        # Trip details and management
│   ├── itinerary-builder.html # Build itinerary
│   ├── cities.html           # Explore cities
│   ├── profile.html          # User profile settings
│   ├── shared-trip.html      # View shared trip
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   ├── js/
│   │   └── [JavaScript files included in HTML]
│   └── images/               # Image assets
└── database/
    ├── schema.sql            # Database schema
    └── sample-data.sql       # Sample data
```

---

## 🔑 API Endpoints Summary

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Trips
- `POST /api/trips` - Create trip
- `GET /api/trips` - Get all user trips
- `GET /api/trips/:id` - Get single trip
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

### Itinerary
- `POST /api/itinerary/add-city/:tripId` - Add city to itinerary
- `GET /api/itinerary/:tripId` - Get trip itinerary
- `DELETE /api/itinerary/:itineraryId` - Remove city

### Budget
- `POST /api/budget/:tripId` - Add expense
- `GET /api/budget/:tripId` - Get expenses
- `GET /api/budget/:tripId/summary` - Get budget summary
- `DELETE /api/budget/:expenseId` - Delete expense

### Checklist
- `POST /api/checklist/:tripId` - Add checklist item
- `GET /api/checklist/:tripId` - Get checklist
- `PATCH /api/checklist/:itemId/toggle` - Toggle item
- `DELETE /api/checklist/:itemId` - Delete item

### Cities & Activities
- `GET /api/cities/search?q=query` - Search cities
- `GET /api/cities/popular` - Get popular cities
- `GET /api/cities/countries` - Get all countries
- `GET /api/activities/search` - Search activities
- `GET /api/activities/city/:cityId` - Get city activities

### Notes
- `POST /api/notes/:tripId` - Create note
- `GET /api/notes/:tripId` - Get trip notes
- `PUT /api/notes/:tripId/:noteId` - Update note
- `DELETE /api/notes/:tripId/:noteId` - Delete note

### Share
- `POST /api/share/:tripId` - Generate share link
- `GET /api/share/:tripId` - Get share links
- `DELETE /api/share/:shareId` - Delete share link
- `GET /api/share/view/:token` - View shared trip

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `DELETE /api/profile` - Delete account

---

## 💡 Key Features

### 1. **Authentication**
- Secure signup and login with bcrypt password hashing
- JWT token-based authentication
- Password validation and error handling

### 2. **Trip Management**
- Create, read, update, delete trips
- Set trip dates and budget limits
- Upload trip cover images

### 3. **Itinerary Builder**
- Add multiple cities to a trip
- Set dates for each city
- Organize cities in sequence
- Add notes per city

### 4. **Activity Management**
- Search and add activities to cities
- Filter activities by category, cost, duration
- Track activity costs

### 5. **Budget Tracking**
- Track expenses by category (transport, stay, food, activities)
- Visualize budget with charts (Chart.js)
- Compare spending vs. budget limit

### 6. **Packing Checklist**
- Add items with categories
- Mark items as completed
- Delete items

### 7. **Travel Journal**
- Add date-based notes
- Edit and delete notes
- Attach notes to specific cities

### 8. **Share Functionality**
- Generate shareable links with unique tokens
- View-only access for shared trips
- Delete share links

### 9. **Profile Management**
- Update user name and profile photo
- View profile information
- Delete account (with all data)

### 10. **City Exploration**
- Browse popular destinations
- Search cities by name or country
- View city details and activities

---

## 🎨 Styling

The application uses:
- **Custom CSS** with CSS variables for theming
- **Bootstrap concepts** for responsive layout
- **Mobile-first design** approach
- **Gradient backgrounds** and smooth animations
- **Chart.js** for budget visualization

---

## 🔒 Security Features

1. **Password Hashing** - Using bcrypt
2. **JWT Authentication** - Token-based auth
3. **SQL Injection Prevention** - Using parameterized queries
4. **CORS Protection** - Cross-origin request handling
5. **Environment Variables** - Sensitive data in .env

---

## 🐛 Troubleshooting

### Issue: MySQL Connection Error
**Solution:**
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists: `CREATE DATABASE traveloop;`

### Issue: Port 5000 Already in Use
**Solution:**
- Change PORT in `.env` file to another port (e.g., 5001)
- Or kill the process: `lsof -ti:5000 | xargs kill`

### Issue: Authentication Not Working
**Solution:**
- Clear browser localStorage: `localStorage.clear()`
- Verify JWT_SECRET in `.env`
- Check browser console for errors

### Issue: File Upload Failing
**Solution:**
- Check file size (max 50MB)
- Verify multer configuration
- Check public/images directory exists

---

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** - Full features and optimized layout
- **Tablet** - Adjusted grid and touch-friendly buttons
- **Mobile** - Single column layout with bottom navigation

---

## 🚀 Deployment Guide

### For Production:

1. **Set environment variables:**
   ```
   NODE_ENV=production
   DB_HOST=your_production_db
   JWT_SECRET=strong_random_secret
   ```

2. **Use process manager:**
   ```bash
   npm install -g pm2
   pm2 start server.js
   ```

3. **Use reverse proxy:**
   - Set up Nginx or Apache
   - Configure SSL/HTTPS

4. **Database backup:**
   ```bash
   mysqldump -u root -p traveloop > backup.sql
   ```

---

## 📚 Technologies Used

**Frontend:**
- HTML5
- CSS3 with CSS Variables
- Vanilla JavaScript
- Chart.js for visualization
- LocalStorage for session management

**Backend:**
- Node.js
- Express.js
- MySQL 2 (Promise-based)
- JWT for authentication
- bcrypt for password hashing

**Tools:**
- Git
- MySQL Workbench/Command Line
- VS Code

---

## 📞 Support & Contributing

For issues, questions, or contributions:
1. Check existing documentation
2. Review error messages in browser console
3. Check server logs
4. Contact development team

---

## 📄 License

Traveloop © 2026. All rights reserved.

---

## 🎉 You're Ready!

You now have a fully functional travel planning application. Start by:
1. Creating an account
2. Adding your first trip
3. Building an itinerary
4. Inviting friends to view your trip

Happy traveling! 🌍✈️🗺️
