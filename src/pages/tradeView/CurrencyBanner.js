import React, { Component } from "react";
import PropTypes from "prop-types";

// Grommet
import { Box, Select } from "grommet";

// components
import Price from "../../components/Price";

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
      tradingPairs: [],
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
      .then((tradingPairs) => {
        this.setState({
          tradingPairs,
          defaultTradingPairs: tradingPairs,
        });
        this.onSelect({ value: tradingPairs[0] });
      })
      .catch((err) => console.error("ERR: ", err));
  }

  /**
   * Callback function for onChange event on Select component
   * @param {Object} e
   */
  onSelect(e) {
    let { value } = e;
    let units = this.parseCurrency(value.name);
    this.setState({ selectedTradingPair: value, unit: units.secondary });

    // get trading pair prices
    this.getTickerForCurrency(value.url_symbol);

    // update parent with selected trading pair
    this.props.updateSelectedCurrencyPair(value.url_symbol, units);
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
   * This function extracts currency from name string
   * @param {String} value
   * @returns currency string
   */
  parseCurrency(value) {
    //let regex = /^[0-9]*\.[0-9]*\s(\w*)/gm;
    //let currency = regex.exec(value);
    let units = value.split("/");
    return { primary: units[0], secondary: units[1] };
  }

  /**
   * Callback function to handle search in select component
   * @param {String} text
   */
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
      <Box
        direction="row"
        justify="between"
        align="center"
        gap="medium"
        height="xxsmall"
      >
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
