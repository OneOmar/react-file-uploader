import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ msg }) => {

    return <div className={`alert alert-${msg.type}`} role='alert' >
        {msg.content}
    </div >
}

Message.propTypes = {
    msg: PropTypes.object.isRequired
}

export default Message