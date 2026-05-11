# Traveloop - Quick Reference Guide

## 🎯 Running the Application

### In VS Code Terminal:

1. **Open Terminal:**
   - Press `Ctrl + `` (Backtick)

2. **Install Dependencies (First Time Only):**
   ```bash
   npm install
   ```

3. **Setup Database (First Time Only):**
   
   **Windows (PowerShell):**
   ```powershell
   Get-Content database/schema.sql | mysql -u root -p
   # Enter your password when prompted
   # Then run:
   Get-Content database/sample-data.sql | mysql -u root -p traveloop
   ```
   
   **Mac/Linux (Bash):**
   ```bash
   mysql -u root -p < database/schema.sql
   mysql -u root -p traveloop < database/sample-data.sql
   ```

4. **Create .env File:**
   ```bash
   cp .env.example .env
   # Edit .env with your MySQL credentials
   ```

5. **Start Development Server:**
   ```bash
   npm run dev
   ```
   
   **Output:** `Traveloop server running on http://localhost:5000`

6. **Open in Browser:**
   - Go to: `http://localhost:5000`

---

## 🔑 Test Account

Use these credentials after loading sample data:

- **Email:** user@example.com
- **Password:** password123

(Or create your own account via Sign Up)

---

## 📝 Common Tasks

### Check if MySQL is Running
```bash
# Windows
tasklist | find /i "mysqld"

# Mac/Linux
ps aux | grep mysql
```

### Restart MySQL
```bash
# Windows
net stop MySQL80
net start MySQL80

# Mac
brew services stop mysql
brew services start mysql
```

### View Database
```bash
mysql -u root -p traveloop
SHOW TABLES;
SELECT COUNT(*) FROM users;
exit
```

### Backup Database
```bash
mysqldump -u root -p traveloop > backup.sql
```

### Restore Database
```bash
mysql -u root -p traveloop < backup.sql
```

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| **Port 5000 in use** | Change PORT in .env or kill process |
| **MySQL not connecting** | Verify credentials in .env, ensure MySQL running |
| **Dependencies missing** | Run `npm install` |
| **Cannot login** | Check browser console, clear localStorage |
| **Database not found** | Run schema.sql: `source database/schema.sql;` |
| **No sample data** | Run: `source database/sample-data.sql;` |
| **Images not uploading** | Check public folder permissions |

---

## 📂 Key Files to Know

| File | Purpose |
|------|---------|
| `server.js` | Main Express server |
| `.env` | Environment variables (DB config) |
| `config/database.js` | MySQL connection |
| `models/*.js` | Database models |
| `routes/*.js` | API endpoints |
| `public/*.html` | Frontend pages |
| `public/css/style.css` | Styling |
| `database/schema.sql` | Database structure |

---

## 🌐 Application URLs

| Page | URL |
|------|-----|
| Home | `http://localhost:5000/` |
| Login | `http://localhost:5000/login` |
| Signup | `http://localhost:5000/signup` |
| Dashboard | `http://localhost:5000/dashboard` |
| My Trips | `http://localhost:5000/trips` |
| Create Trip | `http://localhost:5000/create-trip` |
| Cities | `http://localhost:5000/cities` |
| Profile | `http://localhost:5000/profile` |

---

## 🧪 Testing Features

### Test Creating a Trip:
1. Login to dashboard
2. Click "Create New Trip"
3. Fill in trip details
4. Submit

### Test Itinerary:
1. Go to My Trips
2. Select a trip → View Trip
3. Click "Edit Itinerary"
4. Search for "Paris"
5. Add it with dates

### Test Budget:
1. In Trip View → Budget tab
2. Add expense with category
3. View chart

### Test Sharing:
1. In Trip View → Share tab
2. Click "Generate Share Link"
3. Copy link and open in new tab
4. View should be read-only

---

## 🎨 Customization

### Change Colors in `public/css/style.css`:

```css
:root {
  --primary: #ff6b6b;           /* Change this for main color */
  --secondary: #4ecdc4;         /* Change this for accent color */
  /* ... other colors ... */
}
```

### Change Server Port:

Edit `.env`:
```
PORT=3000  # Instead of 5000
```

### Change Database Name:

Edit `.env`:
```
DB_NAME=my_travel_app  # Instead of traveloop
```

---

## 📊 Database Tables

- **users** - User profiles
- **trips** - Trip records
- **cities** - Destination data (100+ pre-loaded)
- **itinerary** - Trip→City mappings
- **activities** - Things to do (400+ pre-loaded)
- **trip_activities** - Added activities
- **budget** - Expense tracking
- **packing_checklist** - Packing items
- **notes** - Travel journal
- **share_links** - Shared trip links

---

## 🚀 Performance Tips

1. **Database:** Indexes on frequently queried columns
2. **Frontend:** Minimize image sizes, lazy load images
3. **Backend:** Use connection pooling (mysql2/promise)
4. **Caching:** Use localStorage for session data

---

## 🔒 Security Reminders

- ⚠️ Never commit `.env` file
- ⚠️ Change JWT_SECRET in production
- ⚠️ Use HTTPS in production
- ⚠️ Validate all inputs
- ⚠️ Don't expose error details to users

---

## 📞 Useful Commands

```bash
# Start with nodemon (auto-reload)
npm run dev

# Start production server
npm start

# Check npm version
npm -v

# Update packages
npm update

# List installed packages
npm list

# Clear npm cache
npm cache clean --force
```

---

## 🎓 Learning Resources

- **Express.js:** expressjs.com
- **MySQL:** dev.mysql.com/doc
- **JavaScript:** developer.mozilla.org/js
- **Bootstrap CSS:** getbootstrap.com
- **REST API:** restfulapi.net

---

## 📱 Browser DevTools

Press `F12` or `Ctrl+Shift+I` to open:
- **Console** - See logs and errors
- **Network** - Monitor API calls
- **Storage** - View localStorage (auth tokens)
- **Sources** - Debug JavaScript

---

## 🎯 Next Steps

1. ✅ Complete setup from SETUP_GUIDE.md
2. ✅ Test all features
3. ✅ Create sample trips
4. ✅ Customize colors and styling
5. ✅ Deploy to production (optional)

---

**Traveloop Development Ready! Happy Coding! 🌍✈️**
