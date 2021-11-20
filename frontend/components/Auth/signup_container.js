import { createUser } from "../../actions/user_actions"

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