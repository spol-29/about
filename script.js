document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar transparency effect
    let navbar = document.querySelector('.navbar');
    let scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
        } else {
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
        }
    });

    // Animation for timeline and skill bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observe skill bars
    document.querySelectorAll('.skill-level').forEach(skill => {
        observer.observe(skill);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Observe framework boxes
    document.querySelectorAll('.framework-box').forEach(box => {
        observer.observe(box);
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    const modal = document.getElementById('message-modal');
    const closeModal = document.querySelector('.close');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success modal
                modal.style.display = 'block';
                // Clear form
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            alert('Oops! There was a problem submitting your form');
        }
    });

    // Close modal when clicking X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});