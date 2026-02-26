// Main JavaScript File

document.addEventListener('DOMContentLoaded', function () {
    // Initialize everything
    initializeApp();
});

function initializeApp() {
    // Remove loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        document.getElementById('loadingScreen').style.visibility = 'hidden';
    }, 1000);

    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initTypingEffect();
    initScrollAnimations();
    initCounters();
    initCurrentYear();
    initParticles();
    initSkillBars();
}
function handleImageError(img) {
    console.error('Image failed to load:', img.src);

    // Hide the broken image
    img.style.display = 'none';

    // Create a fallback element
    const container = img.parentElement;
    const fallback = document.createElement('div');
    fallback.className = 'profile-fallback';
    fallback.innerHTML = '👨‍💻';
    fallback.style.cssText = `
        width: 100%;
        height: 100%;
        background: var(--gradient);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8rem;
        border-radius: 50%;
        animation: float 6s ease-in-out infinite;
    `;

    container.appendChild(fallback);
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing Effect
function initTypingEffect() {
    const typedTextSpan = document.getElementById('typed');
    const professions = [
        'Full-Stack Developer',
        'UI/UX Designer',
        'Problem Solver',
        'Tech Enthusiast',
        'Open Source Contributor',
        'Data Analaysis'
    ];

    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
        if (isPaused) return;

        const currentProfession = professions[professionIndex];

        if (!isDeleting && charIndex < currentProfession.length) {
            typedTextSpan.textContent += currentProfession.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            typedTextSpan.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, 50);
        } else if (!isDeleting && charIndex === currentProfession.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                setTimeout(type, 500);
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            setTimeout(type, 500);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 1000);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animation');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Set current year in footer
function initCurrentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Particles Background
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 4 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        // Apply styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: float ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            z-index: 0;
        `;

        particlesContainer.appendChild(particle);
    }
}

// Animate Skill Bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = `${width}%`;
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
    .particle {
        animation: float 20s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(20px); }
        75% { transform: translateY(-30px) translateX(-10px); }
    }
`;
document.head.appendChild(style);