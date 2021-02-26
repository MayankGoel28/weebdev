import React from 'react'
import PropTypes from 'prop-types'

const LoginRecruiterForm = ({
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
    email,
    password
}) => {
    return (
        <div>
            <h2>LoginRecruiter</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    email
          <input
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    password
          <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginRecruiterForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginRecruiterForm
