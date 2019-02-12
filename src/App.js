import React, { Component } from 'react';
import { Container, Icon, Input, Label, Menu } from 'semantic-ui-react';
import './App.css';

const API_KEY = 'AIzaSyBcRBEKRY20siIDP_hFUXE30CiwMu5q8q8';
const URI = 'https://www.googleapis.com/books/v1/volumes';


class App extends Component {
  constructor (...props) {
    super(...props);
    this.state = {
      query: '',
      result: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    // this.search();
  }

  handleInput (e) {
    this.setState({ query: e.target.value });
  }

  handleKeyDown (e) {
    if (e.key === 'Enter') this.search();
  }

  search () {
    const query = this.state.query.replace(' ', '+');

    return fetch(`${URI}?q=${query}&key=${API_KEY}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(JSON.stringify)
    .then(str => { this.setState({ result: str }); })
    .catch(console.error);
  }

  render () {
    return (
      <Container fluid>
        <Menu fluid vertical>
          <Menu.Item>
            <Input fluid icon
              labelPosition="left"
              onInput={this.handleInput}
              onKeyDown={this.handleKeyDown}
              placeholder="search…"
            >
              <Label>search the Google Books API</Label>
              <input />
              <Icon link name="search" onClick={this.search} />
            </Input>
          </Menu.Item>
        </Menu>
        <Container>
          <p>
            {this.state.result}
          </p>
        </Container>
      </Container>
    );
  }
}

export default App;
