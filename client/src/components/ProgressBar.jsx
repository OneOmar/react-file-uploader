import React from 'react'
import PropTypes from 'prop-types'

const Progress = ({ percentage }) => {
    return (
        <div className='mt-3 progress' role='progressbar'>
            <div
                className='progress-bar progress-bar-striped bg-success'
                style={{ width: `${percentage}%` }}
            >
                {percentage}%
            </div>
        </div>
    )
}

Progress.propTypes = {
    percentage: PropTypes.number.isRequired
}

export default Progress