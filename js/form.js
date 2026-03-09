// ============================================================
//  EmailJS Setup
//  1. Sign up at https://emailjs.com
//  2. Create a Service (Gmail etc.) → copy Service ID
//  3. Create a Template           → copy Template ID
//  4. Go to Account → copy Public Key
//  5. Replace the 3 values below
// ============================================================
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

document.addEventListener('DOMContentLoaded', function () {
    // Initialise EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Initialize forms
    initContactForm();
    initNewsletterForm();
});

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Validate form
            if (validateForm(data)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                // ── Send via EmailJS ──────────────────────────────
                emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
                    .then(() => {
                        // Success
                        showNotification('Message sent successfully! I will get back to you soon.', 'success');
                        contactForm.reset();
                    })
                    .catch((error) => {
                        // Error
                        console.error('EmailJS error:', error);
                        showNotification('Oops! Something went wrong. Please try again.', 'error');
                    })
                    .finally(() => {
                        // Always re-enable button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
            }
        });
    }
}

// Newsletter Form Handling (unchanged)
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalHtml = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

                setTimeout(() => {
                    showNotification('Thank you for subscribing!', 'success');
                    emailInput.value = '';
                    submitBtn.innerHTML = originalHtml;
                }, 1000);
            } else {
                showNotification('Please enter a valid email address.', 'error');
                emailInput.focus();
            }
        });
    }
}

// Form Validation (unchanged)
function validateForm(data) {
    if (!data.name || !data.email || !data.subject || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }

    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }

    if (data.message.length < 10) {
        showNotification('Message should be at least 10 characters long.', 'error');
        return false;
    }

    return true;
}

// Email Validation (unchanged)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification System (unchanged)
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';

    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    document.body.appendChild(notification);
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#6366f1';
    }
}

const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to   { transform: translateX(0);    opacity: 1; }
    }
    .notification-close {
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
    }
    .notification-close:hover { opacity: 0.8; }
`;
document.head.appendChild(notificationStyle);