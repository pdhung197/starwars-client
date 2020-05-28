import React from 'react';
import MainLayout from './containers/Layout/MainLayout';

function App() {
  return (
    <>
      <MainLayout />
      <div id="star-bg">
        <div id="star-small"></div>
        <div id="star-medium"></div>
        <div id="star-big"></div>
      </div>
    </>
  );
}

export default App;
