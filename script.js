document.addEventListener("DOMContentLoaded", () => {
  fetchPokemonlist();
});

async function fetchPokemon(url) {
  apicall(url).then((response) => {
    fillpokemon(response);
  });
  }
var pre_offset = 0,
  next_offset = 40;
function fetchPokemonlist(limit = 10, offset = 0, pre = false, next = false) {
  if (pre) {
    console;
    offset = pre_offset;
  }
  if (next) {
    offset = next_offset;
  }
  let url =
    "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset;
  // url = url != 0 ? url : url1;
  apicall(url).then((response) => {
    console.log(response);
    document.getElementById("pokemons").innerHTML = "";
    if (response.next) {
      let paramString = response.next.split("?")[1];
      let queryString = new URLSearchParams(paramString);
      for (let pair of queryString.entries()) {
        if (pair[0] == "offset") {
          next_offset = pair[1];
        }
      }
    }
    if (response.previous) {
      let paramString = response.previous.split("?")[1];
      let queryString = new URLSearchParams(paramString);

      for (let pair of queryString.entries()) {
        if (pair[0] == "offset") {
          pre_offset = pair[1];
        }
      }
    }
    response.results.forEach((element) => {
      fetchPokemon(element.url);
    });
  });
}
async function apicall(url) {
  let result = await fetch(url);
  // console.log(result);
  return await result.json();
}
function fillpokemon(response) {
  const node = document.createElement("tr");
  // node.className = "grid-item";
  const namenode=document.createElement("td");
  namenode.innerHTML=response.name;

  const idnode=document.createElement("td");
idnode.innerHTML=response.id;

  const weightnode=document.createElement("td");
  weightnode.innerHTML=response.weight;


  
 const breaknode=document.createElement("div");




const mv_node = document.createTextNode('Moves:');
const mv_breaknode=document.createElement("div");
mv_breaknode.appendChild(mv_node); 

const ability_node=document.createElement("td");
let ab_text="";
response.abilities.forEach(element => {
  ab_text+=element.ability.name;
  
});
ability_node.innerHTML=ab_text;

const move_node=document.createElement("td");
let move_text="";
response.moves.forEach(element => {
  move_text+=element.move.name+',';
 });
move_node.innerHTML=move_text;

  node.appendChild(idnode);
  node.appendChild(namenode);
  node.appendChild(weightnode);
  node.appendChild(ability_node);
  node.appendChild(move_node);
  document.getElementById("pokemons").appendChild(node);
}
