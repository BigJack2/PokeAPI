const API = "https://pokeapi.co/api/v2/pokemon?offset=00&limit=8";

const getAPI = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((datosJson) => {
      cardData(datosJson.results), pagination(datosJson);
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
      <img src="${pokemon.imagen}" class="card-img-top pokemon">
      <div class="card-body">
      <h5 class="card-title "><strong>Altura: </strong><p class="text-dark">${pokemon.altura}</p></h5>
      <h5 class="card-title "><strong>Peso: </strong><p class="text-dark">${pokemon.peso}</p></h5>
      </div>
      <div class="bg-secondary card-footer">
      <h4 class="text-gray text-center"><a href="" class="text-link">${pokemon.nombre}</a></h4>
      </div>
      </div>
      </div>
      `;

      document.getElementById("characters").innerHTML = html;
    }

  });

};



//Paginacion de pokemons
const pagination = (info) => {

  let html = "";

  html += `<li class="page-item ${info.previous == null ? "disabled" : ""}"><a class="btn btn-primary" onclick="getAPI('${info.previous}')"><strong>Prev</strong></a></li>`;
  html += `<li class="page-item ${info.next == null ? "disabled" : ""}"><a class="btn btn-primary" onclick="getAPI('${info.next}')"><strong>Next</strong></a></li>`;

  document.getElementById("pagination").innerHTML = html;
}


//Cuando se ejecuta se evnia la variable de la URL y la funcion la recibe
getAPI(API);