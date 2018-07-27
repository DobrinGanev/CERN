import React from 'react'
import PropTypes from 'prop-types'
const Message = ({ messages }) => (
  <div>
    <ul>{messages.map((m, i) => <li key={i}>{m.message}</li>)}</ul>
  </div>
)

Message.propTypes = {
  messages: PropTypes.any
}
export default Message
