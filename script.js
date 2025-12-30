/* ==========================================================================
   1. GLOBAL INITIALIZATION & CONFIGURATION
   ========================================================================== */

/**
 * Initialize EmailJS with Public Key
 * The leading semicolon prevents issues with concatenation/minification
 */
;(function() {
    emailjs.init("LFYhJVv1RYhkbteSY"); 
})();

/* ==========================================================================
   2. NAVBAR & MOBILE MENU LOGIC
   ========================================================================== */

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

/**
 * Handle mobile menu toggle icon and visibility
 */
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* ==========================================================================
   3. SCROLL BEHAVIOR (Active Links & Sticky Header)
   ========================================================================== */

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        // Highlight active link in navbar based on scroll position
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    /**
     * Sticky Navbar logic
     */
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /**
     * Close mobile menu when user starts scrolling
     */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* ==========================================================================
   4. ANIMATIONS (Scroll Reveal & Typing Effect)
   ========================================================================== */

// Initialize ScrollReveal
ScrollReveal({ 
    distance: '80px',
    duration: 2000,
    delay: 200
});

// Define Reveal Directions
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-image, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/**
 * Initialize Typed.js typing animation
 */
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'YouTuber', 'Graphic Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* ==========================================================================
   5. MODAL SYSTEM (Services & Info)
   ========================================================================== */

/**
 * Open the service detail modal
 * @param {string} title - The text to display in the header
 * @param {string} description - The main content body
 */
function openModal(title, description) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('serviceModal').style.display = "block";
}

/**
 * Close the modal
 */
function closeModal() {
    document.getElementById('serviceModal').style.display = "none";
}

/**
 * Close modal if the user clicks anywhere outside of the modal content
 */
window.onclick = function(event) {
    let modal = document.getElementById('serviceModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/* ==========================================================================
   6. CONTACT FORM HANDLING (EmailJS)
   ========================================================================== */

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Visual feedback for the user
        submitBtn.value = 'Sending...';
        submitBtn.disabled = true;

        /**
         * Send the form using Service ID and Template ID
         * IDs correspond to EmailJS dashboard configuration
         */
        emailjs.sendForm('service_i3gphhl', 'template_37yhodm', this)
            .then(function() {
                alert('Success! Your message has been sent.');
                submitBtn.value = 'Send Message';
                submitBtn.disabled = false;
                contactForm.reset();
            }, function(error) {
                alert('Failed to send message. Error: ' + JSON.stringify(error));
                submitBtn.value = 'Send Message';
                submitBtn.disabled = false;
            });
    });
}