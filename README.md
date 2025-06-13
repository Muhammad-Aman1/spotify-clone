# 🎵 Music Player by Aman

A sleek, responsive, and dynamic web-based music player that fetches songs directly from folders and plays them with playlist support, progress controls, volume management, and interactive UI elements.

---

## 📂 Project Structure

```
/
├── index.html
├── style.css
├── script.js          # The main JS file
├── /songs/
│   ├── playlist1/
│   │   ├── song1.mp3
│   │   ├── song2.mp3
│   │   └── info.json   # Playlist metadata
│   └── playlist2/
├── /img/              # Icons (play, pause, volume, etc.)
```

---

## 🚀 Features

- 🎶 Fetch and play `.mp3` songs dynamically from folders  
- 🧠 Auto-detects and lists playlists from `/songs/` directory  
- 📃 Reads playlist metadata from `info.json`  
- ⏯️ Play/pause control with visual feedback  
- ⏮️⏭️ Next/previous song functionality  
- 📀 Dynamic playlist loading by clicking cover/title/button  
- 🔊 Volume control with mute/unmute toggle  
- 🕒 Progress bar with clickable seeking  
- 📱 Responsive menu (hamburger menu for mobile)  

---

## 🛠️ How It Works

- Fetches playlists from the `/songs/` directory using `fetch()` and DOM parsing  
- Loads `.mp3` file links dynamically and updates the `<audio>` source  
- Playlist info (`info.json`) contains the playlist's description  
- Visual elements update based on the current song (progress bar, name, time)  

---

## 📦 Example Playlist Folder

Each playlist must have this structure:

```
/songs/MyPlaylist/
├── song1.mp3
├── song2.mp3
├── cover.jpeg
└── info.json
```

**info.json**
```json
{
  "description": "A chill collection of soft tracks for relaxing."
}
```

---

## 🖼️ UI Highlights

- 🎵 **Dynamic Playlist Cards**  
  Each playlist is displayed with a cover image, title, description, and a play button.

- 🧠 **Animated Song Title Ticker**  
  The current song's name animates like a marquee when it starts playing.

- 📱 **Responsive Sidebar**  
  Hamburger menu opens the playlist sidebar on smaller screens.

- 🟰 **Stylized Controls**  
  Custom play/pause, next/prev, and volume buttons with SVG icons.

- 🕒 **Progress Bar with Ball**  
  A draggable ball shows and controls current song progress.

- 🔊 **Live Volume Indicator**  
  Displays current volume as a percentage, fading after 1.5 seconds.

- ✨ **Smooth Transitions**  
  Close/open animations for the sidebar, visual feedback for interactions.

---

## 👨‍💻 Author

**Aman**  
Project by Aman for learning, fun, and practice in frontend + JS DOM manipulation.

---

## 📄 License

MIT License
