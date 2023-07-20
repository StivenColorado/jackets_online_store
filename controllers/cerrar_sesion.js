const btn_close_session = document.getElementById('opciones_left_cerrar_sesion')

btn_close_session.addEventListener('click', () =>{
    //realizar solicitud al archivo php
    fetch('./models/cerrar_sesion.php')
    .then(response =>{
        if(response.ok){
            alert('sesion cerrada')
            location.href = "./views/iniciar_sesion.html"
        }else{
            console.log('error al cerrar sesion')
        }
    })
    .catch(error =>{
        console.log('error: ', error)
    })
})