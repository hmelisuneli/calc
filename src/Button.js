import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  static propTypes = {
    isOrange: PropTypes.bool,
    isTwoSpaced: PropTypes.bool,
    text: PropTypes.string,
    onClick: PropTypes.func,
  };

  render() {
    let className = 'button';

    if (this.props.isOrange) {
      className += ' orange';
    }

    if (this.props.isTwoSpaced) {
      className += ' two-space';
    }

    return (
      <div
        className={className}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </div>
    );
  }
}

export default Button;
