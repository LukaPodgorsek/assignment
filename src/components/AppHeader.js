import React, { Component } from "react";
import styled from "styled-components";

import { Header, Image, Box, Text } from "grommet";

// styled
const Logo = styled(Image)`
  height: 30px;
`;

// we could achieve same result with props on Text component
const StyledAppName = styled(Text)`
  font-weight: 600;
  color: white;
`;

/**
 * This component defines main application header
 */
class AppHeader extends Component {
  render() {
    return (
      <Header
        pad={{ left: "medium", right: "small", vertical: "small" }}
        elevation="medium"
        style={{ zIndex: "1" }}
        {...this.props}
        justify="start"
        background="background-front"
      >
        <Box size="xxsmall">
          <Logo fit="contain" src="/logo.svg" />
        </Box>
        <StyledAppName>Tradeview Lite</StyledAppName>
      </Header>
    );
  }
}

AppHeader.propTypes = {};

export default AppHeader;
