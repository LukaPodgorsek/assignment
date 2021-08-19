import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Table, TableBody, TableHeader, TableRow, TableCell } from "grommet";

// styled
const StyledTable = styled(Table)`
  width: 250px;
`;

class OrderBookTable extends Component {
  render() {
    return (
      <StyledTable>
        <TableHeader>
          <TableRow>
            {this.props.header.map((label) => (
              <TableCell key={label}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.props.items &&
            this.props.items.map((el, i) => (
              <TableRow key={i}>
                <TableCell>{el[0]}</TableCell>
                <TableCell>{el[1]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>
    );
  }
}

OrderBookTable.propTypes = {
  items: PropTypes.array,
  header: PropTypes.array.isRequired,
};

OrderBookTable.defaultProps = {
  header: ["Bid", "Amount"],
};

export default OrderBookTable;
