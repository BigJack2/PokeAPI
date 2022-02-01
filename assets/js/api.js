const API = " https://pokeapi.co/api/v2/pokemon?limit=50&offset=00";

const getAPI = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((datosJson) => {
      cardData(datosJson.results);
    })

    .catch((error) => {
      console.log("Error in the API", error);
    });
};



const cardData = (data) => {
  //inicializo un contador en cero
  let counter = 0;
  let html = "";


  data.forEach(() => {
    //Este contador servira para darle el id a la segunda api que corre dentro de este foreach de la funcion padre cardData
    counter = counter + 1;

    //capturamos la segunda api
    const pika = `https://pokeapi.co/api/v2/pokemon/${counter}`;


    //Creamos la funcion hijo de la segunda api
    const getAPI2 = (url2) => {
      return fetch(url2)
        .then((response) => response.json())
        .then(pokeJson => {

          //Creamos un objeto que podremos llamar despues
          const pokemon = {
            id: pokeJson.id,
            imagen: pokeJson.sprites.other.dream_world.front_default,
            nombre: pokeJson.name,
            altura: pokeJson.height,
            peso: pokeJson.weight,
          }
          pintarCard(pokemon);

        });
    };

    //Enviamos la url de la api a la funcion de flecha hijo
    getAPI2(pika);

    let pintarCard = (pokemon) => {

      html += `
      <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-4">
      <div class="card h-100">
      <img src="${pokemon.imagen}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">Altura: ${pokemon.altura}</h5>
      <h5 class="card-title">Peso: ${pokemon.peso}</h5>
      </div>
      <div class="card-footer">
      <small class="text-muted">${pokemon.nombre}</small>
      </div>
      </div>
      </div>
      `;

      document.getElementById("characters").innerHTML = html;
    }

  });

};


//Cuando se ejecuta se evnia la variable de la URL y la funcion la recibe
getAPI(API);