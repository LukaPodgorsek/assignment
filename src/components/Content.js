import React, { Component } from 'react';
import {Box} from 'grommet';

/**
 * This is main application content wrapper.
 */
class Content extends Component {
  render() {
    return (
      <Box direction='row' margin='medium'>
        {this.props.children}
      </Box>
    );
  }
}

export default Content;