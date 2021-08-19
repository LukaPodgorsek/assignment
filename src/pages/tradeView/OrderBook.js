import React, { Component } from "react";
import PropTypes from "prop-types";

import { Box } from "grommet";

import OrderBookTable from "./OrderBookTable";

/**
 * This component renders order book for
 * selected currency pair
 */
class OrderBook extends Component {
  constructor() {
    super();

    this.state = {
      data: { bids: [], asks: [] },
    };
  }

  /**
   * When selected currency pair changes request
   * data for new pair
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (this.props.currencyPair !== prevProps.currencyPair) {
      console.log("get order book");
      this.getOrderBook(this.props.currencyPair);
    }
  }

  /**
   * This function GETs order book data for
   * selected currency pair
   * @param {String} currency_pair selected currency pair
   * @param {Integer} limit limit amount of orders
   */
  getOrderBook(currency_pair, limit = 10) {
    fetch(`/api/v2/order_book/${currency_pair}`)
      .then((response) => response.json())
      .then((data) => {
        let bids = data.bids.slice(0, limit);
        let asks = data.asks.slice(0, limit);
        this.setState({ data: { bids, asks } });
      })
      .catch((err) => console.error("ERR: ", err));
  }

  render() {
    return (
      <Box
        margin={{ vertical: "medium" }}
        gap="small"
        flex={false}
        overflow="auto"
        direction="row"
      >
        <OrderBookTable
          header={["Bid", "Amount"]}
          items={this.state.data.bids}
        />
        <OrderBookTable
          header={["Ask", "Amount"]}
          items={this.state.data.asks}
        />
      </Box>
    );
  }
}

OrderBook.propTypes = {
  currencyPair: PropTypes.string.isRequired,
};

export default OrderBook;
