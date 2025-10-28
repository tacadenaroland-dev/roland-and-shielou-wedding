# Roland & Shielou's Wedding Website

A beautiful, responsive wedding website built with HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Fully mobile-friendly and works on all devices
- **Countdown Timer**: Live countdown to the wedding date (December 6, 2025)
- **Smooth Scrolling**: Elegant navigation between sections
- **Animated Sections**: Fade-in animations on scroll
- **Slideshow Hero**: Dynamic hero section with rotating backgrounds
- **Beautiful Typography**: 
  - "Our Wedding" uses Playfair Display (similar to Adora Bouton)
  - Body text uses Libre Baskerville

## Sections

1. **Home**: Hero section with countdown timer
2. **Schedule**: Wedding timeline
3. **Travel**: Travel and accommodation information
4. **Registry**: Gift registry information
5. **Wedding Party**: Wedding party members
6. **Gallery**: Photo gallery
7. **Things To Do**: Local activities and recommendations
8. **FAQs**: Frequently asked questions

## Deployment to GitHub Pages

### Method 1: Using GitHub Web Interface

1. Create a new repository on GitHub (e.g., `wedding-website`)
2. Upload all files from the `output` folder to your repository
3. Go to your repository Settings → Pages
4. Under "Source", select the main branch and root folder
5. Click Save
6. Your site will be available at `https://yourusername.github.io/wedding-website/`

### Method 2: Using Git Command Line

```bash
# Navigate to the output folder
cd output

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Wedding website"

# Add remote repository (replace with your repository URL)
git remote add origin https://github.com/yourusername/wedding-website.git

# Push to GitHub
git push -u origin main
```

Then follow steps 3-6 from Method 1 to enable GitHub Pages.

## Customization

### Update Wedding Date

Edit the date in `script.js`:
```javascript
const targetDate = new Date('2025-12-06T17:00:00'); // Change this date
```

### Update Content

Edit `index.html` to update any text, dates, locations, or sections.

### Change Colors

Edit the color values in `style.css`:
- Hero gradient: Adjust in `.slide` class
- Text colors: Update `color` properties throughout

### Add Images

1. Create an `images` folder in the `output` directory
2. Add your images to this folder
3. Update the HTML to reference your images
4. Optionally, replace the hero slideshow backgrounds with actual images

## Files Structure

```
output/
├── index.html      # Main HTML file
├── style.css       # All styles
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contact

For any questions or customization needs, please reach out.

---

Built with ❤️ for Roland & Shielou's special day
