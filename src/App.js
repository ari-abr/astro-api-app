import './App.css';
import React, { Component } from 'react';
import DisplayResults from './components/DisplayResults.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
    };
  }

  /**1) Gets url from a user input
   * 2) Makes a fetch call with that link to get JSON response
   * 3) Calls another function to find results in that response
   * 4) Stores that value inside "this.state.results" */
  async getResults(url) {
    this.setState({ results: null }, () =>
      console.log('null results :( ' + this.state.results)
    );
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        var myResult = this.findResultsArray(result);
        this.setState({ results: myResult }, () =>
          console.log(this.state.results)
        );
      })
      .catch((error) => {
        console.log('Error: ' + error);
        alert(
          'No results found. Check the URL and make sure that response is in JSON format or try again later.'
        );
        this.setState({ results: null }, () =>
          console.log('null results :( ' + this.state.results)
        );
      });
  }

  /**1) Inputs the JSON response returned from the "fetch" call
   * 2) Finds the results array
   * 3) Returns it back to the "getResults" function */
  findResultsArray(myObject) {
    var bigObject = myObject;
    //Two scenarios for a JSON response returned:
    //Scenario 1: response returned is already an array so we will use it
    if (Array.isArray(bigObject) === true) {
      return bigObject;
    }
    //Scenario 2: response returned is an object containing keys and values
    else if (typeof bigObject === 'object') {
      /* Now the response can either contain A) the results as keys and values of the object itself, or B) the results stored in an array of one of the values. 
      Assuming the result items are the the longest we can find the results the following way: 
    1) Count the number of properties the object has.
    2) Count the number of the longest array items the object has.
    3) Properties > array items, then the results are properties. If otherwise, the results is the longest array. */
      var propCount = 0;
      for (var property in bigObject) {
        propCount++;
      }
      var biggestArrayLength = 0;
      var biggestArray1 = [];
      for (var property1 in bigObject) {
        var thisArray1 = [];
        if (Array.isArray(bigObject[property1]) === true) {
          thisArray1 = bigObject[property1];
          if (thisArray1.length > biggestArray1.length) {
            biggestArray1 = thisArray1;
          }
        }
      }
      biggestArrayLength = biggestArray1.length;
      if (propCount > biggestArrayLength) {
        var myArray1 = [];
        myArray1[0] = bigObject;
        return myArray1;
      } else {
        var thisArray = [];
        var biggestArray = [];
        //if the thing is an object with keys convert it to array
        for (var property2 in bigObject) {
          if (Array.isArray(bigObject[property2]) === true) {
            thisArray = bigObject[property2];
            if (thisArray.length > biggestArray.length) {
              biggestArray = thisArray;
            }
          }
        }
        return biggestArray;
      }
    }
  }

  /*When a button is pressed next to one of the links, the text is copied to clipboard so then the user can paste it in the text input*/
  copyLinkText(el) {
    var textArea = document.getElementById(el);
    textArea.select();
    document.execCommand('copy');
  }

  render() {
    return (
      <div className="App">
        <div className="frame">
          <div className="description">
            <h1
              onLoad={() =>
                this.getResults(`https://astro-app-api.herokuapp.com/all`)
              }
            >
              Astronomy API
            </h1>
            <h4>Solar System Planets and Moons</h4>
            <p>
              Astronomy API includes data of planets and moons inside the Solar
              System. It also includes a few of the nearby stars and exoplanets
              (planets outside of the Solar System). The data consists primarily
              of physical characteristics such as mass and radius and motion
              characteristics such as orbital speed. The API call returns
              results in JSON format of objects in an array.
            </p>
            <p>
              API website:{' '}
              <a href="https://astro-app-api.herokuapp.com/">
                https://astro-app-api.herokuapp.com
              </a>
            </p>
            <h4>API Endpoints</h4>
            <table className="table-1">
              <tbody>
                <tr key={Math.random()}>
                  <td key={Math.random()}>
                    <p>/all</p>
                  </td>
                  <td key={Math.random()}>
                    <p>
                      All objects including Solar System planets and moons,
                      exoplanets, nearby stars, and their data
                    </p>
                  </td>
                </tr>
                <tr key={Math.random()}>
                  <td key={Math.random()}>
                    <p>/planets</p>
                  </td>
                  <td key={Math.random()}>
                    <p>
                      Planets in the Solar System and their data including mass,
                      radius, temperature, and semimajor axis
                    </p>
                  </td>
                </tr>
                <tr key={Math.random()}>
                  <td key={Math.random()}>
                    <p>/moons</p>
                  </td>
                  <td key={Math.random()}>
                    <p>
                      Moons in the Solar System, the planets that they orbit,
                      and other data including semi-major axis, eccentricity,
                      orbital period, radius, and average orbital speed
                    </p>
                  </td>
                </tr>
                <tr key={Math.random()}>
                  <td key={Math.random()}>
                    <p>/exoplanets</p>
                  </td>
                  <td key={Math.random()}>
                    <p>
                      Closest planets outside of the Solar System, their host
                      star, and other data including mass, radius, temperature,
                      and semi-major axis
                    </p>
                  </td>
                </tr>
                <tr key={Math.random()}>
                  <td key={Math.random()}>
                    <p>/stars</p>
                  </td>
                  <td key={Math.random()}>
                    <p>
                      Closest stars outside of the Solar System, constellation
                      they are in, and other data including ascension and
                      declination, apparent magnitude, spectral type, and mass
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <h4>Data Table</h4>
            <p>
              Try the links below to view the API data in a table. Users can
              search and sort the data table as well as download the table in
              plain text or CSV format. Please wait a few seconds for the
              results to load.
            </p>
            <h4>Try these requests:</h4>
            <ol>
              <li>
                <textarea
                  cols="50"
                  rows="2"
                  readOnly
                  value="https://astro-app-api.herokuapp.com/all"
                  id="link1"
                ></textarea>
                <button
                  onClick={() =>
                    this.getResults(
                      `https://astro-app-api.herokuapp.com/all`
                    )
                  }
                >
                  <i className="fas fa-search"></i>
                </button>
              </li>
              <li>
                <textarea
                  cols="50"
                  rows="2"
                  readOnly
                  value="https://astro-app-api.herokuapp.com/planets"
                  id="link2"
                ></textarea>
                <button
                  onClick={() =>
                    this.getResults(
                      `https://astro-app-api.herokuapp.com/planets`
                    )
                  }
                >
                  <i className="fas fa-search"></i>
                </button>
              </li>
              <li>
                <textarea
                  cols="50"
                  rows="2"
                  readOnly
                  value="https://astro-app-api.herokuapp.com/moons"
                  id="link3"
                ></textarea>
                <button
                  onClick={() =>
                    this.getResults(
                      `https://astro-app-api.herokuapp.com/moons`
                    )
                  }
                >
                  <i className="fas fa-search"></i>
                </button>
              </li>
              <li>
                <textarea
                  cols="50"
                  rows="2"
                  readOnly
                  value="https://astro-app-api.herokuapp.com/exoplanets"
                  id="link4"
                ></textarea>
                <button
                  onClick={() =>
                    this.getResults(
                      `https://astro-app-api.herokuapp.com/exoplanets`
                    )
                  }
                >
                  <i className="fas fa-search"></i>
                </button>
              </li>
              <li>
                <textarea
                  cols="50"
                  rows="2"
                  readOnly
                  value="https://astro-app-api.herokuapp.com/stars"
                  id="link5"
                ></textarea>
                <button
                  onClick={() =>
                    this.getResults(
                      `https://astro-app-api.herokuapp.com/stars`
                    )
                  }
                >
                  <i className="fas fa-search"></i>
                </button>
              </li>
            </ol>
          </div>
          <h4>Results:</h4>
          <div className="results">
            {this.state.results !== null ? (
              <DisplayResults
                results={this.state.results}
                originalResults={this.state.results}
              ></DisplayResults>
            ) : (
              <p>No results. Try one of the requests above.</p>
            )}
          </div>
          <footer>
            <hr></hr>
            <p>
              <i className="fab fa-github"></i> GitHub:{' '}
              <a href="https://github.com/ari-abr/astro-api-app1">
                https://github.com/ari-abr/astro-api-app1
              </a>
            </p>
            <p>
              Made with{' '}
              <a href="https://reactjs.org/">
                React.js<i className="fab fa-react"></i>
              </a>
            </p>
            <p>By A. A.</p>
          </footer>
        </div>
      </div>
    );
  }
}
export default App;
/*Main Algorithm:
1) Get the results object/array
2) Find the array or convert it to an array
3) Pass it to the DisplayResults.js
*/
