const body = document.querySelector('html')

document.querySelector("#theme-switcher").addEventListener('click', function() {
    if (document.querySelector("#theme-switcher").checked) {
        body.classList.add('mode-dark')
    } else {
        body.classList.remove('mode-dark')
    }
})