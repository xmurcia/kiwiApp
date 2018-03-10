import React, { Component } from 'react';
import axios from "axios";
import './KiwiApp.css';
import SearchFlight from "./components/SearchFlight.jsx";
import FlightResult from "./components/FlightResult.jsx";


class KiwiApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: [],
      hasError: false
    };
  }

  searchSubmit(from, to, date) {
    let apiUrl = `https://api.skypicker.com/flights?flyFrom=${from}&to=${to}&dateFrom=${date}`;

    axios.get(apiUrl).then(({ data: { data } }) => {
      const flightListLenght = data.length === 0 ? true : false;
      this.setState({
        hasError: false,
        flights: data,
        flightListLenght
      });
    }, error => {
      this.setState({
        hasError: true
      });
    });
  }


  render() {
    const { flights } = this.state;
    return (
      <div className="container KiwiApp">
        <SearchFlight onSubmitForm={this.searchSubmit.bind(this)}
          hasError={this.state.hasError}
           />
        <FlightResult flights={flights} 
          isEmpty={this.state.flightListLenght}/>
      </div>
    );
  }
}

export default KiwiApp;
