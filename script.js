// Portfolio Gallery Data
const portfolioImages = {
    makeup: [
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    mehndi: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1630062709866-5b36b5d97e28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1642685963498-ad4c66de1bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1649506064607-4b5e8073b8af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1606502281123-bb49ee10b4f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    nails: [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522104187815-de7c3d4c5ad8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1619149697705-10ea72e4f4cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1562071699-b0a9b9d90d95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
};

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize icons
    lucide.createIcons();
    
    // Initialize portfolio
    initializePortfolio();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize form
    initializeContactForm();
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        updateMenuIcon(false);
    }
}

// Initialize Mobile Menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                mobileMenu.classList.remove('active');
            } else {
                mobileMenu.classList.add('active');
            }
            
            updateMenuIcon(!isActive);
        });
    }
    
    // Close mobile menu when clicking nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-menu .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            updateMenuIcon(false);
        });
    });
}

// Update Menu Icon
function updateMenuIcon(isOpen) {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const icon = menuToggle.querySelector('i');
    
    if (isOpen) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    
    lucide.createIcons();
}

// Initialize Smooth Scrolling for all nav links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Initialize Portfolio Gallery
function initializePortfolio() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const portfolioGallery = document.getElementById('portfolioGallery');
    
    // Set default active tab
    let activeTab = 'makeup';
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update gallery
            activeTab = tabName;
            updatePortfolioGallery(activeTab);
        });
    });
    
    // Initialize with default tab
    updatePortfolioGallery(activeTab);
}

// Update Portfolio Gallery
function updatePortfolioGallery(category) {
    const gallery = document.getElementById('portfolioGallery');
    const images = portfolioImages[category] || [];
    
    // Clear existing content
    gallery.innerHTML = '';
    
    // Add new images
    images.forEach((imageSrc, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${category} portfolio ${index + 1}`;
        img.loading = 'lazy';
        
        portfolioItem.appendChild(img);
        gallery.appendChild(portfolioItem);
    });
}

// Initialize Contact Form
function initializeContactForm() {
    const form = document.getElementById('appointmentForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                submitForm(data);
            }
        });
    }
}

// Form Validation
function validateForm(data) {
    const required = ['firstName', 'lastName', 'email', 'phone', 'service'];
    let isValid = true;
    
    // Remove previous error messages
    removeErrorMessages();
    
    // Check required fields
    required.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Validate email
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone
    if (data.phone && data.phone.length < 10) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Add error class to field
    field.classList.add('error');
    
    // Insert error message
    formGroup.appendChild(errorElement);
}

// Remove error messages
function removeErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorFields = document.querySelectorAll('.error');
    
    errorMessages.forEach(error => error.remove());
    errorFields.forEach(field => field.classList.remove('error'));
}

// Submit Form
function submitForm(data) {
    const submitButton = document.querySelector('#appointmentForm button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // Show success message
        showSuccessMessage('Appointment request sent! We\'ll contact you soon to confirm your appointment.');
        
        // Reset form
        document.getElementById('appointmentForm').reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    }, 2000);
}

// Show success message
function showSuccessMessage(message) {
    const form = document.getElementById('appointmentForm');
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    
    form.insertBefore(successElement, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        if (successElement.parentNode) {
            successElement.remove();
        }
    }, 5000);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            updateMenuIcon(false);
        }
    }
});

// Preload images for better performance
function preloadImages() {
    const allImages = [
        ...portfolioImages.makeup,
        ...portfolioImages.mehndi,
        ...portfolioImages.nails
    ];
    
    allImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading after page load
window.addEventListener('load', preloadImages);