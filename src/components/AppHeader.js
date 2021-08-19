import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import {Header, Heading} from 'grommet';

/**
 * This component defines main application header
 */
class AppHeader extends Component {
  render() {
    return (
      <Header
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation='medium'
        style={{ zIndex: '1' }}
        {...this.props}
      >
        <Heading level='4' margin='none'>Tradeview Lite</Heading>
      </Header>
    );
  }
}

AppHeader.propTypes = {};

export default AppHeader;