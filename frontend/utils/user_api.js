// window.fetchUser = fetchUser
// window.fetchUsers = fetchUsers
// window.createUser = createUser
// window.deleteUser = deleteUser
// window.updateUser = updateUser

const snakifiedUser = user => ({
  email: user.email,
  username: user.username,
  display_name: user.displayName,
  password: user.password
})

export const fetchUser = userId => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`,
  })
)

export const fetchUsers = () => (
  $.ajax({
    method: 'GET',
    url: `/api/users`
  })
)

export const createUser = paramUser => {
  const user = snakifiedUser(paramUser)
  return (
    $.ajax({
      method: 'POST',
      url: '/api/users',
      data: {user}
    })
  )
}

export const deleteUser = userId => (
  $.ajax({
    method: 'DELETE',
    url: `/api/users/${userId}`
  })
)

export const updateUser = paramUser => {
  const user = snakifiedUser(paramUser)
  return (
    $.ajax({
      method: 'PATCH',
      url: `/api/users/${paramUser.id}`,
      data: {user}
    })
  )
}