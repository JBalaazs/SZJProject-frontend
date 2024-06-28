import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Webshop from './pages/Webshop';
import BuyIt from './pages/BuyIt';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/registration' element={<Registration />} />
      <Route path='/webshop' element={<Webshop />} />
      <Route path='/buyit' element={<BuyIt />} />
      <Route path='/addproduct' element={<AddProduct />} />
    </Routes>
  );
}

export default App;
