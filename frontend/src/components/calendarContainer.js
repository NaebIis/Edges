import React from "react";
import { connect } from "react-redux";
import dateFns from "date-fns";
import Event from "./event";
import { addEventForm } from "../actions/addEventForm";
import { postEvent } from "../actions/postEvent";

const mapStateToProps = state => {
  return {
    init: state.init_state.events,
    addEvent: state.addEventForm.addEventForm,
    onPostEvent: state.init_state.postEvent
  };
};

const mapDispatchToProps = {
  onAddEvent: addEventForm,
  postEvent: postEvent
};

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() =>
              this.onDateClick(dateFns.parse(cloneDay), this.props.onAddEvent())
            }
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            <div className="con">
              <br />
              <br />
              {this.props.init.map(event => {
                return <Event day={day} key={event.id} event={event} />;
              })}
            </div>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  onSubmitHandler = (event, day) => {
    let temp = event.target.parentElement.children[0];
    let obj = {
      name: temp.children[0].value,
      time: temp.children[2].value,
      address: temp.children[4].value,
      date: day
    };
    this.props.postEvent(obj);
  };

  render() {
    return (
      <div>
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
        <div className="addEvent-form">
          {this.props.addEvent ? (
            <form onClick={this.onSubmitHandler}>
              <label>
                Title:
                <input type="text" name="title" />
                <br />
                Time:
                <input type="text" name="Time" />
                <br />
                Address:
                <input type="text" name="address" />
              </label>
              <input type="button" value="Submit" />
            </form>
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
