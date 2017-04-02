import React, {Component} from 'react';
const makeExpanding = (Target) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {isOpen: false};
        }
        handleOnClick = () => { this.setState({isOpen: !this.state.isOpen}); };

        render() {
          return (
            <Target
              {...this.props}
              isOpen={this.state.isOpen}
              onClick={this.handleOnClick}
            />
          );
      }
    }
};
export default makeExpanding;
