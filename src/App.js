
import './App.css';



import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/navbar/Navbar';
import ItemListContainer from './componentes/itemlistcontainer/ItemListContainer';
import {useState } from 'react';

function App() {

  const [inputSearch,setInputSearch] = useState(''); //Ira al navbar,navbar le da valor y se lo envio al itemListContainer
  //console.log(inputSearch); //Tiene el valor que se le da en el navbar

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar setInputSearch = {setInputSearch} />
      <Routes>
        <Route path='/' element={<ItemListContainer inputSearch = {inputSearch}  setInputSearch = {setInputSearch} />} />
        <Route path='/movies' element = {<ItemListContainer inputSearch = {inputSearch}  />} />
        <Route path='/tvShows' element = {<ItemListContainer inputSearch = {inputSearch}  />} />
        <Route path='/people' element = {<ItemListContainer inputSearch = {inputSearch}  />} />
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
