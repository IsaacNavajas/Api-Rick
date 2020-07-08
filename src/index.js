import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import logo from "./images/logo.png";



class App extends React.Component {
  state = {
    loading: true,
    error: null,
    data: {
      info: {},
      results: []
    },
    nextPage: 1
  };

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${this.state.nextPage}`
      );
      const data = await response.json();

      this.setState({
        loading: false,
        data: {
          info: data.info,
          results: [].concat(this.state.data.results, data.results)
        },
        nextPage: this.state.nextPage + 1
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.error) {
      return "Error!";
    }

    return (
      <div className="container">
        <div className="App">
          <img className="Logo" src={logo} alt="Rick y Morty" />

          <ul className="row">
            {this.state.data.results.map(character => (

              <li className="col-6 col-md-3" key={character.id}>
                <div className="CharacterCard"
                  style={{ backgroundImage: `url(${character.image})` }}>
                    
                    <div style={{ textAlign: `center`, color:`white`, marginTop:`50%`}}>
                      {character.name}
                    </div>
                </div>
              </li>
            ))}
          </ul>

          {this.state.loading && <p className="text-center">
            <div class="spinner-border text-danger" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </p>}

          {!this.state.loading && this.state.data.info.next && (
            <button onClick={() => this.fetchCharacters()}>Load More</button>
          )}
        </div>
      </div>
    );
  }
}





ReactDOM.render(<App />, document.getElementById("root"));
