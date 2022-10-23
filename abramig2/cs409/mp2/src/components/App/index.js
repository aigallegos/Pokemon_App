import axios from 'axios';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './styles.scss';

import Header from '../Header';
import Search from '../Search';
import Filter from '../Filter';

const config = {
  method: 'get',
  url: 'https://pokeapi.co/api/v2/pokemon?limit=151',
  json: true,
  headers: {
    'Content-Type': 'application/json'
  }
}

let onlyonce = false;



class App extends Component {
  constructor() {
    super();
    this.state = {listview: true,
                  inorder: true};
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.createPokeImage = this.createPokeImage.bind(this);
    this.createTypes = this.createTypes.bind(this);
    this.createAbilities = this.createAbilities.bind(this);
    this.renderPokemon = this.renderPokemon.bind(this);
    this.fetchPokemonData = this.fetchPokemonData.bind(this);
    this.fetchKantoPokemon = this.fetchKantoPokemon.bind(this);
    this.renderEverything = this.renderEverything.bind(this);
    this.reset = this.reset.bind(this);
    this.detailsclick = this.detailsclick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getprevPokeDetails = this.getprevPokeDetails.bind(this);
    this.getnextPokeDetails = this.getnextPokeDetails.bind(this);
    this.struct();
  }

  async struct() {
    if(onlyonce) return;
    onlyonce = true;
    await this.renderEverything();
  }

  handleSearchChange(event) {
    const { value } = event.target;
    let allPokemonContainer = document.getElementsByClassName("pokemon");
    for(var c = 0; c < allPokemonContainer.length; c++) {
      if (allPokemonContainer[c].id.toLowerCase().includes(value.toLowerCase())) {
        allPokemonContainer[c].style.display = "block";
      } else {
        allPokemonContainer[c].style.display = "none";
      }
    }
  }

  createPokeImage(pokeData, containerDiv) {
    let pokeImgContainer = document.createElement('div');
    pokeImgContainer.classList.add("image");
    let pokeImage = document.createElement('img');
    pokeImage.srcset = `${pokeData.sprites.front_default}`;
    pokeImage.onclick = () => {
      this.detailsclick(pokeData);

    };
    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
  }

  createTypes(types, ul) {
    let typeLi = document.createElement('li');
    typeLi.innerText = "Types:";
    ul.append(typeLi);
    types.forEach(function(type){
        let typeLi = document.createElement('li');
        typeLi.innerText = (type['type']['name']).toUpperCase();
        ul.append(typeLi);
    });
  }

  createAbilities(abilities, ul) {
    let abilityLi = document.createElement('li');
    abilityLi.innerText = "Abilities:";
    ul.append(abilityLi);
    abilities.forEach(function(ability){
        let typeLi = document.createElement('li');
        typeLi.innerText = (ability['ability']['name']).toUpperCase();
        ul.append(typeLi);
    });
  }

  async renderPokemon(pokeData) {
    let allPokemonContainer = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div");
    pokeContainer.id = `${pokeData.name}` + `${pokeData.id}`;
    pokeData.types.forEach(function(type){
      pokeContainer.id += type['type']['name'];
    });
    pokeContainer.classList.add('pokemon', 'ui', 'card');
    pokeContainer.classList.add(`${pokeData.name}`);
    this.createPokeImage(pokeData, pokeContainer);
    let pokeName = document.createElement('h4');
    pokeName.innerText = (pokeData.name).toUpperCase();
    let pokeNumber = document.createElement('p');
    pokeNumber.innerText = `#${pokeData.id}`;
    let pokeTypes = document.createElement('ul');
    this.createTypes(pokeData.types, pokeTypes); 
    pokeContainer.append(pokeName, pokeNumber, pokeTypes);
    pokeContainer.style.height = "164px";
    pokeContainer.style.margin = "5px";
    allPokemonContainer.appendChild(pokeContainer);
  } 

  async fetchPokemonData(poker){
    let url = await poker.url;
    await axios.get(url)
    .then(response => response.data)
    .then((pokeData) => {
      this.renderPokemon(pokeData)
    });
  }

  async fetchKantoPokemon() {
    await axios(config)
    .then(response => response.data)
    .then(respons => respons.results)
    .then((respon) => {
        respon.forEach(poke => {
          this.fetchPokemonData(poke);
        })
    })
  }

  async renderEverything(){
    await this.fetchKantoPokemon();
    let allPokemonContainerz = document.getElementById('poke-container');
    allPokemonContainerz.style.textAlign = 'center';
    let allPokemonContainers = document.getElementsByClassName("pokemon");
    for(var c = 0; c < allPokemonContainers.length; c++) {
      allPokemonContainers[c].style.float = 'none';
      allPokemonContainers[c].style.justifyContent = 'center';
      allPokemonContainers[c].style.display = 'block';
    }
  }

  reset() {
    this.setState({listview: true});
    this.setState({inorder: true});
    let allPokemonContainer = document.querySelector('#poke-container')
    allPokemonContainer.innerText = ""
    this.renderEverything();
  }

  detailsclick(pokeData) {

    console.log(pokeData);
    var modal = document.getElementById("myModal");
    modal.style.display = "flex";

    let allPokemonContainer = document.getElementsByClassName('modal-content')[0];
    allPokemonContainer.id = `${pokeData.name}`;
    let pokeContainer = document.createElement("div");
    pokeContainer.id = `${pokeData.name}` + " " + `${pokeData.id}`;
    pokeData.types.forEach(function(type){
      pokeContainer.id += " " + type['type']['name'];
    });
    pokeContainer.classList.add('pokemon', 'ui', 'card');

    let pokeImgContainer = document.createElement('div');
    pokeImgContainer.classList.add('image');
    let pokeImage = document.createElement('img');
    pokeImage.srcset = `${pokeData.sprites.front_default}`;
    pokeImage.style.height = '300px';
    pokeImgContainer.append(pokeImage);
    pokeImgContainer.style.float = "left";
    pokeImgContainer.style.verticalAlign = "middle";
    pokeImgContainer.style.margin = "20px";
    pokeContainer.append(pokeImgContainer);

    let rightContainer = document.createElement("div");
    let pokeName = document.createElement('h4');
    pokeName.innerText = (pokeData.name).toUpperCase();
    let pokeNumber = document.createElement('p');
    pokeNumber.innerText = `#${pokeData.id}`;
    let pokeTypes = document.createElement('ul');
    this.createTypes(pokeData.types, pokeTypes); 
    pokeTypes.style.margin = "10px";
    pokeTypes.style.float = "right";
    let pokeAbilities = document.createElement('ul');
    this.createAbilities(pokeData.abilities, pokeAbilities);
    pokeAbilities.style.margin = "10px";
    pokeTypes.style.float = "right";
    rightContainer.append(pokeName, pokeNumber);
    rightContainer.style.float = "left";
    rightContainer.style.verticalAlign = "middle";
    rightContainer.style.margin = "120px";
    pokeContainer.append(rightContainer, pokeTypes, pokeAbilities);
    pokeContainer.style.verticalAlign = "middle";
    pokeContainer.style.height = "400px";
    pokeContainer.style.display = "flex";
    pokeContainer.style.alignItems = "center";
    allPokemonContainer.appendChild(pokeContainer);
  }

  closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    var content = document.getElementsByClassName('modal-content')[0];
    content.innerHTML = "";
    let spany = document.createElement("span");
    spany.onclick = this.closeModal;
    spany.className = "close"
    spany.innerHTML = `${'&times;'}`;
    content.appendChild(spany);
  }

  getprevPokeDetails() {
    let allPokemonContainer = document.getElementById('poke-container');
    let currentPokemonModal = document.getElementsByClassName('modal-content')[0];
    let currentPokemoncontainer = allPokemonContainer.getElementsByClassName(currentPokemonModal.id)[0];
    let prevPokemon = currentPokemoncontainer.previousElementSibling;
    if (prevPokemon == null) {
      return;
    }
    while (prevPokemon.style.display == "none") {
      prevPokemon = prevPokemon.previousElementSibling;
      if (prevPokemon == null) {
        return;
      }
    }
    currentPokemonModal.id = "";
    let prevPokemonimg = prevPokemon.getElementsByTagName('img')[0];
    this.closeModal();
    prevPokemonimg.click();
  }

  getnextPokeDetails() {
    let allPokemonContainer = document.getElementById('poke-container');
    let currentPokemonModal = document.getElementsByClassName('modal-content')[0];
    let currentPokemoncontainer = allPokemonContainer.getElementsByClassName(currentPokemonModal.id)[0];
    let nextPokemon = currentPokemoncontainer.nextElementSibling;
    if (nextPokemon == null) {
      return;
    }
    while (nextPokemon.style.display == "none") {
      nextPokemon = nextPokemon.nextElementSibling;
      if (nextPokemon == null) {
        return;
      }
    }
    currentPokemonModal.id = "";
    let nextPokemonimg = nextPokemon.getElementsByTagName('img')[0];
    this.closeModal();
    nextPokemonimg.click();
  }

  render() {
    return (
      <div className="App">
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'></link>
        <Header />
        <Search onChange={this.handleSearchChange}/>
        <div>
          <Router>
            <div>
              <Link to="/filter">FILTER</Link>
              <Routes>
                <Route path="/filter" element={<Filter/>}> 
                </Route>
              </Routes>
            </div>
          </Router>

          <div id="container">
            <div id="poke-container" className="ui cards">
            </div>
          </div>

          <div id="myModal" className="modal">
            <button onClick ={this.getprevPokeDetails} id="leftbutton"> <i class='fa fa-long-arrow-left'></i> </button>
            <div className="modal-content" id="">
              <span onClick={this.closeModal} className="close">&times;</span>

            </div>
            <button onClick={this.getnextPokeDetails} id="rightbutton"> <i class='fa fa-long-arrow-right'></i> </button>
          </div>  

        </div>
      </div>
    );
  }
}

export default App;