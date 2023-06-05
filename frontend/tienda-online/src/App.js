import './styles/app.css'
import './styles/animations.css'
import Menu from './components/menu'
import Slider from './components/slider'
import Buscador from './components/buscador'
function App() {
  return (
    <div className="App">
      <Menu></Menu>
      <Slider />
      <Buscador/>
    </div>
  );
}
export default App;
