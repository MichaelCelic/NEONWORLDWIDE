// Products Page JavaScript

// Mobile detection for better mobile experience
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));

// Product categories mapping
const productCategories = {
    'neural-interface-systems': {
        folder: 'Neural Interface Systems',
        title: 'Neural Interface Systems'
    },
    'cybernetic-limb-replacements': {
        folder: 'Cybernetic Limb Replacements',
        title: 'Cybernetic Limb Replacements'
    },
    'ocular-enhancement-systems': {
        folder: 'Ocular Enhancement Systems',
        title: 'Ocular Enhancement Systems'
    },
    'neural-processing-units': {
        folder: 'Neural Processing Units',
        title: 'Neural Processing Units'
    },
    'dermal-armor-systems': {
        folder: 'Dermal Armor Systems',
        title: 'Dermal Armor Systems'
    }
};

// Product data structure
const products = {
    'neural-interface-systems': [
        { name: 'Model NIS-103 "AetherCore"', image: 'Model NIS-103 "AetherCore".png', specs: 'Model NIS-103 "AetherCore" specs.txt', price: 125000 },
        { name: 'Model NIS-128 "HaloSyn"', image: 'Model NIS-128 "HaloSyn".png', specs: 'Model NIS-128 "HaloSyn" specs.txt', price: 145000 },
        { name: 'Model NIS-209 "Erebus Prime"', image: 'Model NIS-209 "Erebus Prime".png', specs: 'Model NIS-209 "Erebus Prime" specs.txt', price: 185000 },
        { name: 'Model NIS-77 "CortexLink"', image: 'Model NIS-77 "CortexLink".png', specs: 'Model NIS-77 "CortexLink" specs.txt', price: 95000 },
        { name: 'Model NIS-91 "Synapse Forge"', image: 'Model NIS-91 "Synapse Forge".png', specs: 'Model NIS-91 "Synapse Forge" specs.txt', price: 115000 }
    ],
    'cybernetic-limb-replacements': [
        { name: 'Model CL-01 "Vanguard Arm"', image: 'Model CL-01 "Vanguard Arm".png', specs: 'Model CL-01 "Vanguard Arm" specs.txt', price: 75000 },
        { name: 'Model CL-09 "Ethereal Arm"', image: 'Model CL-09 "Ethereal Arm".png', specs: 'Model CL-09 "Ethereal Arm" specs.txt', price: 85000 },
        { name: 'Model CL-12 "Aegis Arm"', image: 'Model CL-12 "Aegis Arm".png', specs: 'Model CL-12 "Aegis Arm" specs.txt', price: 95000 },
        { name: 'Model CL-17 "Seraph Arm"', image: 'Model CL-17 "Seraph Arm".png', specs: 'Model CL-17 "Seraph Arm" specs.txt', price: 105000 },
        { name: 'Model CL-21 "Specter Arm"', image: 'Model CL-21 "Specter Arm".png', specs: 'Model CL-21 "Specter Arm" specs.txt', price: 115000 },
        { name: 'Model CL-32 "Obsidian Reign"', image: 'Model CL-32 "Obsidian Reign".png', specs: 'Model CL-32 "Obsidian Reign" specs.txt', price: 135000 },
        { name: 'Model CL-47 "Iron Dominion"', image: 'Model CL-47 "Iron Dominion".png', specs: 'Model CL-47 "Iron Dominion" specs.txt', price: 155000 },
        { name: 'Model CL-58 "Nightshade Warden"', image: 'Model CL-58 "Nightshade Warden".png', specs: 'Model CL-58 "Nightshade Warden" specs.txt', price: 175000 },
        { name: 'Model CL-62 "Eidolon Veil"', image: 'Model CL-62 "Eidolon Veil".png', specs: 'Model CL-62 "Eidolon Veil" specs.txt', price: 195000 }
    ],
    'ocular-enhancement-systems': [
        { name: 'Model OE-09 "Specter Core"', image: 'Model OE-09 "Specter Core".png', specs: 'Model OE-09 "Specter Core" specs.txt', price: 65000 },
        { name: 'Model OE-21 "Argus Orb"', image: 'Model OE-21 "Argus Orb".png', specs: 'Model OE-21 "Argus Orb" specs.txt', price: 75000 },
        { name: 'Model OE-37 "Inferno Sight"', image: 'Model OE-37 "Inferno Sight".png', specs: 'Model OE-37 "Inferno Sight" specs.txt', price: 85000 },
        { name: 'Model OE-450 "Omega Prime"', image: 'Model OE-450 "Omega Prime".png', specs: 'Model OE-450 "Omega Prime" specs.txt', price: 125000 }
    ],
    'neural-processing-units': [
        { name: 'Model NPU-212 "Crimson Vortex"', image: 'Model NPU-212 "Crimson Vortex".png', specs: 'Model NPU-212 "Crimson Vortex" specs.txt', price: 165000 },
        { name: 'Model NPU-88 "Cerebra Forge"', image: 'Model NPU-88 "Cerebra Forge".png', specs: 'Model NPU-88 "Cerebra Forge" specs.txt', price: 135000 },
        { name: 'Model NPU-99 "Eclipse Node"', image: 'Model NPU-99 "Eclipse Node".png', specs: 'Model NPU-99 "Eclipse Node" specs.txt', price: 155000 }
    ],
    'dermal-armor-systems': [
        { name: 'Model DAS-09 "Aegis Weave"', image: 'Model DAS-09 "Aegis Weave".png', specs: 'Model DAS-09 "Aegis Weave" specs.txt', price: 85000 },
        { name: 'Model DAS-14 "Helix Shroud"', image: 'Model DAS-14 "Helix Shroud".png', specs: 'Model DAS-14 "Helix Shroud" specs.txt', price: 105000 }
    ]
};

// Load product specs from text file
async function loadProductSpecs(categoryFolder, specsFile) {
    try {
        const encodedFolder = encodeURIComponent(categoryFolder);
        const encodedFile = encodeURIComponent(specsFile);
        const response = await fetch(`assets/${encodedFolder}/${encodedFile}`);
        if (response.ok) {
            return await response.text();
        }
        return 'Specifications not available.';
    } catch (error) {
        console.error('Error loading specs:', error);
        return 'Specifications not available.';
    }
}

// Format price as currency
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

// Load and display products for a category
async function loadProducts(categoryId) {
    const category = productCategories[categoryId];
    if (!category) return;
    
    const productList = products[categoryId];
    if (!productList) return;
    
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    for (const product of productList) {
        const specs = await loadProductSpecs(category.folder, product.specs);
        
        const encodedFolder = encodeURIComponent(category.folder);
        const encodedImage = encodeURIComponent(product.image);
        const productCard = document.createElement('div');
        productCard.className = 'product-item-card';
        productCard.innerHTML = `
            <div class="product-item-image">
                <img src="assets/${encodedFolder}/${encodedImage}" alt="${product.name}" onerror="this.style.display='none'">
            </div>
            <div class="product-item-info">
                <h3>${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-specs">${specs.replace(/\n/g, '<br>')}</div>
                <button class="btn purchase-btn" data-product="${product.name}" data-price="${product.price}" data-image="${product.image}" data-category="${category.folder}">
                    Purchase
                </button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    }
    
    // Add click handlers for purchase buttons
    document.querySelectorAll('.purchase-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showPurchaseForm(this.dataset.product, this.dataset.price, this.dataset.image, this.dataset.category);
        });
    });
}

// Show purchase form
function showPurchaseForm(productName, price, image, category) {
    const formOverlay = document.getElementById('purchase-form-overlay');
    const formContainer = document.getElementById('purchase-form-container');
    
    if (!formOverlay || !formContainer) return;
    
    // Mobile-friendly input attributes
    const inputAttrs = isMobileDevice ? 'autocomplete="off" inputmode="text"' : '';
    const telAttrs = isMobileDevice ? 'autocomplete="tel" inputmode="tel"' : '';
    const emailAttrs = isMobileDevice ? 'autocomplete="email" inputmode="email"' : '';
    
    const encodedCategory = encodeURIComponent(category);
    const encodedImage = encodeURIComponent(image);
    formContainer.innerHTML = `
        <div class="purchase-product-display">
            <img src="assets/${encodedCategory}/${encodedImage}" alt="${productName}" onerror="this.style.display='none'">
            <h3>${productName}</h3>
            <div class="product-price">${formatPrice(parseFloat(price))}</div>
        </div>
        <form id="purchase-application-form">
            <div class="form-group">
                <label for="purchase-name">Full Name *</label>
                <input type="text" id="purchase-name" name="name" ${inputAttrs} required>
            </div>
            <div class="form-group">
                <label for="purchase-phone">Phone Number *</label>
                <input type="tel" id="purchase-phone" name="phone" ${telAttrs} required>
            </div>
            <div class="form-group">
                <label for="purchase-email">Email Address *</label>
                <input type="email" id="purchase-email" name="email" ${emailAttrs} required>
            </div>
            <div class="form-group">
                <label for="purchase-address">Inspection Address *</label>
                <input type="text" id="purchase-address" name="address" ${inputAttrs} required>
            </div>
            <div class="form-group">
                <label for="purchase-date">Preferred Date of Inspection (Month, Day, Year) *</label>
                <input type="text" id="purchase-date" name="date" placeholder="e.g., January 15, 2024" ${inputAttrs} required>
            </div>
            <div class="form-group">
                <label for="purchase-reason">Reason for Purchase *</label>
                <textarea id="purchase-reason" name="reason" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label for="purchase-medical">Medical History (Optional)</label>
                <textarea id="purchase-medical" name="medical" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label for="purchase-enhancements">Current Enhancements (Optional)</label>
                <textarea id="purchase-enhancements" name="enhancements" rows="3"></textarea>
            </div>
            <button type="submit" class="btn">Submit Purchase Application</button>
        </form>
    `;
    
    formOverlay.classList.add('active');
    
    // Scroll to top of form on mobile
    if (isMobileDevice) {
        setTimeout(function() {
            formOverlay.scrollTop = 0;
        }, 100);
    }
    
    // Handle form submission
    const form = document.getElementById('purchase-application-form');
    if (form) {
        form.addEventListener('submit', handlePurchaseFormSubmit);
    }
}

// Validate date format (Month, Day, Year)
function validateDate(dateString) {
    // Try to parse common date formats
    const datePatterns = [
        /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})$/i,
        /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
        /^(\d{1,2})-(\d{1,2})-(\d{4})$/
    ];
    
    for (const pattern of datePatterns) {
        if (pattern.test(dateString.trim())) {
            return true;
        }
    }
    
    return false;
}

// Handle purchase form submission
function handlePurchaseFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const date = formData.get('date');
    
    // Validate date format
    if (!validateDate(date)) {
        alert('Please enter the date in the format: Month, Day, Year (e.g., January 15, 2024)');
        return;
    }
    
    // Validate required fields
    const requiredFields = ['name', 'phone', 'email', 'address', 'reason'];
    for (const field of requiredFields) {
        if (!formData.get(field) || formData.get(field).trim() === '') {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }
    
    // Show success overlay
    showPurchaseSuccess();
}

// Show purchase success overlay
function showPurchaseSuccess() {
    const formOverlay = document.getElementById('purchase-form-overlay');
    const successOverlay = document.getElementById('purchase-success-overlay');
    
    if (formOverlay) {
        formOverlay.classList.remove('active');
    }
    
    if (successOverlay) {
        successOverlay.classList.add('active');
        
        // Redirect to products page after 4 seconds
        setTimeout(function() {
            window.location.href = 'products.html';
        }, 4000);
    }
}

// Close purchase form overlay (global function)
window.closePurchaseForm = function() {
    const formOverlay = document.getElementById('purchase-form-overlay');
    if (formOverlay) {
        formOverlay.classList.remove('active');
    }
};

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    // Get category from URL or page ID
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    
    if (productCategories[filename]) {
        loadProducts(filename);
    }
    
    // Close overlay when clicking outside
    const formOverlay = document.getElementById('purchase-form-overlay');
    if (formOverlay) {
        formOverlay.addEventListener('click', function(e) {
            if (e.target === formOverlay) {
                closePurchaseForm();
            }
        });
    }
});

