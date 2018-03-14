import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { enableLoading, disableLoading } from './actions';
import BackButton from './components/BackButton';
import Block from './components/Block';

class AjaxBrowse extends Component {
  componentDidMount() {
    this.props.disableLoading();
  }

  render() {
    const classes = classnames({
      'ajax-browse': true,
      'ajax-browse--hover-effect': false,
      'ajax-browse--back-button': true,
      'ajax-browse--loading': this.props.settings.loading,
      ['ajax-browse--' + this.props.blocks.length + '-blocks']: true,
    });
    if (this.props.blocks.length <= 0) return 'Nothing to display.';
    return (
      <div className={classes}>
        <BackButton />
        <div className="ajax-browse__inner">
          {this.props.blocks.map((block, index) => {
            return <Block key={index} items={block.items || []} block={block} blockIndex={index} />;
          })}
        </div>
      </div>
    );
  }
}

AjaxBrowse.propTypes = {
  blocks: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  blocks: state.blocks,
  settings: state.settings,
});

const mapActionsToProp = {
  enableLoading,
  disableLoading,
};

export default connect(mapStateToProps, mapActionsToProp)(AjaxBrowse);
