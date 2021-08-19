import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Table, TableBody, TableHeader, TableRow, TableCell } from "grommet";

// styled
const StyledTable = styled(Table)`
  width: 250px;
`;

const StyledCell = styled(TableCell)`
  ${({ isTypeBid }) => (isTypeBid ? `color: #199F3A;` : `color: #df4249;`)}
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
                <StyledCell isTypeBid={this.props.isTypeBid}>
                  {el[0]}
                </StyledCell>
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
  isTypeBid: PropTypes.bool,
};

OrderBookTable.defaultProps = {
  header: ["Bid", "Amount"],
  isTypeBid: false,
};

export default OrderBookTable;
