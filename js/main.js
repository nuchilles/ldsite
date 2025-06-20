// Main JavaScript functionality for Lushdown landing page
document.addEventListener('DOMContentLoaded', function() {
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Mobile-optimized interactions
    const linkItems = document.querySelectorAll('.link-item');
    
    linkItems.forEach(item => {
        // Touch-friendly interactions for mobile
        item.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        }, { passive: true });
        
        // Touch end effect
        item.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
        
        // Prevent double-tap zoom on mobile
        item.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });

        // Desktop hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });

        // Click ripple effect
        item.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 100;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Parallax effect for hero image on scroll (subtle for mobile performance)
    let ticking = false;
    const heroImage = document.querySelector('.artist-image');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        if (heroImage) {
            heroImage.style.transform = `translateX(-50%) translateY(${parallax}px)`;
        }
        ticking = false;
    }
    
    // Throttled scroll listener for better performance
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Font loading optimization
    if ('fonts' in document) {
        // Preload the vintage font for better performance
        const fontRegular = new FontFace('AdvercaseFont', 'url(../fonts/advercasefont-regular-webfont.woff2)');
        const fontBold = new FontFace('AdvercaseFont', 'url(../fonts/advercasefont-bold-webfont.woff2)', { weight: 'bold' });
        
        Promise.all([fontRegular.load(), fontBold.load()]).then(function(fonts) {
            fonts.forEach(function(font) {
                document.fonts.add(font);
            });
            console.log('AdvercaseFont loaded successfully');
        }).catch(function(error) {
            console.log('Font loading failed:', error);
        });
    }
    
    // Debug console message
    console.log('Lushdown vintage magazine ad loaded successfully!');
    console.log('Analytics tracking enabled for: Newsletter, Spotify, Apple Music, TikTok');
});