import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { ErrorPage } from './pages/Error/ErrorPage';
import Products from './pages/Products/Products';
import CrearProducto from './pages/CrearProducto/CrearProducto';
import Registro from './pages/Registro/Registro';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/products/:id' element={<Products />} />
          <Route path='/crear-producto' element={<CrearProducto />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;