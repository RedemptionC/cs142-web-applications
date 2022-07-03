import React from 'react';
import {
  AppBar, Toolbar, Button
} from '@material-ui/core';
import './TopBar.css';
import { useLocation } from 'react-router-dom';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.appContext);
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Button  color="secondary" href="/" disabled>
              Cheng Geng
          </Button>
          <Button  color="inherit" href="/photo-share.html">
              Home
          </Button>
          <Button  color="inherit">
              {this.props.appContext}
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
