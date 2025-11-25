// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for all navigation links
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

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Add animation on scroll for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // Observe gameplay steps
    document.querySelectorAll('.gameplay-step').forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(step);
    });

    // Observe download steps
    document.querySelectorAll('.download-step').forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(step);
    });

    // Interactive fruit slicing effect on hero section
    const hero = document.querySelector('.hero');
    const fruits = document.querySelectorAll('.fruit');
    
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        fruits.forEach((fruit, index) => {
            const speed = (index + 1) * 0.01;
            const x = (clientX - centerX) * speed;
            const y = (clientY - centerY) * speed;
            
            fruit.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
        });
    });

    // Add click effect to download button
    const downloadBtn = document.querySelector('.download-button');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            // Check if it's a placeholder link
            if (downloadBtn.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 107, 107, 0.5)';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.animation = 'ripple 0.6s ease-out';
                ripple.style.left = e.offsetX + 'px';
                ripple.style.top = e.offsetY + 'px';
                
                downloadBtn.style.position = 'relative';
                downloadBtn.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
                
                // Show alert for demo purposes
                alert('Add your download link here! Replace href="#" with your actual game file URL.');
            }
        });
    }

    // Add ripple animation to CSS dynamically
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                    transform: translate(-50%, -50%);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
        }
    });

    function activateEasterEgg() {
        // Make all fruits rain from the top
        const body = document.body;
        const fruitEmojis = ['🍎', '🍊', '🍋', '🍉', '🍌', '🥥', '🍇', '🍓', '🍒', '🥝'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const fruit = document.createElement('div');
                fruit.textContent = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];
                fruit.style.position = 'fixed';
                fruit.style.left = Math.random() * 100 + '%';
                fruit.style.top = '-50px';
                fruit.style.fontSize = '3rem';
                fruit.style.zIndex = '9999';
                fruit.style.pointerEvents = 'none';
                fruit.style.animation = 'fall 3s linear';
                
                body.appendChild(fruit);
                
                setTimeout(() => fruit.remove(), 3000);
            }, i * 100);
        }
        
        // Add fall animation
        if (!document.querySelector('#fall-animation')) {
            const style = document.createElement('style');
            style.id = 'fall-animation';
            style.textContent = `
                @keyframes fall {
                    to {
                        top: 100vh;
                        transform: rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log('🗡️ Slice Master Mode Activated! 🗡️');
    }

    // Loading animation (optional - for when you add actual images)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });

    console.log('🗡️ Slice Master VR website loaded successfully!');
    console.log('💡 Tip: Try the Konami code for a surprise!');
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
