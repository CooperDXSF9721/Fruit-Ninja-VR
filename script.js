// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Parallax effect for floating fruits
    const hero = document.querySelector('.hero');
    const fruits = document.querySelectorAll('.fruit');
    
    if (hero && fruits.length > 0) {
        hero.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const moveX = (e.clientX - centerX) / centerX;
            const moveY = (e.clientY - centerY) / centerY;
            
            fruits.forEach((fruit, index) => {
                const speed = (index + 1) * 10;
                const x = moveX * speed;
                const y = moveY * speed;
                fruit.style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
            });
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.2,
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

    // Observe steps
    document.querySelectorAll('.step').forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(step);
    });

    // Download button click handler
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Only prevent default if href is "#"
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Replace the href="#" with your actual download link!');
            }
            // If href has a real link, let it download normally
        });
    }

    console.log('🗡️ Slice Master VR website loaded!');
});
