// window.fetchUser = fetchUser
// window.fetchUsers = fetchUsers
// window.createUser = createUser
// window.deleteUser = deleteUser
// window.updateUser = updateUser

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

export const createUser = user => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: {user}
  })
)

export const deleteUser = userId => (
  $.ajax({
    method: 'DELETE',
    url: `/api/users/${userId}`
  })
)

export const updateUser = user => {
  return (
    $.ajax({
      method: 'PATCH',
      url: `/api/users/${user.id}`,
      data: {user}
    })
  )
}