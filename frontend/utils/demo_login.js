export const demoLogin = (component) => {
  let user = Object.assign({}, component.state.user)
  user.email = 'Demo@email.com';
  user.password = '123456';
  return user
}