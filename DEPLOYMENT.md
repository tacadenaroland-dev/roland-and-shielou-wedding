# Deployment Plan for GitHub Pages

## Current Status
✅ Git repository initialized in `output/` directory  
✅ All files are organized (HTML, CSS, JS, assets)  
✅ Images moved to `assets/images/`  
✅ Font in `assets/fonts/`  

## Deployment Steps

### Step 1: Commit All Files
```bash
cd /Users/rolandtacadena/Projects/wedding/output
git add .
git commit -m "Initial commit: Wedding website"
```

### Step 2: Create GitHub Repository
1. Go to GitHub.com and create a new repository
2. Name it: `roland-and-shielou-wedding` (or your preferred name)
3. Don't initialize with README (we already have one)
4. Make it **Public** (required for free GitHub Pages)

### Step 3: Connect and Push to GitHub
```bash
# Add the GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/roland-and-shielou-wedding.git

# Push to GitHub
git push -u origin main
```

*(Replace YOUR_USERNAME with your GitHub username)*

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

### Step 5: Access Your Website
Your website will be live at:
```
https://YOUR_USERNAME.github.io/roland-and-shielou-wedding/
```

## File Structure
```
output/
├── index.html          # Main HTML file
├── style.css           # All styles
├── script.js           # JavaScript functionality
├── favicon.svg         # Site icon
├── README.md           # Documentation
├── assets/
│   ├── fonts/
│   │   └── Adora-Bouton.otf
│   └── images/
│       ├── NPF00357.jpg
│       ├── NPF00358.jpg
│       ├── NPF00361.jpg
│       └── asset_green_paint.png
└── .gitignore
```

## Quick Commands Summary
```bash
# In the output directory
git add .
git commit -m "Deploy wedding website to GitHub Pages"
git remote add origin https://github.com/YOUR_USERNAME/repo-name.git
git branch -M main
git push -u origin main
```

## After Deployment
- Website will be live in 1-2 minutes
- Any future updates: just commit and push
- GitHub will automatically deploy changes
- Share the URL with your guests!

