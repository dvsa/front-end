import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { enableLoading, disableLoading, removeLastBlock } from './../actions';

class BackButton extends Component {
  onBackClick = event => {
    this.props.enableLoading();
    this.props.removeLastBlock();
    this.props.disableLoading();
  };

  render() {
    return (
      <div className="ajax-browse__back-wrapper">
        <a className="ajax-browse__back-button button" onClick={this.onBackClick}>
          <span className="ajax-browse__back-text">Back</span>
        </a>
      </div>
    );
  }
}

BackButton.propTypes = {};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapActionsToProp = {
  enableLoading,
  disableLoading,
  removeLastBlock,
};

export default connect(mapStateToProps, mapActionsToProp)(BackButton);
