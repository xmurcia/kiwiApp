import React, { Component } from 'react';
import '../KiwiApp.css';
import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';

class InputSuggestions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            searchError: false
        };
        this.handleInput = this.handleInput.bind(this);
        this.selectCity = this.selectCity.bind(this);
        this.cleanAutoSuggestion = this.cleanAutoSuggestion.bind(this);
    }

    handleInput(e) {
        this.props.setValue(e);
        let { target: { value } } = e;
        const debounceFn = _.debounce(value => {
            this.autoSuggestion(value);

        }, 400);
        debounceFn(value);
    }

    autoSuggestion(value) {
        let apiUrl = `https://api.skypicker.com/locations/?term=${value}&v=2&locale=us-US`;

        axios.get(apiUrl).then(({ data: { locations } }) => {
            this.setState({
                searchError: false,
                locations
            });
        });
    }

    selectCity(e) {
        let name = this.textInput.getAttribute('name');
        this.props.onClickInput(e, name);
        this.cleanAutoSuggestion();
    }

    cleanAutoSuggestion() {
        setTimeout(() => {
            this.setState({ locations: [] });
        },300);
       
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.title} </label>
                <input className="form-control"
                    type="text"
                    name={this.props.name}
                    value={this.props.inputState}
                    placeholder={this.props.placeholder}
                    onChange={this.handleInput} 
                    onBlur={ this.cleanAutoSuggestion }/>
                    <div className="auto-complete">
                        <ul className="list-group suggestion-list">
                            {this.state.locations.map(
                                location => <li key={location.id}
                                    ref={(input) => { this.textInput = input; }}
                                    name={this.props.name}
                                    className="list-group-item"
                                    onClick={this.selectCity}>{location.name}</li>
                            ).slice(0,5)}
                        </ul>
                    </div>
            </div>
            );
    }
}

InputSuggestions.propTypes = {
    name: PropTypes.string,
    inputState: PropTypes.string
};

export default InputSuggestions;
