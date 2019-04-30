import React, { Component } from "react";
import axios from "axios";
import Posts from "./Posts";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    this.getPosts();
    this.hydrateStateWithLocalStorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  getPosts = () => {
    return axios
      .get("http://localhost:4000/api/posts")
      .then(res => {
        console.log("Getting the posts", res);
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <h1>Very inspirational quote board</h1>
        <Posts
        posts={this.state.posts}
        />
      </div>
    );
  }
}

export default App;
