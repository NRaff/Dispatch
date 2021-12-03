# README
[__Dispatch__](https://dispatch-one.herokuapp.com/#/signup) is a messaging application cloned according to the functionality of __Slack__. Users can create workspaces, threads, and DMs, and easily chat with each other in realtime. 
![Screen Shot 2021-12-03 at 9 34 48 AM](https://user-images.githubusercontent.com/13125699/144647335-26101aee-3e5d-48d9-bcf4-cc0bc1114383.png)
## Features
### Create or Join a Workspace
Any user can create a new workspace or join a workspace via unique code (similar to [Kahoot](https://kahoot.it/)). Completed using keycode to search for and connect with in Postgres. Workspace creation and joining all occurs immediately through websockets for the best experience.

__Join Workspace__
When a user joins a workspace, the server provides all Workspace information in response (```users``` and ```threads``` related to that workspace). Rather than re-writing functions to handle the response, the websocket subscription passes both Redux's ```dispatch``` and an ```action``` defined in the response. That way, the socket can immediately ```dispatch``` the received response to update the state appropriately.
```javascript
export const createRealtimeUser = (dispatch, userId) => {
  App.cable.subscriptions.create(
    {
      channel: 'UserConfigChannel',
      user: userId
    },
    {
      received: data => {
        dispatch(data)
      },
      ...
      setupWorkspace: function (data) {
        return this.perform("setup_workspace", data)
      },
      joinWorkspace: function (data) {
        return this.perform("join_workspace", data)
      },
      createWorkspace: function (data) {
        return this.perform("create_workspace", data)
      },
      leaveWorkspace: function (data) {
        return this.perform("leave_workspace", data)
      }
    }
  )
}
```
### Notifications
Notifications will display within the current workspace for messages from threads other than the active thread, and _not_ set by the current user. Both a banner notification as well as a bubble will display accordingly.
__Banner__
```javascript
  render() {
    if (this.validateShow()) {
      setTimeout(this.closeNotification, 5000)
      return (
        <header className='notification active-notification'>
          <span onClick={this.closeNotification}>&times;</span>
          <img className={Icons.notification.darkNote} alt="bell icon" />
          <h1>{this.renderMessage()}</h1>
        </header>
      )
    } else {
      return null
    }
  }
```
__Bubble__
```javascript
  renderUnreads(){
      if (this.props.unreads > 0 && this.props.activeThread != this.props.thread.id) {
        return (
          <div className="inline-notify">
            <span>{this.props.unreads}</span>
          </div>
        )
      }
    }
```
## Tech Stack:
- React
- Ruby on Rails
   - Postgresql
   - ActionCable (websockets)

For more project and development oriented info, access the wiki, [here](https://github.com/NRaff/Dispatch/wiki).
