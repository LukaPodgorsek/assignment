import React, { Component } from "react";
import PropTypes from "prop-types";

// Grommet
import { Box, Select } from "grommet";

// components
import Price from "./Price";

/**
 * This component renders currency banner.
 *
 * User can select from dropdown currency pair and
 * component will display last, 24h high and 24h low price
 */
class CurrencyBanner extends Component {
  constructor() {
    super();
    this.getTradingPairs = this.getTradingPairs.bind(this);
    this.getTickerForCurrency = this.getTickerForCurrency.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      selectedTradingPair: {
        base_decimals: 0,
        minimum_order: "",
        name: "",
        counter_decimals: 0,
        trading: "",
        url_symbol: "",
        description: "",
      },
      // available trading pairs
      tradingPairs: [
        {
          base_decimals: 8,
          minimum_order: "20.0 USD",
          name: "BTC/USD",
          counter_decimals: 2,
          trading: "Enabled",
          url_symbol: "btcusd",
          description: "Bitcoin / U.S. dollar",
        },
        {
          base_decimals: 8,
          minimum_order: "20.0 EUR",
          name: "BTC/EUR",
          counter_decimals: 2,
          trading: "Enabled",
          url_symbol: "btceur",
          description: "Bitcoin / Euro",
        },
      ],
      selectedCurrencyTicker: {},
      unit: "",
    };
  }

  componentDidMount() {
    this.getTradingPairs();
  }

  /**
   * This function creates GET request to trading-pairs-info/
   * to get currently available tradingPairs
   */
  getTradingPairs() {
    fetch("/api/v2/trading-pairs-info")
      .then((response) => response.json())
      .then((tradingPairs) =>
        this.setState({ tradingPairs, defaultTradingPairs: tradingPairs })
      )
      .catch((err) => console.error("ERR: ", err));
  }

  /**
   * Callback function for onChange event on Select component
   * @param {*} e
   */
  onSelect(e) {
    let { value } = e;
    let unit = this.parseCurrency(value.minimum_order);
    this.setState({ selectedTradingPair: value, unit });

    // get trading pair prices
    this.getTickerForCurrency(value.url_symbol);

    // update parent with selected trading pair
    this.props.updateSelectedCurrencyPair(value.url_symbol);
  }

  /**
   * This function creates GET request to ticker API
   * to get current prices for provided trading pair
   * @param {String} urlSymbol eg. btcusd
   */
  getTickerForCurrency(urlSymbol) {
    fetch(`/api/v2/ticker/${urlSymbol}`)
      .then((response) => response.json())
      .then((selectedCurrencyTicker) => {
        this.setState({ selectedCurrencyTicker });
      })
      .catch((err) => console.error("ERR: ", err));
  }

  /**
   * This function extracts currency from price string
   * @param {String} value
   * @returns currency string
   */
  parseCurrency(value) {
    let regex = /^[0-9]*\.[0-9]*\s(\w*)/gm;
    let currency = regex.exec(value);
    return currency ? currency[1] : "";
  }

  onSearch(text) {
    const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(escapedText, "i");
    let options = this.state.defaultTradingPairs.filter((o) =>
      regex.test(o.name)
    );
    this.setState({ tradingPairs: options });
  }

  render() {
    return (
      <Box direction="row" fill justify="between" align="center" gap="medium">
        <Select
          labelKey="name"
          valueKey="url_symbol"
          options={this.state.tradingPairs}
          value={this.state.selectedTradingPair}
          onSearch={this.onSearch}
          onChange={this.onSelect}
        />
        <Box direction="row">
          <Price
            label="Last price"
            value={this.state.selectedCurrencyTicker.last}
            unit={this.state.unit}
          />
        </Box>
        <Box direction="row" gap="small">
          <Price
            label="24h low"
            value={this.state.selectedCurrencyTicker.low}
            unit={this.state.unit}
          />
          <Price
            label="24h high"
            value={this.state.selectedCurrencyTicker.high}
            unit={this.state.unit}
          />
        </Box>
      </Box>
    );
  }
}

CurrencyBanner.propTypes = {
  updateSelectedCurrencyPair: PropTypes.func.isRequired,
};

export default CurrencyBanner;
