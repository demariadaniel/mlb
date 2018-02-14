import React, { Component } from 'react';
import axios from 'axios';
import '../Style/App.css';

class DateSelector extends Component {
  constructor() {
    super();
    this.state = {
      day: 4,
      month: 9,
      monthName: new Date(2016, 9, 4)
        .toLocaleString('us', { month: 'short' }),
      year: 2016,
      date: new Date(2016, 9, 4)
        .toDateString()
    }
  }
  apiCall=()=>{
    let { day, month, year } = { ...this.state };
    this.props.apiCall(day, (month+1), year)
  }
  dateChange = (date, value) => {
    // Sets date value for day, month and year 
    // Uses Date constructor for validation
    value = value + this.state[date];
    let changeDate = {
      year: this.state.year,
      month: this.state.month,
      day: this.state.day
    };
    changeDate[date] = value;
    changeDate = new Date(changeDate.year,
      changeDate.month,
      changeDate.day)
    this.setState({
      day: changeDate.getDate(),
      month: changeDate.getMonth(),
      monthName: changeDate.toLocaleString('us', { month: 'short' }),
      year: changeDate.getFullYear(),
      date: changeDate.toDateString()
    })
  }
  render(){
    return(
      <div className="dates container">
          <h3>Pick a Date</h3>
          <h5>{this.state.date}</h5>
          <div className="col-3 date">
            <p>Day</p>
            <p>{this.state.day}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => this.dateChange('day', -5)}>
                &laquo;
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => this.dateChange('day', -1)}>
                &lsaquo;
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => this.dateChange('day', 1)}>
                &rsaquo;
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => this.dateChange('day', 5)}>
                &raquo;
            </button>
          </div>
          <div className="col-3 date">
            <p>Month</p>
            <p>{this.state.monthName}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => this.dateChange('month', -1)}>
                &lsaquo;
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => this.dateChange('month', 1)}>
                &rsaquo;
            </button>
          </div>
          <div className="col-3 date">
            <p>Year</p>
            <p>{this.state.year}</p>
            <button 
              className="btn btn-primary"
              onClick={() => this.dateChange('year', -1)}>
                &lsaquo;
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => this.dateChange('year', 1)}>
                &rsaquo;
            </button>
          </div>
        <button 
          className="btn btn-primary" 
          id="viewGames"
          onClick={this.apiCall}>
            View Games
        </button>
      </div>
    )
  }
}

export default DateSelector;