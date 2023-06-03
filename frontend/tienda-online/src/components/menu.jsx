import { React } from 'react'
import '../styles/nav.css'
import '../js/animaciones.js';

const Menu = () => {
    return (
        <nav>
            <div className="logo"></div>
            <ul>
                <li>Home</li>
                <li>Products</li>
                <li>Popular</li>
                <li>cards</li>
            </ul>
        </nav>
    );
    
}
export default Menu;
