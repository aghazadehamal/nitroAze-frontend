import React from 'react';
import Navbar from './navbar/Navbar';
import Home from './home/Home';
import InfoModal from './InfoModal/InfoModal';

const Container = () => {
  return (
    <div>
      <InfoModal /> 
      <Navbar />
      <Home />
    </div>
  );
};

export default Container;
