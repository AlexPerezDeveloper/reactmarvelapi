import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {

  
  constructor( props ) {
    super( props );	this.state = {
      query: '',
      loading: false,
      message: '',
      heroes: [],
      results: []
    };
    this.cancel = '';
  }
  fetchSearchResults = (updatedPageNo = '', query ) => {
    
	const searchUrl = `https://gateway.marvel.com/v1/public/characters?ts=thesoer&nameStartsWith=${query}&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b`;	

    fetch(searchUrl)
    .then(res => res.json())
    .then((data) => {
        this.setState({ results: data.data.results })
      })
      .catch(console.log)
    

};

  handleOnInputChange = (event) => {
    const query = event.target.value;	if ( ! query  ) {
      console.log("vacio!!");
      this.setState({ message: 'Escribe el nombre de otro Héroe de MARVEL.', query: '' })

    } else {
      this.setState({ query, loading: true, message: '' }, () => {
        this.fetchSearchResults(1, query);
      });
    }

  };

  render() {
    return (
      <div className="App">





        <div class="flex-container">
          <div class="row">
            <div class="flex-item">
              <input type="text" class="form-field" id="search-input" placeholder="Busca a tu héroe de Marvel" onChange={this.handleOnInputChange} />
              <button type="submit"> <i class="fa fa-search"></i> </button>
              <p class="infoMsg">{this.state.message}</p>

            </div>

          </div>
        </div>


        <div class="flex-column">
          <div class="columns">
            {this.state.results.map((result) => (
              <div class="flex-item hero animated fadeInUp delay-2s duration-5s">
                <div class="picHero" style={{backgroundImage: `url(${result.thumbnail.path}.${result.thumbnail.extension})`}}></div>
                <div class="descHero">
                  <h3>{result.name}</h3>
            <p>{result.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default App;