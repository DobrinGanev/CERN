import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMessage } from '../actions/messageActions'
import { Link } from 'react-router'
import Message from '../components/Message'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

export class App extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
  }
  componentDidMount() {
    this.props.dispatch(fetchMessage())
  }

  render() {
    return (
      <div>
        <header>
          Links: <Link to="/">Home</Link> <Link to="/foo">Foo</Link>{' '}
          <Link to="/bar">Bar</Link>
        </header>
        <div>
          <h2>App</h2>
          <Message messages={this.props.messages} />
          {this.props.children}
        </div>
        <p>Loading : {this.props.isLoading.toString()}</p>
      </div>
    )
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  const { messages, isLoading } = {
    isLoading: state.message.isLoading,
    messages: state.message.messages
  }
  return {
    messages,
    isLoading
  }
}

export default withRouter(connect(mapStateToProps)(App))