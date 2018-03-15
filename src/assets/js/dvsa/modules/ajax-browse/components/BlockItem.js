import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

class BlockItem extends Component {
  getDescription = () => {
    return this.props.description ? <span className="ajax-browse__link-description">{this.props.description}</span> : false;
  };

  render() {
    const classes = classnames({
      'ajax-browse__item': true,
      'ajax-browse__item--loading': this.props.loading,
      'ajax-browse__item--active': this.props.active,
      'ajax-browse__item--end-of-tree': this.props.endOfTree,
    });
    return (
      <li className={classes} ref={this.props.blockItemRef}>
        <a href={this.props.href} className="ajax-browse__link" onClick={this.props.onClick}>
          <span className="ajax-browse__link-heading">{this.props.heading}</span>
          {this.getDescription()}
        </a>
      </li>
    );
  }
}

BlockItem.propTypes = {
  id: PropTypes.number.isRequired,
  href: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  active: PropTypes.bool,
  loading: PropTypes.bool,
  endOfTree: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  blockItemRef: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(BlockItem);
