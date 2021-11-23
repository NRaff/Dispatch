export const demoLogin = (component) => {
  let user = Object.assign({}, component.state.user)
  user.email = 'demo@email.com';
  user.password = '123456';
  return user
}