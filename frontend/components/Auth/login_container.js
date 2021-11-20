import { connect } from "react-redux"
import { requestLoginUser } from "../../actions/session_actions"
import AuthForm from "./auth_form"

const mSTP = (state) => ({
  user: {
    email: '',
    password: ''
  },
  authType: 'Login'
})

const mDTP = dispatch => ({
  action: user => dispatch(requestLoginUser(user))
})

export default connect(mSTP, mDTP)(AuthForm)