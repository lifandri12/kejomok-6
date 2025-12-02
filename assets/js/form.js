// Navigation Toggle
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
    const btn = document.querySelector('button[aria-label="Toggle navigation"]');
    if (btn) {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', (!expanded).toString());
    }
}

// Password Toggle
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('passwordToggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Validate individual field
function validateField(field, errorId, errorMsg) {
    const errorElement = document.getElementById(errorId);
    if (!field.value || (field.minLength && field.value.length < field.minLength)) {
        errorElement.textContent = errorMsg;
        errorElement.classList.remove('hidden');
        field.classList.add('error');
        return false;
    } else {
        errorElement.classList.add('hidden');
        field.classList.remove('error');
        return true;
    }
}

// Validate email format
function validateEmail(field) {
    const errorElement = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
        errorElement.textContent = 'Email tidak valid';
        errorElement.classList.remove('hidden');
        field.classList.add('error');
        return false;
    } else {
        errorElement.classList.add('hidden');
        field.classList.remove('error');
        return true;
    }
}

// Initialize form handlers
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Real-time validation
    if (document.getElementById('fullName')) {
        document.getElementById('fullName').addEventListener('blur', function() {
            validateField(this, 'fullNameError', 'Nama harus minimal 3 karakter');
        });
    }

    if (document.getElementById('password')) {
        document.getElementById('password').addEventListener('blur', function() {
            validateField(this, 'passwordError', 'Password harus minimal 6 karakter');
        });
    }

    if (document.getElementById('message')) {
        document.getElementById('message').addEventListener('blur', function() {
            validateField(this, 'messageError', 'Pesan harus minimal 10 karakter');
        });
    }

    if (document.getElementById('email')) {
        document.getElementById('email').addEventListener('blur', function() {
            validateEmail(this);
        });
    }

    if (document.getElementById('country')) {
        document.getElementById('country').addEventListener('change', function() {
            validateField(this, 'countryError', 'Pilih negara');
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate all fields
            let isValid = true;
            isValid &= validateField(document.getElementById('fullName'), 'fullNameError', 'Nama harus minimal 3 karakter');
            isValid &= validateField(document.getElementById('password'), 'passwordError', 'Password harus minimal 6 karakter');
            isValid &= validateField(document.getElementById('message'), 'messageError', 'Pesan harus minimal 10 karakter');
            isValid &= validateEmail(document.getElementById('email'));
            isValid &= validateField(document.getElementById('country'), 'countryError', 'Pilih negara');

            // Check radio button
            const genderSelected = document.querySelector('input[name="gender"]:checked');
            const genderError = document.getElementById('genderError');
            if (!genderSelected) {
                genderError.textContent = 'Pilih jenis kelamin';
                genderError.classList.remove('hidden');
                isValid = false;
            } else {
                genderError.classList.add('hidden');
            }

            // Check checkboxes
            const interestsChecked = document.querySelectorAll('input[name="interests"]:checked');
            const interestsError = document.getElementById('interestsError');
            if (interestsChecked.length === 0) {
                interestsError.textContent = 'Pilih minimal 1 minat';
                interestsError.classList.remove('hidden');
                isValid = false;
            } else {
                interestsError.classList.add('hidden');
            }

            if (isValid) {
                // Log form data
                console.log({
                    fullName: document.getElementById('fullName').value,
                    password: document.getElementById('password').value,
                    message: document.getElementById('message').value,
                    gender: genderSelected.value,
                    interests: Array.from(interestsChecked).map(cb => cb.value),
                    country: document.getElementById('country').value,
                    email: document.getElementById('email').value
                });

                // Show success message
                successMessage.classList.remove('hidden');
                successMessage.style.display = 'flex';
                form.style.opacity = '0.6';
                form.style.pointerEvents = 'none';

                setTimeout(() => {
                    form.reset();
                    form.style.opacity = '1';
                    form.style.pointerEvents = 'auto';
                    successMessage.classList.add('hidden');
                    successMessage.style.display = 'none';
                }, 2500);
            }
        });
    }
});
