import axios from 'axios';

const submitForm = (formData) => {
  axios.post('http://localhost:8081/jackets_online_store/backend/mensajito.php', formData)
    .then(response => {
      // Manejar la respuesta del servidor PHP si es necesario
      console.log(response);
      alert(response.data)
    })
    .catch(error => {
      // Manejar cualquier error que ocurra durante la comunicación con el servidor PHP
      console.error(error);
    });
};

export default submitForm;
// Luego, en tu componente de React, cuando se envíe el formulario, puedes llamar a la función `submitForm` pasando los datos del formulario.
