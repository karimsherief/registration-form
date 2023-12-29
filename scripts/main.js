const PAGES = {
    home: '/',
    login: '/login.html',
    signup: '/register.html'
}

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let users = JSON.parse(localStorage.getItem('users')) || []
let pathname = location.pathname.slice(location.pathname.lastIndexOf('/'))
let host = location.href.slice(0, location.href.lastIndexOf('/'))

if (currentUser && (pathname === PAGES.login || pathname === PAGES.signup)) {
    location.replace(host + PAGES.home)
}

if (currentUser == null && pathname !== PAGES.login && pathname !== PAGES.signup) {
    location.replace(host + PAGES.login)
}

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


