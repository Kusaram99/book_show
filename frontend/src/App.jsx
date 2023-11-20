import React from 'react';
import Nav from './components/nav/Nav'
import Carousel from './components/carousel/Carousel';
import BookNow from './components/bookshow/Bookmyshow';
import Login from './components/login-signup/Login'
import { Routes, Route } from 'react-router-dom';
import Signup from './components/login-signup/Signup';
import MyContextProvider from './components/usecontext/Mycontext';
import Alert from './components/alert/Alert';
import Private from './components/private/Private';


function App() {
  return (
    <MyContextProvider>
      <Nav />
      <Alert />
      <Routes>
        <Route element={<Private />}>
          <Route path='/booknow' element={<BookNow />} />
        </Route>
        <Route path='/' element={<Carousel />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </MyContextProvider>
  );
}

export default App;
