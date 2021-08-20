import React, { Component } from "react";
//import PropTypes from "prop-types";
import styled from "styled-components";

// Grommet
import { Box, Button, Text, List, MaskedInput } from "grommet";

// Components
import Card from "../../components/Card";

// styled
const TextHeading = styled(Text)`
  padding: 6px 0px 6px 12px;
`;

const StyledButton = styled(Button)`
  width: 150px;
`;

const StyledInput = styled(MaskedInput)`
  width: 250px;
`;

class TradeCurrency extends Component {
  constructor() {
    super();
    this.setMode = this.setMode.bind(this);
    this.placeOrder = this.placeOrder.bind(this);

    this.state = {
      isBuyMode: true,
      value: "",
      orders: [],
    };
  }

  /**
   * This function sets component mode.
   */
  setMode(mode) {
    this.setState({ isBuyMode: mode });
  }

  /**
   * Callback function that mocks
   * placing orders
   */
  placeOrder() {
    const {
      units: { primary, secondary },
    } = this.props;

    let newOrder = {
      type: `#${this.state.orders.length} ${
        this.state.isBuyMode ? "BUY" : "SELL"
      }`,
      value: `${this.state.value} ${
        this.state.isBuyMode ? secondary : primary
      }`,
    };

    this.setState((prevState) => ({
      orders: [...prevState.orders, newOrder],
    }));
  }

  render() {
    const { isBuyMode, orders, value } = this.state;
    const { units } = this.props;

    return (
      <Card width="600px" direction="row" flex={false} overflow="auto">
        <Box basis="1/2">
          <Box direction="row" border="bottom" height="41px">
            <Button label="Buy" onClick={() => this.setMode(true)} />
            <Button label="Sell" onClick={() => this.setMode(false)} />
          </Box>
          <Box align="center" justify="start" pad="medium" gap="medium" fill>
            <StyledInput
              onChange={(e) => this.setState({ value: e.target.value })}
              value={value}
              mask={[
                {
                  length: 50,
                  regexp: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                  placeholder: isBuyMode
                    ? `I want to spend ${units.secondary}`
                    : `I want to sell ${units.primary}`,
                },
              ]}
            />

            <StyledButton
              primary
              label={isBuyMode ? "Buy" : "Sell"}
              size="small"
              color={isBuyMode ? "" : "#df4249"}
              onClick={this.placeOrder}
            />
          </Box>
        </Box>

        <Box basis="1/2" border="left">
          <Box border="bottom">
            <TextHeading weight="bold">Open orders</TextHeading>
          </Box>
          <Box
            pad="small"
            overflow="auto"
            flex={false}
            height={{ max: "medium" }}
          >
            <List
              primaryKey="type"
              secondaryKey="value"
              data={orders}
              pad="none"
            />
          </Box>
        </Box>
      </Card>
    );
  }
}

// TODO flex grow za open orders

TradeCurrency.propTypes = {};

export default TradeCurrency;
