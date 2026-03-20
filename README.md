# Pinterest Clone

A pixel-perfect Pinterest clone built with Next.js 14, React, and Tailwind CSS.

## Features

- **Masonry Grid Layout** - Pinterest-style responsive grid with varying heights
- **Infinite Scroll** - Automatic loading of more pins as you scroll
- **Video on Hover** - Videos autoplay when hovering over pins
- **Pin Overlay** - Save button and action menu on hover
- **Profile Page** - User profile with tabs (Created/Saved)
- **Responsive Sidebar** - Navigation sidebar with active state
- **Search Bar** - Centered search in the navbar

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
/app
  /(auth)           # Auth routes group
  /(main)           # Main app routes
    /home           # Home feed page
    /profile        # User profile page
/components
  /navbar           # Top navigation
  /layout           # Sidebar, layout components
  /pins             # Pin card and grid components
  /profile          # Profile page components
/lib
  /data             # Mock data for pins
```

## Key Components

### PinCard
- Displays images with optional video
- Hover overlay with Save button
- Three-dot menu with options
- Dynamic height for masonry effect

### PinGrid
- CSS columns masonry layout
- Infinite scroll on page bottom
- Responsive column count (2-6 columns)

### Navbar
- Pinterest logo
- Home/Explore/Create tabs
- Search bar (centered)
- Notifications, messages, profile

### Sidebar
- Fixed left navigation
- Icons with labels
- Active state highlighting

### ProfileHeader
- Large circular avatar
- Username and handle
- Follower/following counts
- Share and Edit profile buttons

### ProfileTabs
- Created/Saved tabs
- Board selector dropdown
- Sticky header behavior
