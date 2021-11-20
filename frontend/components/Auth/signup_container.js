import { connect } from "react-redux"
import { removeUserErrors } from "../../actions/error_actions"
import { createUser } from "../../actions/user_actions"
import { requestLoginUser } from "../../actions/session_actions"
import AuthForm from "./auth_form"

const mSTP = state => ({
  user: {
    email: '',
    password: '',
    displayName: ''
  },
  errors: state.errors.userErrors,
  authType: 'Sign Up'
})

const mDTP = dispatch => ({
  action: user => dispatch(createUser(user)),
  loginDemo: user => dispatch(requestLoginUser(user)),
  removeErrors: () => dispatch(removeUserErrors())
})

export default connect(mSTP,mDTP)(AuthForm)