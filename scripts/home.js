const userName = document.querySelector('.user-name');
const logoutBtn = document.querySelector('.logout');

document.title += ` | ${currentUser.name}`
userName.innerHTML = currentUser.name

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser')
    location.reload()
})