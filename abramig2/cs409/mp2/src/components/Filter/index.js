import { Component } from 'react';
import './styles.scss';

class Filter extends Component {
    constructor() {
        super();
        this.state = {listview: true,
                      inorder: true};
        this.listviewtrue = this.listviewtrue.bind(this);
        this.listviewfalse = this.listviewfalse.bind(this);
        this.filter = this.filter.bind(this);
        this.sortByName = this.sortByName.bind(this);
        this.sortByNumber = this.sortByNumber.bind(this);
        this.inordertrue = this.inordertrue.bind(this);
        this.inorderfalse = this.inorderfalse.bind(this);
      }

      async listviewtrue() {
        this.setState({listview: true});
        let allPokemonContainer = document.getElementById('poke-container');
        allPokemonContainer.style.textAlign = 'center';
        let allPokemonContainers = document.getElementsByClassName("pokemon");
        for(var c = 0; c < allPokemonContainers.length; c++) {
          allPokemonContainers[c].style.float = 'none';
          allPokemonContainers[c].style.justifyContent = 'center';
          allPokemonContainers[c].style.display = 'block';
        }
        document.getElementById('searchbar').value = ''; 
      }
    
      async listviewfalse() {
        this.setState({listview: false});
        let allPokemonContainer = document.getElementById('poke-container');
        allPokemonContainer.style.textAlign = 'center';
        let allPokemonContainers = document.getElementsByClassName("pokemon");
        for(var c = 0; c < allPokemonContainers.length; c++) {
          allPokemonContainers[c].style.float = 'left';
          allPokemonContainers[c].style.justifyContent = 'start';
        }
        document.getElementById('searchbar').value = '';
      }

      sortByNumber() {
        let allPokemonContainer = document.getElementById('poke-container');
        let pokemonContainers = document.getElementsByClassName("pokemon");
        var listitems = [];
        var i = 0;
        for (i = 0; i < pokemonContainers.length; i++) {
          listitems.push(pokemonContainers.item(i));
        }
        if (this.state.inorder) {
          listitems.sort(function(a, b) {
            var compA = parseInt((a.getElementsByTagName("p")[0].innerHTML).substring(1));
            var compB = parseInt((b.getElementsByTagName("p")[0].innerHTML).substring(1));
            return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
          });
        } else {
          listitems.sort(function(a, b) {
            var compA = parseInt((a.getElementsByTagName("p")[0].innerHTML).substring(1));
            var compB = parseInt((b.getElementsByTagName("p")[0].innerHTML).substring(1));
            return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
          });
        }
        for (i = 0; i < listitems.length; i++) {
          allPokemonContainer.appendChild(listitems[i]);
        }
      }

      sortByName() {
        let allPokemonContainer = document.getElementById('poke-container');
        let pokemonContainers = document.getElementsByClassName("pokemon");
        var listitems = [];
        var i = 0;
        for (i = 0; i < pokemonContainers.length; i++) {
          listitems.push(pokemonContainers.item(i));
        }
        if (this.state.inorder) {
          listitems.sort(function(a, b) {
            var compA = a.getAttribute('id').toUpperCase();
            var compB = b.getAttribute('id').toUpperCase();
            return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
          });
        } else {
          listitems.sort(function(a, b) {
            var compA = a.getAttribute('id').toUpperCase();
            var compB = b.getAttribute('id').toUpperCase();
            return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
          });
        }
        for (i = 0; i < listitems.length; i++) {
          allPokemonContainer.appendChild(listitems[i]);
        }
      }

      inordertrue() {
        if (this.state.inorder) {
          return;
        }
        this.setState({inorder: true});
    
        let allPokemonContainer = document.getElementById('poke-container');
        let pokemonContainers = document.getElementsByClassName("pokemon");
    
        var output = [];
        for(var i =pokemonContainers.length - 1; i >= 0;i--){
          output.push(pokemonContainers[i]);
        }
    
        allPokemonContainer.innerHTML = '';
        output.forEach(function(eachDiv){
            allPokemonContainer.appendChild(eachDiv);
        });
      }
    
      inorderfalse() {
        if (!this.state.inorder) {
          return;
        }
        this.setState({inorder: false});
        let allPokemonContainer = document.getElementById('poke-container');
        let pokemonContainers = document.getElementsByClassName("pokemon");
    
        var output = [];
        for(var i =pokemonContainers.length - 1; i >= 0;i--){
          output.push(pokemonContainers[i]);
        }
    
        allPokemonContainer.innerHTML = '';
        output.forEach(function(eachDiv){
            allPokemonContainer.appendChild(eachDiv);
        });
      }

      filter(type) {
        let allPokemonContainer = document.getElementsByClassName("pokemon");
        for(var c = 0; c < allPokemonContainer.length; c++) {
          if (allPokemonContainer[c].id.toLowerCase().includes(type.toLowerCase())) {
            allPokemonContainer[c].style.display = "block";
          } else {
            allPokemonContainer[c].style.display = "none";
          }
        }
      }

  render() {
    return (
        <div>
        View:
        <button onClick={this.listviewtrue} id="listButton"> List </button>  
        <button onClick={this.listviewfalse} id ="galleryButton"> Gallery </button>
        <br></br>
        Sort By:
        <button onClick={this.sortByNumber} id="NumberButton"> Number </button>  
        <button onClick={this.sortByName} id ="NameButton"> Name </button>
        <br></br>
        Order:
        <button onClick={this.inordertrue} id="ascendingButton"> A-Z </button>  
        <button onClick={this.inorderfalse} id ="descendingButton"> Z-A </button>
        <br></br>
        Filter:
        <button onClick={() => this.filter('Fire')} id="FireButton"> Fire </button>  
        <button onClick={() => this.filter('Grass')} id ="GrassButton"> Grass </button>
        <button onClick={() => this.filter('Water')} id ="WaterButton"> Water </button>
        <button onClick={() => this.filter('Poison')} id ="PoisonButton"> Poison </button>
        <button onClick={() => this.filter('Flying')} id ="FlyingButton"> Flying </button>
        <br></br>
        <button onClick={() => this.filter('Bug')} id ="BugButton"> Bug </button>
        <button onClick={() => this.filter('Normal')} id ="NormalButton"> Normal </button>
        <button onClick={() => this.filter('Electric')} id ="ElectricButton"> Electric </button>
        <button onClick={() => this.filter('Ground')} id ="GroundButton"> Ground </button>
        <button onClick={() => this.filter('Fairy')} id ="FairyButton"> Fairy </button>
        <button onClick={() => this.filter('Fighting')} id ="FightingButton"> Fighting </button>
        <br></br>
        <button onClick={() => this.filter('Rock')} id ="RockButton"> Rock </button>
        <button onClick={() => this.filter('Steel')} id ="SteelButton"> Steel </button>
        <button onClick={() => this.filter('Ice')} id ="IceButton"> Ice </button>
        <button onClick={() => this.filter('Ghost')} id ="GhostButton"> Ghost </button>
        <button onClick={() => this.filter('Dragon')} id ="DragonButton"> Dragon </button>
        </div>
    );
  }
}

export default Filter;