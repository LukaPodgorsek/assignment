import React, { Component } from "react";
//import PropTypes from 'prop-types';

import { Box } from "grommet";

import OrderBook from "./OrderBook";

import CurrencyBanner from "./CurrencyBanner";

/**
 * This component renders TradeView page
 */
class TradeView extends Component {
  constructor() {
    super();
    this.onSelect = this.onSelect.bind(this);

    this.state = {
      selectedCurrencyPair: "",
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
      <Box direction="column">
        {/* Currency selector banner */}
        <CurrencyBanner updateSelectedCurrencyPair={this.onSelect} />

        {/* Content */}
        <OrderBook currencyPair={this.state.selectedCurrencyPair} />
      </Box>
    );
  }
}

TradeView.propTypes = {};

export default TradeView;
