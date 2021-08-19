import React, { Component } from "react";
import PropTypes from "prop-types";

import TradingViewWidget, { Themes } from "react-tradingview-widget";

// Grommet
import Card from "../../components/Card";

class Graph extends Component {
  render() {
    return (
      <Card height="medium" className="graph">
        <TradingViewWidget
          symbol={`coinbase:${this.props.symbol}`}
          theme={Themes.DARK}
          locale="fr"
          autosize
        />
      </Card>
    );
  }
}

Graph.propTypes = {
  symbol: PropTypes.string.isRequired,
};

Graph.defaultProps = {
  symbol: "btcusd",
};

export default Graph;
