const [form] = document.forms
const { userName, email, password, confirmPassword, showPassword, submit } = form
const [
    userNameErrorMessage,
    emailErrorMessage,
    passwordErrorMessage,
    confirmPasswordErrorMessage
] = document.querySelectorAll('.error-message')

// Events
form.addEventListener('submit', e => {
    e.preventDefault()
    const { userName, email, password } = e.target
    let newUser = {
        name: userName.value,
        email: email.value.toLowerCase(),
        password: password.value
    }
    clearInputs()
    localStorage.setItem('users', JSON.stringify([...users, newUser]))
    localStorage.removeItem('savedUser')
    location.replace(host + PAGES.login)
})

userName.addEventListener('input', handleInput)
email.addEventListener('input', handleInput)
password.addEventListener('input', handleInput)
confirmPassword.addEventListener('input', handleInput)

toggleShowPassword(showPassword, [password, confirmPassword])

// Validation
const isUserNameValid = userName => NameRegex.test(userName)
const isEmailExists = email => Boolean(users.find(user => user.email === email.toLowerCase()))
const isEmailValid = email => EmailRegex.test(email)
const isPasswordValid = password => PasswordRegex.test(password)
const isPasswordMatch = (password, confirmPassword) => password === confirmPassword
const validation = (userName, email, password, confirmPassword) => (
    isUserNameValid(userName) &&
    isEmailValid(email) &&
    !isEmailExists(email) &&
    isPasswordValid(password) &&
    isPasswordMatch(password, confirmPassword)
)
function handleInput(e) {
    const { name } = e.target

    getElement(name, e)

    submit.disabled = !validation(userName.value, email.value, password.value, confirmPassword.value)
}

function getElement(name, e) {
    return {
        userName(e) {
            e.target.classList.toggle('border-danger', !isUserNameValid(e.target.value))
            e.target.classList.toggle('border-3', !isUserNameValid(e.target.value))
            userNameErrorMessage.textContent = isUserNameValid(e.target.value) ? null : 'Name must be at least 4 to 20 characters and contain only alphabet, number, underscore and white space'
        },
        email(e) {
            e.target.classList.toggle('border-danger', !isEmailValid(e.target.value) || isEmailExists(e.target.value))
            e.target.classList.toggle('border-3', !isEmailValid(e.target.value) || isEmailExists(e.target.value))
            emailErrorMessage.textContent = !isEmailValid(e.target.value) ? 'Enter a valid email' : isEmailExists(e.target.value) ? 'Email already exists' : null
        },
        password(e) {
            e.target.classList.toggle('border-danger', !isPasswordValid(e.target.value))
            e.target.classList.toggle('border-3', !isPasswordValid(e.target.value))
            passwordErrorMessage.textContent = isPasswordValid(e.target.value) ? null : 'Password must be at least 8 characters and contain 1 capital letter and 1 symbol or number'
        },
        confirmPassword(e) {
            e.target.classList.toggle('border-danger', !isPasswordMatch(password.value, e.target.value))
            e.target.classList.toggle('border-3', !isPasswordMatch(password.value, e.target.value))
            confirmPasswordErrorMessage.textContent = isPasswordMatch(password.value, e.target.value) ? null : 'Password does not match'
        }
    }[name](e)
}

function clearInputs() {
    userName.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    showPassword.checked = false
}