import React, { Component } from "react";

// Grommet
import { Box } from "grommet";

class Card extends Component {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Box
        margin={{ vertical: "small" }}
        elevation="medium"
        background="background-front"
        {...rest}
      >
        {children}
      </Box>
    );
  }
}

Card.propTypes = {};

export default Card;
