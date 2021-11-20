import { connect } from "react-redux"
import { createUser } from "../../actions/user_actions"
import AuthForm from "./auth_form"

const mSTP = state => ({
  user: {
    email: '',
    password: ''
  },
  authType: 'Sign Up'
})

const mDTP = dispatch => ({
  action: user => dispatch(createUser(user))
})

export default connect(mSTP,mDTP)(AuthForm)