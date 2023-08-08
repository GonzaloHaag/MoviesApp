import React from 'react';
import ReactPlayer from 'react-player';

import {AiOutlineCloseCircle} from 'react-icons/ai';


const InfoMovie = ( { setMostrarTrailer , mostrarTrailer , cerrarInfo, movieSeleccionada } ) => {
    //Props que manda itemlistContainer
    //Aca mostraremos el trailer o el detalle de la pelicula

    if(mostrarTrailer === false || movieSeleccionada === null) {
        return null; //esto corta el flujo
    }
    console.log(movieSeleccionada); //Aca tengo toda la data de la pelicula seleccionada
    /*
    En movie seleccionada me llega una key, por lo que si hago 
    https://www.youtube.com/watch?v=2vIWii_Xnc8 --> Lo ultimo es la key del video,
    me lleva al trailer de esa pelicula
    */

    // const keyTrailer = movieSeleccionada.results[0].key;
    const keyTrailer = movieSeleccionada && movieSeleccionada.results[0] && movieSeleccionada.results[0].key && movieSeleccionada.results[0].key
    console.log(keyTrailer); //Esto me da la key del trailer que necesito para youtube

    const urlTrailer = `https://www.youtube.com/watch?v=${keyTrailer}`;


  return (
       /*Tengo que verificar que exista la info que quiero mostrar*/
       <div>
         <ReactPlayer 
          width='100%'
          height= '40vh'
        style={{
            position:'absolute',
            top:'10%',
            right:'0',


        }}
         controls //Para tener el boton de pausa
         url={urlTrailer}
      
          />
        {/*Boton para cerrar trailer*/}
         <AiOutlineCloseCircle
         style={{
            cursor:'pointer',
            fontSize:'20px',
            color:'white',
            position:'absolute',
            top:'10%',
            left:'50%'


         }}
         onClick={cerrarInfo}
          />
      </div>
    )
}

export default InfoMovie