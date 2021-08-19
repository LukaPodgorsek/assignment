import React, { Component } from "react";
//import PropTypes from 'prop-types';

import { Box } from "grommet";

import OrderBook from "./OrderBook";
import CurrencyBanner from "./CurrencyBanner";
import Graph from "./Graph";

/**
 * This component renders TradeView page
 */
class TradeView extends Component {
  constructor() {
    super();
    this.onSelect = this.onSelect.bind(this);

    this.state = {
      selectedCurrencyPair: null,
    };
  }

  /**
   * Callback function for onChange event on Select component
   * @param {String} selectedCurrencyPair
   */
  onSelect(selectedCurrencyPair) {
    this.setState({ selectedCurrencyPair });
  }

  render() {
    return (
      <Box direction="column" className="page-tradeview" width="xlarge">
        {/* Currency selector banner */}
        <CurrencyBanner updateSelectedCurrencyPair={this.onSelect} />

        {/* Content */}
        {this.state.selectedCurrencyPair && (
          <>
            <Graph symbol={this.state.selectedCurrencyPair} />
            <Box direction="row">
              <OrderBook currencyPair={this.state.selectedCurrencyPair} />
            </Box>
          </>
        )}
      </Box>
    );
  }
}

TradeView.propTypes = {};

export default TradeView;
