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
    
    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
    
    // IndexedDB for more reliable state persistence (especially on mobile)
    const DB_NAME = 'neuroskin_audio_db';
    const DB_VERSION = 1;
    const STORE_NAME = 'audio_state';
    let db = null;
    
    // Initialize IndexedDB
    const initDB = function() {
        return new Promise(function(resolve, reject) {
            if (!window.indexedDB) {
                // Fallback to sessionStorage if IndexedDB not available
                resolve(null);
                return;
            }
            
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            
            request.onerror = function() {
                console.log('IndexedDB error, falling back to sessionStorage');
                resolve(null);
            };
            
            request.onsuccess = function() {
                db = request.result;
                resolve(db);
            };
            
            request.onupgradeneeded = function(event) {
                db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };
        });
    };
    
    // Save audio state to IndexedDB or sessionStorage
    const saveAudioState = function() {
        const state = {
            currentTime: backgroundMusic.currentTime,
            unmuted: audioUnmuted,
            playing: !backgroundMusic.paused
        };
        
        if (db) {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            store.put(state, 'audio');
        } else {
            // Fallback to sessionStorage
            sessionStorage.setItem('audioCurrentTime', state.currentTime.toString());
            sessionStorage.setItem('audioUnmuted', state.unmuted.toString());
            sessionStorage.setItem('audioPlaying', state.playing.toString());
        }
    };
    
    // Load audio state from IndexedDB or sessionStorage
    const loadAudioState = function(callback) {
        if (db) {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get('audio');
            
            request.onsuccess = function() {
                const state = request.result;
                if (state) {
                    callback(state);
                } else {
                    // Fallback to sessionStorage
                    callback({
                        currentTime: sessionStorage.getItem('audioCurrentTime'),
                        unmuted: sessionStorage.getItem('audioUnmuted') === 'true',
                        playing: sessionStorage.getItem('audioPlaying') === 'true'
                    });
                }
            };
            
            request.onerror = function() {
                // Fallback to sessionStorage
                callback({
                    currentTime: sessionStorage.getItem('audioCurrentTime'),
                    unmuted: sessionStorage.getItem('audioUnmuted') === 'true',
                    playing: sessionStorage.getItem('audioPlaying') === 'true'
                });
            };
        } else {
            // Use sessionStorage
            callback({
                currentTime: sessionStorage.getItem('audioCurrentTime'),
                unmuted: sessionStorage.getItem('audioUnmuted') === 'true',
                playing: sessionStorage.getItem('audioPlaying') === 'true'
            });
        }
    };
    
    if (backgroundMusic) {
        // Initialize IndexedDB first
        initDB().then(function() {
            // Load saved state
            loadAudioState(function(savedState) {
                const savedAudioTime = savedState.currentTime;
                const savedUnmutedState = savedState.unmuted;
                const savedPlayingState = savedState.playing;
        
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
                                saveAudioState();
                            }).catch(function(error) {
                                console.log('Audio play error:', error);
                                // Don't set shouldBePlaying if play failed
                            });
                        }
                    }
                };
                
                // Mobile fallback: restart audio from beginning on each page
                if (isMobile && !savedPlayingState) {
                    // On mobile, if audio wasn't playing before, start fresh
                    shouldBePlaying = false;
                    savedAudioTime = null;
                }
                
                // Start playing audio (will continue from saved time if available)
                // Wait for metadata to load if needed
                const initializeAudio = function() {
                    if (!isMobile || savedPlayingState) {
                        // PC or mobile with saved state - restore position
                        restoreAudioState();
                    } else {
                        // Mobile without saved state - start from beginning
                        backgroundMusic.currentTime = 0;
                    }
                    
                    // On mobile, always try to start playing muted audio (even if shouldBePlaying is false)
                    // This ensures audio is ready when user interacts
                    if (shouldBePlaying || (!isMobile && savedPlayingState) || (isMobile && !savedPlayingState)) {
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
                        if ((shouldBePlaying || (!isMobile && savedPlayingState)) && backgroundMusic.paused) {
                            initializeAudio();
                        }
                    }, { once: true });
                }
                
                // Save audio state periodically (more aggressive on mobile)
                const saveInterval = isMobile ? 500 : 1000; // Save every 500ms on mobile, 1s on PC
                setInterval(function() {
                    if (backgroundMusic && !backgroundMusic.paused) {
                        saveAudioState();
                    }
                }, saveInterval);
                
                // Aggressive state saving on multiple events (especially for mobile)
                const saveStateImmediately = function() {
                    if (backgroundMusic) {
                        saveAudioState();
                    }
                };
                
                // Save state on multiple events for maximum reliability
                window.addEventListener('pagehide', saveStateImmediately);
                window.addEventListener('beforeunload', saveStateImmediately);
                window.addEventListener('unload', saveStateImmediately);
                window.addEventListener('blur', saveStateImmediately);
                document.addEventListener('visibilitychange', function() {
                    if (document.hidden) {
                        saveStateImmediately();
                    }
                });
        
                // Restore audio state on pageshow (when page becomes visible again on mobile)
                window.addEventListener('pageshow', function(event) {
                    // Load state from IndexedDB/sessionStorage
                    loadAudioState(function(savedState) {
                        const savedTime = savedState.currentTime;
                        const wasPlaying = savedState.playing;
                        const wasUnmuted = savedState.unmuted;
                        
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
                                if (!isMobile || wasPlaying) {
                                    // PC or mobile with saved state - restore position
                                    if (backgroundMusic.duration && !isNaN(targetTime) && targetTime < backgroundMusic.duration) {
                                        backgroundMusic.currentTime = targetTime;
                                    }
                                } else {
                                    // Mobile without saved state - start from beginning
                                    backgroundMusic.currentTime = 0;
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
                });
        
                // Handle visibility change (for mobile browsers)
                document.addEventListener('visibilitychange', function() {
                    if (document.hidden) {
                        // Page is hidden - save state immediately
                        saveStateImmediately();
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
                            
                            // Save unmuted state
                            saveAudioState();
                            
                            // Ensure audio is playing - especially important for mobile
                            const ensureAudioPlaying = function() {
                                if (backgroundMusic.paused) {
                                    // Check if audio is ready to play
                                    if (backgroundMusic.readyState >= 2) {
                                        // Audio is ready, try to play
                                        const playPromise = backgroundMusic.play();
                                        if (playPromise !== undefined) {
                                            playPromise.then(function() {
                                                shouldBePlaying = true;
                                                saveAudioState();
                                            }).catch(function(error) {
                                                console.log('Audio play error on interaction:', error);
                                                // Wait for audio to be ready and retry
                                                if (backgroundMusic.readyState < 2) {
                                                    backgroundMusic.addEventListener('canplay', function() {
                                                        const retryPromise = backgroundMusic.play();
                                                        if (retryPromise !== undefined) {
                                                            retryPromise.then(function() {
                                                                shouldBePlaying = true;
                                                                saveAudioState();
                                                            }).catch(function(err) {
                                                                console.log('Audio play retry error:', err);
                                                            });
                                                        }
                                                    }, { once: true });
                                                } else {
                                                    // Audio is ready but play failed, retry after delay
                                                    setTimeout(function() {
                                                        if (backgroundMusic.paused) {
                                                            playAudio();
                                                        }
                                                    }, 300);
                                                }
                                            });
                                        }
                                    } else {
                                        // Audio not ready yet, wait for it to be ready
                                        backgroundMusic.addEventListener('canplay', function() {
                                            const playPromise = backgroundMusic.play();
                                            if (playPromise !== undefined) {
                                                playPromise.then(function() {
                                                    shouldBePlaying = true;
                                                    saveAudioState();
                                                }).catch(function(error) {
                                                    console.log('Audio play error after canplay:', error);
                                                    // Final retry
                                                    setTimeout(function() {
                                                        if (backgroundMusic.paused) {
                                                            playAudio();
                                                        }
                                                    }, 300);
                                                });
                                            }
                                        }, { once: true });
                                        
                                        // Force load if not already loading
                                        if (backgroundMusic.readyState === 0) {
                                            backgroundMusic.load();
                                        }
                                    }
                                } else {
                                    // Already playing, just update state
                                    shouldBePlaying = true;
                                    saveAudioState();
                                }
                            };
                            
                            // Try to ensure audio is playing
                            ensureAudioPlaying();
                        } catch (error) {
                            console.log('Audio unmute error:', error);
                        }
                    }
                };
                
                // Only listen for unmute if audio hasn't been unmuted yet
                if (!audioUnmuted) {
                    // Listen for first user interaction to unmute audio
                    // Use capture phase and multiple events for better mobile compatibility
                    const interactionEvents = ['click', 'touchstart', 'scroll', 'mousemove', 'touchend', 'keydown'];
                    interactionEvents.forEach(function(eventType) {
                        document.addEventListener(eventType, unmuteAudioOnInteraction, { once: true, passive: true, capture: true });
                    });
                }
                
                // Handle audio errors
                backgroundMusic.addEventListener('error', function(e) {
                    console.log('Audio loading error:', e);
                });
        
                // Ensure audio loops properly
                backgroundMusic.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                    saveAudioState();
                });
                
                // Update saved time when audio time updates (for seeking)
                backgroundMusic.addEventListener('timeupdate', function() {
                    if (!backgroundMusic.paused) {
                        // Save state more frequently on mobile
                        if (isMobile) {
                            // Save every 500ms on mobile
                            if (Math.floor(this.currentTime * 2) % 1 === 0) {
                                saveAudioState();
                            }
                        } else {
                            // Save every second on PC
                            if (Math.floor(this.currentTime) % 1 === 0) {
                                saveAudioState();
                            }
                        }
                    }
                });
                
                // Track when audio pauses (for mobile browsers that pause on navigation)
                backgroundMusic.addEventListener('pause', function() {
                    // Only update if we didn't intentionally pause
                    if (shouldBePlaying) {
                        // Audio was paused unexpectedly (e.g., by mobile browser)
                        // Save state immediately
                        saveStateImmediately();
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
                    saveAudioState();
                });
            });
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


