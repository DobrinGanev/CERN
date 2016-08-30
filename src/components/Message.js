import React from 'react'
const Message = ({messages}) =>
    <div>
      <ul>
        {messages.map((m, i) =>
          <li key={i}>{m.message}</li>
        )}
      </ul>
    </div>;

Message.propTypes = {
    messages: React.PropTypes.any
};
export default Message;
