import React, { Component } from 'react';
import '../KiwiApp.css';
import 'react-table/react-table.css';
import moment from 'moment';
import ReactTable from 'react-table'
import { columns } from '../configuration/table/tableColumns';


class FlightResult extends Component {
 
    render() {    
        if (!this.props.flights.length > 0) {
            const emptyListMessage = this.props.isEmpty ? 
                                    <div> Your search doesn't match with criteria </div> : 
                                    <div> Insert data to search flights </div>

            return emptyListMessage;
        } else {
            const  flights = this.props.flights.map( flight => {
                return {
                    from: flight.cityFrom,
                    to: flight.cityTo,
                    date: moment.unix(flight.dTime).format("DD/MM/YYYY - HH:mm"),
                    price: flight.price            }
            });

            return (    
                <div>
                    <ReactTable
                        data={flights}
                        columns={columns}
                        defaultPageSize={5}
                    />
                </div>
            );
        }
        
    }
}

export default FlightResult;

