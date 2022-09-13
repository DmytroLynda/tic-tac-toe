import React from 'react';

export class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.setState({ value: this.state.value ? null : 'X' + this.props.value })}
      >
        {this.state.value}
      </button>
    );
  }
}
