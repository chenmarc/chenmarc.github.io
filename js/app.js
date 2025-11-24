// Marc Chenard
// Caterina Paun
// CS563
// Fall 2025, Portland State University

// Javacript file containing primarily accordian and scroll animation logic

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initAccordion();
    initParallax();
});

/**
 * Handles the Fade-in, Scale, and Morph animations on scroll.
 * Reversible -- adds 'active' when in view, removes when out.
 */
function initScrollAnimations() {
    const triggers = document.querySelectorAll('.scroll-trigger');
    
    // Configurable here: Trigger when element is 85% down the viewport
    const triggerBottom = window.innerHeight * 0.85;

    const checkBoxes = () => {
        triggers.forEach(trigger => {
            const boxTop = trigger.getBoundingClientRect().top;

            // Add if visible, Remove if not
            if (boxTop < triggerBottom && boxTop > -trigger.getBoundingClientRect().height) {
                trigger.classList.add('active');
            } else {
                trigger.classList.remove('active');
            }
        });
    };

    // requestAnimationFrame for smoother scroll handling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkBoxes();
                ticking = false;
            });
            ticking = true;
        }
    });

    //Initial check in case elements are already in view
    checkBoxes();
}

//Moves the background at a slower speed than the scroll.
function initParallax() {
    const heroBg = document.getElementById('hero-bg');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Only animate if within reasonable range to save processing
        if (scrollY < window.innerHeight) {
            // Move background 50% speed of scroll
            heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    });
}

//Accordion (Previous Work section -- and now maybe education as well...
function initAccordion() {
    const accordion = document.querySelector('.accordion-wrapper');
    
    if (!accordion) return;

    accordion.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        
        if (!header) return;

        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        //Toggle current
        header.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            // Open: Set height to scrollHeight (actual content height)
            content.style.maxHeight = content.scrollHeight + "px";
            header.querySelector('.icon').textContent = '-';
        } else {
            // Close
            content.style.maxHeight = null;
            header.querySelector('.icon').textContent = '+';
        }
    });
}           
