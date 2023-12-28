const [form] = document.forms
const { email, password, showPassword, rememberMe, submit } = form
const [emailErrorMessage, passwordErrorMessage] = document.querySelectorAll('.error-message')

// Check if remember me checked
let user = JSON.parse(localStorage.getItem('savedUser'))

if (user != null) {
    email.value = user.email
    password.value = user.password
    rememberMe.checked = true
    submit.disabled = false
}

// Events
form.addEventListener('submit', e => {
    e.preventDefault()
    if (rememberMe.checked) {
        localStorage.setItem('savedUser', JSON.stringify(user))
    } else {
        localStorage.removeItem('savedUser')
    }

    localStorage.setItem('currentUser', JSON.stringify(user))
    location.href = PAGES.home[0]
})

email.addEventListener('input', handleInput)
password.addEventListener('input', handleInput)

toggleShowPassword(showPassword, [password])

// Validation
const isEmailExists = email => users.find(user => user.email === email.toLowerCase())
const isPasswordMatch = (password, matchPassword) => password === matchPassword
function validation(email, password) {
    user = isEmailExists(email)
    if (user) {
        return isPasswordMatch(password, user.password)
    }
    return false
}

function handleInput(e) {
    const { name } = e.target

    getElement(name, e)

    submit.disabled = !validation(email.value, password.value)
}

function getElement(name, e) {
    return {
        email(e) {
            e.target.classList.toggle('border-danger', !isEmailExists(e.target.value))
            e.target.classList.toggle('border-3', !isEmailExists(e.target.value))
            emailErrorMessage.textContent = !isEmailExists(e.target.value) ? 'Email is not exist' : null
        },
        password(e) {
            if (user) {
                e.target.classList.toggle('border-danger', !isPasswordMatch(e.target.value, user.password))
                e.target.classList.toggle('border-3', !isPasswordMatch(e.target.value, user.password))
                passwordErrorMessage.textContent = !isPasswordMatch(e.target.value, user.password) ? 'Incorrect Password' : null
            }
        }
    }[name](e)
}