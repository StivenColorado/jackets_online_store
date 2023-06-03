// Obtén la lista de elementos <li> del menú
const menuItems = document.querySelectorAll('nav ul li');
// Agrega un evento de clic a cada elemento <li>
menuItems.forEach((item) => {
  item.addEventListener('click', function () {
    // Remueve la clase 'active' de todos los elementos <li>
    menuItems[0].classList.add('active');
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
    
    // Agrega la clase 'active' al elemento <li> clickeado
    this.classList.add('active');
  });
})
