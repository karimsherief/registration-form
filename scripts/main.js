const PAGES = {
    home: '/',
    login: '/login.html',
    signup: '/register.html'
}

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let users = JSON.parse(localStorage.getItem('users')) || []

// if (currentUser && (location.pathname === PAGES.login || location.pathname === PAGES.signup)) {
//     location.href = PAGES.home
// }
// if (currentUser == null && location.pathname !== PAGES.login && location.pathname !== PAGES.signup) {
//     location.href = PAGES.login
// }
console.log(location)
const NameRegex = /^[\w ]{4,20}$/;
const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
function toggleShowPassword(toggler, elements) {
    toggler.addEventListener('change', e => {
        elements.forEach(element => {
            element.setAttribute('type', e.target.checked ? 'text' : 'password')
        })
    })
}


