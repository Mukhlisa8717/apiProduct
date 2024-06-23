import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import CreateProduct from './pages/create-product/CreateProduct';
import User from './pages/user/User';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import SinglePage from './pages/single-page/SinglePage';

function App() {

  return (
    <>
      <h2>App</h2>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<User />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/products/:productId" element={<SinglePage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App
