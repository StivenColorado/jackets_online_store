const options = document.querySelectorAll('.options')
options[0].addEventListener('click', () => linkOptions("../index.html"))
if (options[1] && options[2]) {
    options[1].addEventListener('click', () => linkOptions("./views/registrarse.html"))
    options[2].addEventListener('click', () => linkOptions("./views/iniciar_sesion.html"))
}

const linkOptions = (url) => {
    location.href = url;
}