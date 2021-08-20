import React, { Component } from "react";
//import PropTypes from 'prop-types';

import { Box } from "grommet";

import OrderBook from "./OrderBook";
import CurrencyBanner from "./CurrencyBanner";
import Graph from "./Graph";
import TradeCurrency from "./TradeCurrency";

/**
 * This component renders TradeView page
 */
class TradeView extends Component {
  constructor() {
    super();
    this.updateSelectedCurrencyPair =
      this.updateSelectedCurrencyPair.bind(this);

    this.state = {
      selectedCurrencyPair: null,
      units: {},
    };
  }

  /**
   * Callback function for onChange event on Select component
   * @param {String} selectedCurrencyPair
   */
  updateSelectedCurrencyPair(selectedCurrencyPair, units) {
    this.setState({ selectedCurrencyPair, units });
  }

  render() {
    return (
      <Box direction="column" className="page-tradeview" width="xlarge">
        {/* Currency selector banner */}
        <CurrencyBanner
          updateSelectedCurrencyPair={this.updateSelectedCurrencyPair}
        />

        {/* Content */}
        {this.state.selectedCurrencyPair && (
          <>
            <Graph symbol={this.state.selectedCurrencyPair} />
            <Box direction="row" gap="small" justify="between">
              <OrderBook currencyPair={this.state.selectedCurrencyPair} />
              <TradeCurrency units={this.state.units} />
            </Box>
          </>
        )}
      </Box>
    );
  }
}

TradeView.propTypes = {};

export default TradeView;
