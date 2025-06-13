import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import MapChart from './components/mapchart';

function App() {
  return (
     <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1">
        <MapChart />
      </main>
    </div>
  );
}

export default App;
