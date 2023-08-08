import React, { useEffect, useState } from 'react';
import {BsYoutube} from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import InfoMovie from '../InfoMovie';

const ItemListContainer = ({inputSearch}  ) => {
    //prop que manda app.js
    //console.log(inputSearch);
const api_key = '63c12f5c58d68d15c0e1195e7b2efdf3';

const [data,setData] = useState([]) ; //Aca se pondrá la data -> array vacio, no null


const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

const location = useLocation();
const url = location.pathname;

const [mostrarTrailer,setMostrarTrailer] = useState(false);
const [movieSeleccionada,setMovieSeleccionada] = useState(null);

const [loading,setLoading] = useState(true);
/*
Vamos a trabajar con los trending(tendencias de cada uno)
https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=63c12f5c58d68d15c0e1195e7b2efdf3
*/

useEffect(() => {
    let fetchApi; //VARIABLE QUE CONTROLARA LA LLAMADA QUE SE HACE SEGUN LA URL

    if(url === '/') {
       fetchApi = 'all'
    }
    else if(url === '/movies') {
       fetchApi = 'movie'
    }
    else if(url === '/tvShows') {
       fetchApi = 'tv'
    }
    else if(url === '/people') {
       fetchApi = 'person'
    }
    //Concatenaremos la variable fetchApi dependiendo en que url estoy
    if(inputSearch.length === 0) {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/trending/${fetchApi}/week?language=en-US&api_key=${api_key}`)
    .then((data) => data.json())
    .then((data) => setData(data.results))
    .finally(() => setLoading(false));
    }
    else if(inputSearch.length > 0) {
        //Porque la url para buscar es otra
        const encodeInput = encodeURIComponent(inputSearch);
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeInput}&api_key=${api_key}`)
        .then((data) => data.json())
        .then((data) => setData(data.results))
        
    }


},[url,inputSearch]);

//Funcion para hacer la peticion de un solo objeto y mostrar el trailer de youtube
/*
Busqueda por id de la api 
https://api.themoviedb.org/3/movie/22?api_key=63c12f5c58d68d15c0e1195e7b2efdf3 -> para movies
trailer de una movie en particular http://api.themoviedb.org/3/movie/157336/videos?api_key=###
*/
const obtenerInfoMovie = async (id) => {
   fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`)
   .then((data) => data.json())
   .then((data) => setMovieSeleccionada(data))

   window.scrollTo(0,0)
   setMostrarTrailer(true);
}
const cerrarInfo = () => {
  setMostrarTrailer(false);
}

  return (
    <div className='p-3'>
    <div className='row'>
  { //la variable data ya tiene todo lo q necesito (data.results)

     data.length > 0 && data !== undefined ? data.map((infoMovie) => (
   
        <div className='col-xl-2 col-md-4 col-sm-6 mt-3' key={infoMovie.id}>
           <div style={{position:'relative'}}  className="card bg-dark bg-gradient p-2">
           <img src={
            infoMovie.poster_path ? `${URL_IMAGE + infoMovie.poster_path}`
            :
            /*OJO ACA, ESTABAMOS TENIENDO ERROR EN EL INPUT 
        SEARCH POR ESTO,TENGO QUE ASEGURARME QUE 
           KNOWN FOR SEA UN ARRAY */
             infoMovie.known_for && infoMovie.known_for.length > 0 &&
            `${URL_IMAGE + infoMovie.known_for[0].poster_path}`
        } 

            className="card-img-top img-fluid" alt="movieImagen" />
          <div className="card-body">
        <h5 className="card-title text-center text-light">{infoMovie.title ? infoMovie.title : infoMovie.name}</h5> {/*Para tvShows es .name por eso debo preguntar*/}
       </div>
        {/*Boton para reproducir trailer*/}
     <BsYoutube 
     style={{
      position:'absolute',
      top:'2%',
      left:'5%',
      fontSize:'30px',
      color:'white',
      backgroundColor:'black',
      padding:'0.3rem',
      borderRadius:'5px',
      cursor:'pointer'



     }}
     onClick={() => obtenerInfoMovie(infoMovie.id)}   /*Le mando el id de la pelicula seleccionada*/
     />
    </div>
    
    </div>
   
   ))
   :
  
   <p className='text-center fs-1 text-light'>
    No hay resultados
    </p>
 
   
   
    
  }
  {
    mostrarTrailer && <InfoMovie setMostrarTrailer = {setMostrarTrailer} mostrarTrailer = {mostrarTrailer} cerrarInfo = {cerrarInfo} movieSeleccionada = {movieSeleccionada} />
  }
</div>
</div>
  )
}

export default ItemListContainer