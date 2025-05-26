document.addEventListener('DOMContentLoaded', function () {
    // Get references to the mobile menu elements
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link'); // All links within the mobile menu

    // Toggle mobile menu visibility when the menu button is clicked
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when the close button is clicked
    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
        });
    }

    // Close mobile menu when a link inside it is clicked (for smooth scrolling)
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
        });
    });

    // Handle smooth scrolling for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href'); // Get the target section's ID
            const targetElement = document.querySelector(targetId); // Find the target element

            if (targetElement) {
                // Scroll to the target element smoothly
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling (for the contact form)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const program = document.getElementById('program-interest').value;
            const message = document.getElementById('message').value;

            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
            }

            // Send form data to Google Sheets via Apps Script Web App
            fetch('https://script.google.com/macros/s/AKfycbxLhuJwMidoQ3SLUo5kj7Tk5PL0Ska_bpWabCGtbyWMPQhK0ZKAmFtHMAzQxbH1ycCeGQ/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    program,
                    message
                })
            })
            .then(() => {
                if (submitButton) {
                    submitButton.textContent = 'Message Sent!';
                    submitButton.classList.remove('bg-sky-400', 'hover:bg-pink-400');
                    submitButton.classList.add('bg-green-500', 'cursor-not-allowed');
                }

                // Reset the form after a short delay
                setTimeout(() => {
                    contactForm.reset();
                    if (submitButton) {
                        submitButton.textContent = 'Send Message';
                        submitButton.classList.remove('bg-green-500', 'cursor-not-allowed');
                        submitButton.classList.add('bg-sky-400', 'hover:bg-pink-400');
                        submitButton.disabled = false;
                    }
                }, 3000);
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                alert("There was an error submitting the form.");
                if (submitButton) {
                    submitButton.textContent = 'Send Message';
                    submitButton.disabled = false;
                }
            });
        });
    }
});
