// Neuroskin Corp - Main JavaScript

// Video Background Handling
document.addEventListener('DOMContentLoaded', function() {
    const backgroundVideo = document.getElementById('background-video');
    
    if (backgroundVideo) {
        // Set video properties for mobile compatibility
        backgroundVideo.muted = true;
        backgroundVideo.setAttribute('playsinline', '');
        backgroundVideo.setAttribute('webkit-playsinline', '');
        backgroundVideo.setAttribute('autoplay', '');
        backgroundVideo.setAttribute('loop', '');
        backgroundVideo.setAttribute('controls', 'false');
        backgroundVideo.removeAttribute('controls');
        
        // Prevent video controls from showing
        backgroundVideo.controls = false;
        
        // Load and play video
        backgroundVideo.load();
        
        const playVideo = function() {
            const playPromise = backgroundVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                    console.log('Video play error:', error);
                    // Retry on next interaction
                });
            }
        };
        
        // Try to play immediately
        playVideo();
        
        // Try to play when metadata is loaded
        backgroundVideo.addEventListener('loadedmetadata', function() {
            playVideo();
        });
        
        // Try to play when video can play
        backgroundVideo.addEventListener('canplay', function() {
            playVideo();
        });
        
        // Use Intersection Observer to ensure video plays when in viewport
        if ('IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        playVideo();
                    }
                });
            }, { threshold: 0.1 });
            
            videoObserver.observe(backgroundVideo);
        }
        
        // Try to play on any user interaction if autoplay was blocked
        const tryPlayOnInteraction = function() {
            playVideo();
        };
        
        // Add listeners with once:true so they auto-remove after first trigger
        document.addEventListener('click', tryPlayOnInteraction, { once: true, passive: true });
        document.addEventListener('scroll', tryPlayOnInteraction, { once: true, passive: true });
        document.addEventListener('touchstart', tryPlayOnInteraction, { once: true, passive: true });
        document.addEventListener('touchend', tryPlayOnInteraction, { once: true, passive: true });
        document.addEventListener('mousemove', tryPlayOnInteraction, { once: true, passive: true });
        
        // Ensure video loops properly
        backgroundVideo.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        });
        
        // Handle visibility change (when tab becomes active)
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden && backgroundVideo.paused) {
                const playPromise = backgroundVideo.play();
                if (playPromise !== undefined) {
                    playPromise.catch(function(error) {
                        console.log('Video play error on visibility change:', error);
                    });
                }
            }
        });
    }
    
    // Audio Background Handling with Auto-Unmute (Persistent across pages)
    const backgroundMusic = document.getElementById('background-music');
    let audioUnmuted = false;
    let shouldBePlaying = false; // Track if audio should be playing
    
    if (backgroundMusic) {
        // Check if audio was already playing from previous page
        const savedAudioTime = sessionStorage.getItem('audioCurrentTime');
        const savedUnmutedState = sessionStorage.getItem('audioUnmuted') === 'true';
        const savedPlayingState = sessionStorage.getItem('audioPlaying') === 'true';
        
        // Restore unmuted state if it was already unmuted
        if (savedUnmutedState) {
            backgroundMusic.muted = false;
            audioUnmuted = true;
        } else {
            // Ensure audio is muted initially if not already unmuted
            backgroundMusic.muted = true;
        }
        
        // Set shouldBePlaying flag if audio was playing before
        if (savedPlayingState) {
            shouldBePlaying = true;
        }
        
        // Wait for audio to be ready before restoring time position
        const restoreAudioState = function() {
            if (savedAudioTime !== null) {
                const targetTime = parseFloat(savedAudioTime);
                // Only set time if audio duration is loaded and time is valid
                if (backgroundMusic.duration && !isNaN(targetTime) && targetTime < backgroundMusic.duration) {
                    backgroundMusic.currentTime = targetTime;
                }
            }
        };
        
        // Try to start playing audio
        const playAudio = function() {
            if (backgroundMusic.paused) {
                const audioPromise = backgroundMusic.play();
                if (audioPromise !== undefined) {
                    audioPromise.then(function() {
                        shouldBePlaying = true;
                        sessionStorage.setItem('audioPlaying', 'true');
                    }).catch(function(error) {
                        console.log('Audio play error:', error);
                        // Don't set shouldBePlaying if play failed
                    });
                }
            }
        };
        
        // Start playing audio (will continue from saved time if available)
        // Wait for metadata to load if needed
        const initializeAudio = function() {
            restoreAudioState();
            if (shouldBePlaying) {
                // Small delay to ensure page is fully loaded (helps on mobile)
                setTimeout(function() {
                    playAudio();
                }, 100);
            }
        };
        
        if (backgroundMusic.readyState >= 2) {
            // Audio metadata already loaded
            initializeAudio();
        } else {
            // Wait for metadata to load, then restore state and play
            backgroundMusic.addEventListener('loadedmetadata', function() {
                initializeAudio();
            }, { once: true });
            // Also try to initialize immediately if metadata loads quickly
            backgroundMusic.addEventListener('canplay', function() {
                if (shouldBePlaying && backgroundMusic.paused) {
                    initializeAudio();
                }
            }, { once: true });
        }
        
        // Save audio time periodically to sessionStorage
        const saveAudioTime = function() {
            if (backgroundMusic && !backgroundMusic.paused) {
                sessionStorage.setItem('audioCurrentTime', backgroundMusic.currentTime.toString());
                sessionStorage.setItem('audioPlaying', 'true');
            } else {
                sessionStorage.setItem('audioPlaying', 'false');
            }
        };
        
        // Save audio time every second
        setInterval(saveAudioTime, 1000);
        
        // Save audio state on pagehide (more reliable on mobile than beforeunload)
        window.addEventListener('pagehide', function() {
            if (backgroundMusic) {
                sessionStorage.setItem('audioCurrentTime', backgroundMusic.currentTime.toString());
                sessionStorage.setItem('audioUnmuted', audioUnmuted.toString());
                sessionStorage.setItem('audioPlaying', (!backgroundMusic.paused).toString());
            }
        });
        
        // Restore audio state on pageshow (when page becomes visible again on mobile)
        window.addEventListener('pageshow', function(event) {
            // For both persisted (back/forward) and regular navigation, restore audio if it should be playing
            const savedTime = sessionStorage.getItem('audioCurrentTime');
            const wasPlaying = sessionStorage.getItem('audioPlaying') === 'true';
            const wasUnmuted = sessionStorage.getItem('audioUnmuted') === 'true';
            
            if (wasPlaying && savedTime !== null) {
                shouldBePlaying = true;
                const targetTime = parseFloat(savedTime);
                
                // Restore unmuted state if it was unmuted
                if (wasUnmuted) {
                    backgroundMusic.muted = false;
                    audioUnmuted = true;
                }
                
                // Wait for audio to be ready
                const restoreAndPlay = function() {
                    if (backgroundMusic.duration && !isNaN(targetTime) && targetTime < backgroundMusic.duration) {
                        backgroundMusic.currentTime = targetTime;
                    }
                    setTimeout(function() {
                        playAudio();
                    }, 100);
                };
                
                if (backgroundMusic.readyState >= 2) {
                    restoreAndPlay();
                } else {
                    backgroundMusic.addEventListener('loadedmetadata', function() {
                        restoreAndPlay();
                    }, { once: true });
                    backgroundMusic.addEventListener('canplay', function() {
                        if (backgroundMusic.paused) {
                            restoreAndPlay();
                        }
                    }, { once: true });
                }
            }
        });
        
        // Handle visibility change (for mobile browsers)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                // Page is hidden - save state but don't pause (let it continue)
                saveAudioTime();
            } else {
                // Page is visible again - resume if it should be playing
                if (shouldBePlaying && backgroundMusic.paused) {
                    playAudio();
                }
            }
        });
        
        // Function to unmute audio on first user interaction
        const unmuteAudioOnInteraction = function() {
            if (!audioUnmuted && backgroundMusic) {
                try {
                    backgroundMusic.muted = false;
                    audioUnmuted = true;
                    shouldBePlaying = true;
                    
                    // Save unmuted state to sessionStorage
                    sessionStorage.setItem('audioUnmuted', 'true');
                    sessionStorage.setItem('audioPlaying', 'true');
                    
                    // Ensure audio is playing
                    if (backgroundMusic.paused) {
                        playAudio();
                    }
                } catch (error) {
                    console.log('Audio unmute error:', error);
                }
            }
        };
        
        // Only listen for unmute if audio hasn't been unmuted yet
        if (!audioUnmuted) {
            // Listen for first user interaction to unmute audio
            document.addEventListener('click', unmuteAudioOnInteraction, { once: true, passive: true });
            document.addEventListener('touchstart', unmuteAudioOnInteraction, { once: true, passive: true });
            document.addEventListener('scroll', unmuteAudioOnInteraction, { once: true, passive: true });
            document.addEventListener('mousemove', unmuteAudioOnInteraction, { once: true, passive: true });
            document.addEventListener('touchend', unmuteAudioOnInteraction, { once: true, passive: true });
        }
        
        // Handle audio errors
        backgroundMusic.addEventListener('error', function(e) {
            console.log('Audio loading error:', e);
        });
        
        // Ensure audio loops properly
        backgroundMusic.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
            sessionStorage.setItem('audioCurrentTime', '0');
        });
        
        // Update saved time when audio time updates (for seeking)
        backgroundMusic.addEventListener('timeupdate', function() {
            if (!backgroundMusic.paused) {
                sessionStorage.setItem('audioCurrentTime', backgroundMusic.currentTime.toString());
                sessionStorage.setItem('audioPlaying', 'true');
            }
        });
        
        // Track when audio pauses (for mobile browsers that pause on navigation)
        backgroundMusic.addEventListener('pause', function() {
            // Only update if we didn't intentionally pause
            if (shouldBePlaying) {
                // Audio was paused unexpectedly (e.g., by mobile browser)
                // Try to resume after a short delay
                setTimeout(function() {
                    if (shouldBePlaying && backgroundMusic.paused && !document.hidden) {
                        playAudio();
                    }
                }, 100);
            }
        });
        
        // Track when audio starts playing
        backgroundMusic.addEventListener('play', function() {
            shouldBePlaying = true;
            sessionStorage.setItem('audioPlaying', 'true');
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


