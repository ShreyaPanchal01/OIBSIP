// Simulate server-side user database
const users = {};

// Register a new user
function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (users[username]) {
        alert('Username already taken!');
        return;
    }

    users[username] = password;
    alert('User registered successfully!');
    toggleForms();
}

// Login an existing user
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (users[username] && users[username] === password) {
        alert('Login successful!');
        document.getElementById('user-name').innerText = username;
        showSecuredPage();
    } else {
        alert('Invalid username or password!');
    }
}

// Toggle between login and register forms
function toggleForms() {
    const registerForm = document.getElementById('register');
    const loginForm = document.getElementById('login');
    if (registerForm.style.display === 'none') {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    }
}

// Show secured page
function showSecuredPage() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('secured-page').style.display = 'block';
}

// Logout the user
function logout() {
    document.getElementById('secured-page').style.display = 'none';
    toggleForms();
}

// Event listeners
document.getElementById('register-button').addEventListener('click', register);
document.getElementById('login-button').addEventListener('click', login);
document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});
document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});
document.getElementById('logout-button').addEventListener('click', logout);
