// Navigation Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without reloading the page
            history.pushState(null, null, targetId);

            // Explicitly set active state for nav link
            if (typeof setActiveLink === 'function') {
                setActiveLink(targetId.replace('#',''));
            }
        }
    });
});

// Handle initial hash on page load
window.addEventListener('load', () => {
    if (window.location.hash) {
        // Wait a bit for the page to fully render
        setTimeout(() => {
            const hash = window.location.hash;
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Ensure correct nav is highlighted on initial load
                if (typeof setActiveLink === 'function') {
                    setActiveLink(hash.replace('#',''));
                }
            }
        }, 100);
    }
    // If no hash, highlight first section
    else if (typeof setActiveLink === 'function') {
        setActiveLink('home');
    }
});

// Handle hash change when clicking browser back/forward
window.addEventListener('hashchange', () => {
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update active state on hash changes
            if (typeof setActiveLink === 'function') {
                setActiveLink(window.location.hash.replace('#',''));
            }
        }
    }
});

// Active nav highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

function setActiveLink(id) {
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
}

const activeObserver = new IntersectionObserver((entries) => {
    // Pick the entry with the highest intersection ratio to avoid adjacent section flicker
    const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) {
        setActiveLink(visible.target.id);
    }
}, { rootMargin: '0px 0px -10% 0px', threshold: [0.6] });

sections.forEach(sec => activeObserver.observe(sec));

// When a hash is present on load, force-set active to that section id
if (window.location.hash) {
    const id = window.location.hash.replace('#','');
    setActiveLink(id);
}

// Countdown Timer
function updateCountdown() {
    const targetDate = new Date('2025-12-06T17:00:00'); // December 6, 2025, 12:30 PM
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Initialize countdown and update every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Hero Slideshow
let currentSlide = 0;
let slideshowInterval;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function updateSlide() {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
    resetSlideshowInterval();
}

function resetSlideshowInterval() {
    clearInterval(slideshowInterval);
    slideshowInterval = setInterval(nextSlide, 5000);
}

if (slides.length > 0) {
    const slideshow = document.querySelector('.hero-slideshow');
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (slideshow) {
        slideshow.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slideshow.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
                resetSlideshowInterval();
            } else {
                // Swipe right - previous slide
                prevSlide();
                resetSlideshowInterval();
            }
        }
    }
    
    // Auto-advance slideshow
    resetSlideshowInterval();
}

// Back-to-top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.5) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Save to Calendar (ICS) generator
const saveToCal = document.getElementById('saveToCalendar');
if (saveToCal) {
    saveToCal.addEventListener('click', (e) => {
        e.preventDefault();
        const title = saveToCal.dataset.title || 'Event';
        const start = new Date(saveToCal.dataset.start);
        const end = new Date(saveToCal.dataset.end);
        const loc = saveToCal.dataset.location || '';
        const desc = saveToCal.dataset.description || '';

        function toICSDate(d) {
            const pad = (n) => String(n).padStart(2, '0');
            return (
                d.getUTCFullYear() +
                pad(d.getUTCMonth() + 1) +
                pad(d.getUTCDate()) + 'T' +
                pad(d.getUTCHours()) +
                pad(d.getUTCMinutes()) +
                pad(d.getUTCSeconds()) + 'Z'
            );
        }

        const ics = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//rolandandshielou//wedding//EN',
            'BEGIN:VEVENT',
            `SUMMARY:${title}`,
            `DTSTART:${toICSDate(start)}`,
            `DTEND:${toICSDate(end)}`,
            `LOCATION:${loc}`,
            `DESCRIPTION:${desc}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'roland-shielou-wedding.ics';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });
}

// Add to Google Calendar
const addGoogle = document.getElementById('addGoogleCalendar');
if (addGoogle) {
    addGoogle.addEventListener('click', (e) => {
        e.preventDefault();
        const title = encodeURIComponent(addGoogle.dataset.title || 'Event');
        const start = new Date(addGoogle.dataset.start);
        const end = new Date(addGoogle.dataset.end);
        const loc = encodeURIComponent(addGoogle.dataset.location || '');
        const desc = encodeURIComponent(addGoogle.dataset.description || '');

        const pad = (n) => String(n).padStart(2, '0');
        const toGCal = (d) => (
            d.getUTCFullYear() +
            pad(d.getUTCMonth() + 1) +
            pad(d.getUTCDate()) + 'T' +
            pad(d.getUTCHours()) +
            pad(d.getUTCMinutes()) +
            pad(d.getUTCSeconds()) + 'Z'
        );

        const dates = `${toGCal(start)}/${toGCal(end)}`;
        const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${desc}&location=${loc}&sf=true&output=xml`;
        window.open(url, '_blank', 'noopener');
    });
}

// Add fade-in animation on scroll (respect reduced motion)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

let observer;
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
}

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    if (observer) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    }
});
