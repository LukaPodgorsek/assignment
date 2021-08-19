import React, { Component } from "react";
//import PropTypes from 'prop-types';

// Libs
import { Grommet } from "grommet";
import { hpe } from "grommet-theme-hpe";
class App extends Component {
  render() {
    return <Grommet theme={hpe} full></Grommet>;
  }
}

App.propTypes = {};

export default App;
