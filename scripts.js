// Function to reveal sections with a fade-in animation
// function revealSections() {
//     const sections = document.querySelectorAll('section');

//     sections.forEach(section => {
//         const sectionPosition = section.getBoundingClientRect().top;
//         const screenPosition = window.innerHeight / 1.2;

//         if (sectionPosition < screenPosition) {
//             section.style.opacity = '1';
//             section.style.transform = 'translateY(0)';
//         }
//     });
// }

// // Run revealSections on page load and scroll
// window.addEventListener('scroll', revealSections);
// window.addEventListener('load', revealSections);


{/* <script>
    window.addEventListener('DOMContentLoaded', (event) => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });
</script> */}


const contactForm = document.getElementById('contact-form');
const messageResponse = document.getElementById('message-response');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    fetch('/send-email', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        messageResponse.textContent = data.message;
    })
    .catch(error => {
        console.error('Error sending email:', error);
        messageResponse.textContent = 'An error occurred while sending your message. Please try again later.';
    });
});
