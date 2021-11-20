import { connect } from "react-redux"
import { removeUserErrors } from "../../actions/error_actions"
import { requestLoginUser } from "../../actions/session_actions"
import AuthForm from "./auth_form"

const mSTP = (state) => ({
  user: {
    email: '',
    password: ''
  },
  errors: state.errors.userErrors,
  authType: 'Login'
})

const mDTP = dispatch => ({
  action: user => dispatch(requestLoginUser(user)),
  loginDemo: user => dispatch(requestLoginUser(user)),
  removeErrors: () => dispatch(removeUserErrors())
})

export default connect(mSTP, mDTP)(AuthForm)