// Neuroskin Corp - Main JavaScript

// Video Background Handling
document.addEventListener('DOMContentLoaded', function() {
    const backgroundVideo = document.getElementById('background-video');
    
    if (backgroundVideo) {
        // Set video properties
        backgroundVideo.muted = true;
        backgroundVideo.setAttribute('playsinline', '');
        backgroundVideo.setAttribute('autoplay', '');
        backgroundVideo.setAttribute('loop', '');
        
        // Load and play video
        backgroundVideo.load();
        
        const playVideo = function() {
            const playPromise = backgroundVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                    console.log('Video play error:', error);
                });
            }
        };
        
        // Try to play immediately
        playVideo();
        
        // If autoplay fails, try again after user interaction
        backgroundVideo.addEventListener('loadedmetadata', function() {
            playVideo();
        });
        
        // Try to play on any user interaction if autoplay was blocked
        const tryPlayOnInteraction = function() {
            playVideo();
            document.removeEventListener('click', tryPlayOnInteraction);
            document.removeEventListener('scroll', tryPlayOnInteraction);
            document.removeEventListener('touchstart', tryPlayOnInteraction);
            document.removeEventListener('mousemove', tryPlayOnInteraction);
        };
        
        document.addEventListener('click', tryPlayOnInteraction);
        document.addEventListener('scroll', tryPlayOnInteraction);
        document.addEventListener('touchstart', tryPlayOnInteraction);
        document.addEventListener('mousemove', tryPlayOnInteraction);
        
        // Ensure video loops properly
        backgroundVideo.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        });
    }
    
    // Form Handling for Human Harvesting Program
    const harvestingForm = document.getElementById('harvesting-form');
    const thankYouOverlay = document.getElementById('thank-you-overlay');
    
    if (harvestingForm) {
        harvestingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(harvestingForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const contact = formData.get('contact');
            
            // Basic validation
            if (!name || !email || !contact) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show thank you overlay
            if (thankYouOverlay) {
                thankYouOverlay.classList.add('active');
                
                // Auto-redirect to homepage after 5 seconds
                setTimeout(function() {
                    window.location.href = 'index.html';
                }, 5000);
            }
        });
    }
    
    // Close overlay if clicked outside (optional)
    if (thankYouOverlay) {
        thankYouOverlay.addEventListener('click', function(e) {
            if (e.target === thankYouOverlay) {
                window.location.href = 'index.html';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});


