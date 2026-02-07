// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // 1. Check for saved user preference, if none, check system preference
    const savedTheme = localStorage.getItem('color-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    // 2. The Toggle Logic
    themeToggleBtn.addEventListener('click', () => {
        // Toggle the class
        htmlElement.classList.toggle('dark');

        // Save the new state to localStorage
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('color-theme', 'dark');
        } else {
            localStorage.setItem('color-theme', 'light');
        }
    });

    // 3. Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 4. Contact Form Logic
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Reset status
            formStatus.classList.add('hidden');
            formStatus.textContent = '';
            formStatus.className = 'text-sm font-mono text-center sm:text-right hidden'; // Reset classes

            // Get values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validation
            if (!name || !email || !subject || !message) {
                showStatus('All fields are required.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showStatus('Invalid signal frequency (email).', 'error');
                return;
            }

            if (message.length < 10) {
                showStatus('Transmission data too short.', 'error');
                return;
            }

            // Disable button
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> TRANSMITTING...';

            // Prepare Access Key (Place your actual key here)
            // For now, we use a placeholder or check if user added one in HTML
            // Note: In a real scenario, you can put the key here or as a hidden input
            const accessKey = 'd56a700c-5d61-435e-8e9d-733d3fffa740';

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: accessKey,
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,
                        from_name: "Portfolio Contact"
                    })
                });

                const result = await response.json();

                if (response.status === 200) {
                    showStatus('Transmission successful. Channel closed.', 'success');
                    contactForm.reset();
                } else {
                    console.error(result);
                    showStatus(result.message || 'Transmission failed. Retry connection.', 'error');
                }
            } catch (error) {
                console.error(error);
                showStatus('Network error. Check connection nodes.', 'error');
            } finally {
                // Re-enable button after delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }, 3000); // Keep "success" state visible for a bit or just reset immediately
            }
        });
    }

    function showStatus(msg, type) {
        formStatus.textContent = msg;
        formStatus.classList.remove('hidden');
        if (type === 'error') {
            formStatus.classList.add('text-red-500', 'dark:text-red-400');
            formStatus.classList.remove('text-green-500', 'dark:text-green-400');
        } else {
            formStatus.classList.add('text-green-500', 'dark:text-green-400');
            formStatus.classList.remove('text-red-500', 'dark:text-red-400');
        }
    }
});
