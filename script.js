// Smooth scroll for anchor links
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

// Parse the URL parameters
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Get GCLID
window.onload = function getGclid() {
    var value = getParameterByName("gclid");
    var e = document.getElementById("gclid");
    if (e) e.value = value; // Add null check
}

// Improved form submission with spinner handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms['submit-to-google-sheet'];
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwx_IAyzkczzmGpEmFGEYKm9kisBxmmblS2Ej_4PxP5aq6l1Rf8gCGqBODXYdN0cZz5/exec';
    
    if (form) {
        const spinner = document.getElementById('spinner');
        const submitButton = form.querySelector('button[type="submit"]');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Check if the form is valid
            if (this.checkValidity()) {
                // Disable the button and show spinner
                if (submitButton) submitButton.disabled = true;
                if (spinner) spinner.style.display = 'block';
                
                // Send data to the spreadsheet
                fetch(scriptURL, { 
                    method: 'POST', 
                    body: new FormData(form) 
                })
                .then(response => {
                    if (response.ok) {
                        // On success, redirect to HubSpot booking page
                        window.location.href = 'https://meetings-eu1.hubspot.com/joe-dobias/greenaer-sandyford-one-on-one-test-ride?uuid=4fdaaa82-b7b9-4194-aa85-2af27ecda1f7';
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .catch(error => {
                    // Re-enable the button and hide spinner on error
                    if (spinner) spinner.style.display = 'none';
                    if (submitButton) submitButton.disabled = false;
                    console.error('Error!', error.message);
                    alert('There was a problem submitting your form. Please try again.');
                });
            }
        });
    }
});


// Add active state to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Hide navbar when form section is in view
const header = document.querySelector('.header');
const formSection = document.querySelector('#booking-form');

if (header && formSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                header.style.opacity = '0';
                header.style.pointerEvents = 'none';
            } else {
                header.style.opacity = '1';
                header.style.pointerEvents = 'auto';
            }
        });
    }, { threshold: 0.3 });

    observer.observe(formSection);
}
