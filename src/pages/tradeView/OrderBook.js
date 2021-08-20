import React, { Component } from "react";
import PropTypes from "prop-types";
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Components
import OrderBookTable from "./OrderBookTable";
import Card from "../../components/Card";

/**
 * This component renders order book for
 * selected currency pair
 */
class OrderBook extends Component {
  constructor() {
    super();
    this.subscribeToTopic = this.subscribeToTopic.bind(this);
    this.unsubscribeFromTopic = this.unsubscribeFromTopic.bind(this);

    this.state = {
      data: { bids: [], asks: [] },
    };

    this.client = new W3CWebSocket("wss://ws.bitstamp.net");
  }

  /**
   * Register socket functions when component mounts
   */
  componentDidMount() {
    this.client.onopen = () => {
      console.log("WebSocket Client Connected");
      this.subscribeToTopic(this.props.currencyPair);
    };

    this.client.onerror = (err) => {
      console.log("ERR:", err);
    };

    this.client.onmessage = (message) => {
      let response = JSON.parse(message.data);

      if (response.event === "data") {
        if (response.data) {
          let bids = Object.values(response.data.bids).slice(0, 10);
          let asks = Object.values(response.data.asks).slice(0, 10);
          this.setState({ data: { bids, asks } });
        }
      } else {
        console.log("event type: ", response.event);
      }
    };

    this.client.onclose = (message) => {
      console.log("socket closed", message);
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
      //this.getOrderBook(this.props.currencyPair);
      this.unsubscribeFromTopic(prevProps.currencyPair);
      this.subscribeToTopic(this.props.currencyPair);
    }
  }

  /**
   * Unsubscribe from websocket topic when component
   * unmounts
   */
  componentWillUnmount() {
    this.unsubscribeFromTopic(this.props.currencyPair);
  }

  /**
   * This function subscribes to websocket topic
   */
  subscribeToTopic(topic) {
    this.client.send(
      JSON.stringify({
        event: "bts:subscribe",
        data: {
          channel: `order_book_${topic}`,
        },
      })
    );
  }

  /**
   * This function unsubscribes from websocket topic
   */
  unsubscribeFromTopic(topic) {
    this.client.send(
      JSON.stringify({
        event: "bts:unsubscribe",
        data: {
          channel: `order_book_${topic}`,
        },
      })
    );
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
      <Card
        gap="small"
        flex={false}
        direction="row"
        width="512px"
        height={{ min: "medium" }}
        fill={false}
      >
        <OrderBookTable
          header={["Bid", "Amount"]}
          items={this.state.data.bids}
          isTypeBid={true}
        />
        <OrderBookTable
          header={["Ask", "Amount"]}
          items={this.state.data.asks}
        />
      </Card>
    );
  }
}

OrderBook.propTypes = {
  currencyPair: PropTypes.string.isRequired,
};

export default OrderBook;
