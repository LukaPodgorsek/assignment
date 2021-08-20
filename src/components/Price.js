import React, { Component } from "react";
import PropTypes from "prop-types";

import { Box, Text } from "grommet";

class Price extends Component {
  render() {
    const { label, value, unit } = this.props;
    return (
      <Box direction="row" gap="small">
        <Text weight="bold">{`${label}:`}</Text>
        <Text>{`${value} ${unit}`}</Text>
      </Box>
    );
  }
}

Price.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  unit: PropTypes.string,
};

Price.defaultProps = {
  value: "0",
};

export default Price;
