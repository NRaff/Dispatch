import { connect } from "react-redux"
import Search from "./search"

const mapNamesToIds = users => {
  let allUsers = {}
  users.forEach(user => {
    allUsers[user.displayName] = user
  })
  return allUsers
}

const mSTP = state => ({
  currentUserId: state.session.userId,
  user: state.entities.users[state.session.userId],
  users: mapNamesToIds(Object.values(state.entities.users)),
})

export default connect(mSTP)(Search)
