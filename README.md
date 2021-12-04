# README
[__Dispatch__](https://dispatch-one.herokuapp.com/#/signup) is a messaging application cloned according to the functionality of __Slack__. Users can create workspaces, threads, and DMs, and easily chat with each other in realtime. 
![Screen Shot 2021-12-03 at 9 34 48 AM](https://user-images.githubusercontent.com/13125699/144647335-26101aee-3e5d-48d9-bcf4-cc0bc1114383.png)
## Highlights
### Join a Workspace
Any user can create a new workspace or join a workspace via unique code (similar to [Kahoot](https://kahoot.it/)). Workspace creation and joining all occurs immediately through websockets for the best experience. To join a workspace, a user pastes in a keycode shared by a user already in the workspace.

When a user joins a workspace, the server provides all Workspace information in response (```users``` and ```threads``` related to that workspace). Rather than re-writing functions to handle the response, the websocket subscription passes both Redux's ```dispatch``` and an ```action``` defined in the response. That way, the socket can immediately ```dispatch``` the received response to update the state appropriately. The socket API util is also used to send the initial keycode an payload to the server.
- Passing Redux's dispatch as an argument and making it available within a subscription, makes it the given socket easily extensible as long as:
   1. The response produced by the server is a plain javascript object and follows the same pattern as a redux action (e.g. {type: TYPE, action: things})
   2. The action that is passed up is handled within a redux reducer.
- This pattern makes is extremely easy to expand the 'response' from a single server function if necessary. Instead of building the a massive payload in the server, the server itself can effectively dispatch any number of actions (as done in the ```join_workspace``` function.
```javascript
// * Frontend API Util
export const createRealtimeUser = (dispatch, userId) => {
  App.cable.subscriptions.create(
    {
      channel: 'UserConfigChannel',
      user: userId
    },
    {
      // Receive response from server and dispatch (all responses should 
      // be actions as defined in various frontend 'actions' files
      received: data => {
        dispatch(data)
      },
      ...
      setupWorkspace: function (data) {
        return this.perform("setup_workspace", data)
      },
      // Triggers the join_workspace function on the server (defined below)
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
```ruby
# * Backend ruby server
  def join_workspace(payload)
    user_id = payload['user']
    keycode = payload['workspace']['keycode']
    # identify the user and the workspace according to the keycode pasted by the user
    user = User.find(user_id)
    workspace = Workspace
                  .includes(:users)
                  .includes(:threads)
                  .find_by(keycode: keycode)
    if workspace
      workspace.workspace_users.create(user_id: user_id)
      # respond with actions that will be dispatched by the frontend subscription
      self.receive_workspace(workspace)
      self.receive_workspace_users(workspace.users)
      self.receive_all_threads(user.threads.where(workspace_id: workspace.id))
    else
      socket = error_socket(
        ["Couldn't find the workspace"],
        422,user_id, 'RECEIVE_WORKSPACE_ERRORS')
      broadcast_user_channel(socket)
    end
  end
```
### Notifications
Notifications will display within the current workspace for messages from threads other than the active thread, and _not_ set by the current user. Both a banner notification as well as a bubble will display accordingly.
<img width="718" alt="Screen Shot 2021-12-03 at 9 40 45 PM" src="https://user-images.githubusercontent.com/13125699/144698858-30e80a39-69f4-49eb-a08c-003cbbd48239.png">
__Banner__
```javascript
  render() {
    // check if the notification should show (e.g. the user is not already on the 
    // thread the message belongs too, and the message sender is not the viewing user)
    if (this.validateShow()) {
      // display the banner for 5 seconds before animating it's dismissal
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
      // only display the notifications bubble on non-active threads
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
- React & Redux
- Ruby on Rails
   - Postgresql
   - ActionCable (websockets)

For more project and development oriented info, access the wiki, [here](https://github.com/NRaff/Dispatch/wiki).
