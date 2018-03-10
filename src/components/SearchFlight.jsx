import React, { Component } from 'react';
import InputSuggestions from './InputSuggestions.jsx'
import '../KiwiApp.css';


class SearchFlight extends Component {

    constructor(props) {
        super(props);
        this.state = {
            from: "",
            to: "",
            date: "",
            dateError: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.setInputValue = this.setInputValue.bind(this);
        this.setInputValueOnClick = this.setInputValueOnClick.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const dateIsSubmittedCorrectly = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/.test(this.state.date);
        if(dateIsSubmittedCorrectly) {
            this.setState({
                dateError: ''
            });
            this.props.onSubmitForm(this.state.from, this.state.to, this.state.date);
        } else {
            this.setState({
                dateError: <p style={ { color:'red'} } >Date must be formatted as shown in placeholder ex. 22/03/2018"</p>
            });
        }
    }

    setInputValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    setInputValueOnClick(e, name) {
        this.setState({
            [name]: e.target.innerHTML
        });
    }

    render() {
        const { hasError } = this.props;
        const { dateError } = this.state;
        const errorMessage = <p style={ { color:'red'} }>There are no searches that match your criteria</p>;
        return (
            <div className="row SearchFlight">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <form onSubmit={this.onSubmit} className="flight-form">
                        <div className="col-md-3">
                            <InputSuggestions title="Origin" name="from"
                                setValue={this.setInputValue}
                                inputState={this.state.from}
                                onClickInput={this.setInputValueOnClick}
                                placeholder="city" />
                        </div>
                        <div className="col-md-3">
                            <InputSuggestions title="Destination"
                                name="to"
                                setValue={this.setInputValue}
                                inputState={this.state.to}
                                onClickInput={this.setInputValueOnClick}
                                placeholder="city" />
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>Date to travel</label>
                                <input className="form-control"
                                    type="text"
                                    name="date"
                                    value={this.state.date}
                                    onChange={this.setInputValue}
                                    placeholder="ex. 22/02/2018"/>
                            </div>
                        </div>
                        <div className="col-md-3">
                        <button type="submit" className="btn btn-primary form-btn"> Search </button></div>
                    </form>  
                </div>
                { hasError ? errorMessage : '' }
                { dateError ? dateError : '' }
            </div>
        );
    }
}

export default SearchFlight;

