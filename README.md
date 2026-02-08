# Spotify Clone Web Application

A fully functional Spotify clone built with vanilla JavaScript frontend and Node.js + Express backend featuring login authentication, music dashboard, and HTML5 audio player.

## Features

✅ **Login Page**
- Spotify-style dark UI
- Email & password authentication
- Dummy authentication with hardcoded credentials
- Error message display
- Redirect to dashboard on success

✅ **Dashboard**
- Spotify-inspired layout with sidebar
- Navigation (Home, Search, Library)
- Song list display with metadata
- Active song highlighting
- Welcome message with user info

✅ **Music Player**
- Play / Pause / Resume controls
- Previous / Next song navigation
- Current song display (title & artist)
- Seek bar with time tracking
- Current time and duration display
- Auto-play next song on completion
- HTML5 Audio API

✅ **Backend API**
- Node.js + Express server
- `/api/login` - User authentication
- `/api/songs` - Fetch song list
- CORS enabled for frontend communication

## Project Structure

```
spotify/
├── backend/
│   ├── server.js      (Express server setup & routes)
│   └── data.js        (Hardcoded users & songs data)
├── frontend/
│   ├── index.html     (Login page)
│   ├── dashboard.html (Main dashboard)
│   ├── style.css      (Spotify-style styling)
│   └── script.js      (Frontend logic - login, player, dashboard)
├── package.json       (Dependencies)
└── README.md          (This file)
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Steps

1. **Navigate to the project directory**
   ```bash
   cd spotify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5000`

## Demo Credentials

Use these credentials to test login:

- **Email:** user@spotify.com
- **Password:** password123

Or:

- **Email:** jane@spotify.com
- **Password:** password456

## How to Use

### Login
1. Enter email and password
2. Click "Log In"
3. On success, redirected to dashboard
4. On error, message displays below form

### Dashboard
1. View all songs in the main area
2. Click any song to play it
3. Use sidebar to navigate sections
4. View current user info in top right

### Music Player
- **▶ Button:** Play/Pause the current song
- **⏮ Button:** Go to previous song
- **⏭ Button:** Go to next song
- **Seek Bar:** Click to jump to a position in the song
- **Time Display:** Shows current time / total duration

## Available Songs

The application includes 6 sample songs from SoundHelix for testing:
- Summer Vibes - The Melody Makers
- Midnight Dreams - Luna Echo
- Electric Avenue - Neon Lights
- Rainy Day Blues - The Groove Collective
- Sunset Serenade - Acoustic Sunrise
- Urban Journey - City Beats

## Technology Stack

**Frontend:**
- HTML5 (semantic markup, no inline scripts)
- CSS3 (flexbox, gradients, transitions)
- Vanilla JavaScript (no frameworks)
- HTML5 Audio API

**Backend:**
- Node.js runtime
- Express.js framework
- CORS middleware
- In-memory data storage

## Features Implemented

- ✅ Login authentication (dummy users)
- ✅ Session management (localStorage)
- ✅ Responsive dashboard
- ✅ Music player with full controls
- ✅ Song seeking/scrubbing
- ✅ Current time tracking
- ✅ Sidebar navigation
- ✅ Clean, interview-ready code
- ✅ No syntax errors
- ✅ Responsive design for mobile

## Notes

- This is a demo application with dummy authentication (no real security)
- Audio files are streamed from SoundHelix public samples
- All data is in-memory and resets on server restart
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)

## Possible Enhancements

- Add a real database (MongoDB, PostgreSQL)
- Implement JWT authentication
- Add user registration
- Implement playlist creation
- Add search functionality
- Implement volume control
- Add shuffle and repeat modes
- Store user preferences locally

## Author

Created as a learning project for entry-level web developers.

---

**Enjoy the Spotify Clone! 🎵**
