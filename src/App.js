import React, { Component } from "react";
//import PropTypes from 'prop-types';

// Libs
import { Grommet } from "grommet";
import { hpe } from "grommet-theme-hpe";

// Components
import AppHeader from "./components/AppHeader";
import Content from "./components/Content";

// Pages
import TradeView from "./pages/tradeView/TradeView";

class App extends Component {
  render() {
    return (
      <Grommet theme={hpe} themeMode="dark" full>
        <AppHeader />
        <Content>
          <TradeView />
        </Content>
      </Grommet>
    );
  }
}

App.propTypes = {};

export default App;
