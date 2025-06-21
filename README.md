# متابعة جدول الجمعية (Gam3eya Tracker)

![License](https://img.shields.io/badge/license-MIT-blue.svg)

An interactive web application for tracking and managing a Gam3eya (جمعية) rotation schedule with visual progress tracking.

## What is a Gam3eya?

A Gam3eya (جمعية) is a traditional community savings system popular in Arab countries, where a group of people contribute a fixed amount of money periodically (often weekly or monthly), and each period one member collects the total sum. This application helps track a 31-member weekly rotation Gam3eya.

## Features

- 📅 Track 31 weekly payments over a complete rotation cycle
- 📊 Visual chart showing progress (completed vs. remaining payments)
- ✅ Interactive checkbox system to mark payments as completed
- 💾 Persistent local storage to save payment status
- 📱 Responsive design that works on mobile and desktop
- 🌙 Clean UI with Arabic RTL support

## Screenshots

(Add screenshots here when available)

## Technology Stack

- HTML5
- CSS3 with custom variables
- Vanilla JavaScript
- Chart.js for data visualization
- Google Fonts (Tajawal)
- Local Storage API for data persistence

## Usage

1. Open `gam3eya.html` in any modern web browser
2. View the current rotation schedule and progress
3. Check/uncheck boxes to mark payments as completed
4. Progress is automatically saved in your browser's local storage
5. The chart updates in real-time as you mark payments

## Installation

No installation required! Simply clone or download this repository:

```bash
git clone https://github.com/yourusername/gam3eya-tracker.git
```

Then open `gam3eya.html` in your web browser.

## Customization

To modify the schedule or rotation dates:

1. Edit the `scheduleData` array in `script.js`
2. Update the header and summary information in `gam3eya.html`

To change the styling and colors:

1. Modify the CSS variables in the `:root` selector in `styles.css`

## License

MIT License

## Author

Your Name

---

Made with ❤️ for better financial management
