// Password visibility toggle
document.querySelectorAll('.password-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        
        // Update icon (you can replace with eye-open/eye-closed icons)
        this.classList.toggle('visible');
    });
});

// Login form handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = loginForm.querySelector('.auth-button');
        button.classList.add('loading');
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!email || !password) {
                showMessage(loginForm, 'Please fill in all fields', 'error');
            } else if (!isValidEmail(email)) {
                showMessage(loginForm, 'Please enter a valid email address', 'error');
            } else {
                showMessage(loginForm, 'Login successful! Redirecting...', 'success');
                // Redirect logic here
                // window.location.href = 'dashboard.html';
            }
        } catch (error) {
            showMessage(loginForm, 'An error occurred. Please try again.', 'error');
        } finally {
            button.classList.remove('loading');
        }
    });
}

// Register form handling
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = registerForm.querySelector('.auth-button');
        button.classList.add('loading');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validation
            if (!fullname || !email || !password || !confirmPassword) {
                showMessage(registerForm, 'Please fill in all fields', 'error');
            } else if (!isValidEmail(email)) {
                showMessage(registerForm, 'Please enter a valid email address', 'error');
            } else if (password.length < 6) {
                showMessage(registerForm, 'Password must be at least 6 characters', 'error');
            } else if (password !== confirmPassword) {
                showMessage(registerForm, 'Passwords do not match', 'error');
            } else {
                showMessage(registerForm, 'Account created successfully! Redirecting...', 'success');
                // Redirect logic here
                // window.location.href = 'login.html';
            }
        } catch (error) {
            showMessage(registerForm, 'An error occurred. Please try again.', 'error');
        } finally {
            button.classList.remove('loading');
        }
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Helper function to show messages
function showMessage(form, message, type) {
    // Remove any existing messages
    const existingMessage = form.parentNode.querySelector('.error-message, .success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and insert new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    
    form.parentNode.insertBefore(messageDiv, form);
    
    // Auto remove success message after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// Input focus effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}