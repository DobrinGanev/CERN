import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchMessage } from '../actions/messageActions';
import { Link, browserHistory } from 'react-router'
export class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
      this.props.dispatch(fetchMessage())
  }

  render() {
    return (
          <div>
            <header>
              Links:
              {' '}
              <Link to="/">Home</Link>
              {' '}
              <Link to="/foo">Foo</Link>
              {' '}
              <Link to="/bar">Bar</Link>
            </header>
            <div>
              <h2>App</h2>
              {this.props.children}
            </div>
            <p>Loading : {this.props.isLoading.toString()}</p>
          </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  messages : PropTypes.array.isRequired,
  isLoading : PropTypes.bool.isRequired
};

// Retrieve data from store as props
function mapStateToProps(state) {
  const {messages, isLoading } = {
    isLoading: state.message.isLoading,
    messages: state.message.messages
  }
  return {
      messages,
      isLoading
    }
}

export default connect(mapStateToProps)(App);
