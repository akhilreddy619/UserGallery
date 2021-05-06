import React, { Component } from "react";
import UserCard from "./usercard";
import axios from "axios";
import "../css/gallery.css";

class Gallery extends Component {
  state = { users: [], isLoading: false, currentPage: 0, isEnd: false };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    const pageToFetch = this.state.currentPage + 1;
    const url = `https://reqres.in/api/users?page=${pageToFetch}`;
    this.setLoading(true);
    try {
      const promise = await axios.get(url);
      if (promise.data.data.length === 0) {
        this.setState({ isEnd: true });
        this.setLoading(false);
        return;
      }
      const users = [...this.state.users, ...promise.data.data];
      this.setState({ users: users, currentPage: pageToFetch });
      this.setLoading(false);
    } catch (ex) {}
  };

  setLoading = (status) => {
    this.setState({
      isLoading: status,
    });
  };

  render = () => {
    return (
      <div className="container">
        <p className="title">------ User Gallery--------</p>

        <div className="show-area">
          {this.state.users.map((user) => {
            console.log(user);
            return (
              <UserCard
                key={user.id}
                picUrl={user.avatar}
                firstName={user.first_name}
                lastName={user.last_name}
                email={user.email}
              />
            );
          })}
        </div>
        {this.state.isLoading ? (
          <span className="loading-text">Loading ...</span>
        ) : !this.state.isEnd ? (
          <button className="load-btn" onClick={this.fetchUsers}>
            Load More
          </button>
        ) : (
          <span></span>
        )}
      </div>
    );
  };
}

export default Gallery;
