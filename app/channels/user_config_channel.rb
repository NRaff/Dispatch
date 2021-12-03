require 'byebug'

class UserConfigChannel < ApplicationCable::Channel
  def subscribed
    stream_for "user_config:#{params[:user]}"
    # self.receive_all_users
    self.receive_user if params[:user]
  end

  def receive_all_users
    # byebug
    users = User.all
    users_obj = set_objects_JSON(users, permitted_user_keys)
    socket = {
      users: users_obj,
      type: 'RECEIVE_ALL_USERS'
    }
    broadcast_user_channel(socket)
  end

  def receive_user
    # user = User.find(params[:user])
    user = User.includes(:threads).includes(:workspaces).find(params[:user])
    user_obj = set_object_JSON(user, current_user_keys)
    socket = {
      user: user_obj,
      type: 'RECEIVE_USER'
    }
    broadcast_user_channel(socket)
    self.receive_all_workspaces(user.workspaces)
    # self.receive_all_threads(user.threads.includes(:members))
  end

  def receive_all_workspaces(workspaces)
    socket = {
      workspaces: set_objects_JSON(workspaces, workspace_keys),
      type: 'RECEIVE_ALL_WORKSPACES'
    }
    broadcast_user_channel(socket)
  end

  def setup_workspace(payload)
    # byebug
    user_id = payload['user']
    user = User.find(user_id)
    wsp_id = payload['workspace']
    workspace = Workspace.includes(:users).includes(:threads).find(wsp_id)
    self.receive_workspace_users(workspace.users)
    self.receive_all_threads(user.threads.where(workspace_id: workspace.id))
  end

  def join_workspace(payload)
    user_id = payload['user']
    keycode = payload['workspace']['keycode']
    user = User.find(user_id)
    workspace = Workspace
                  .includes(:users)
                  .includes(:threads)
                  .find_by(keycode: keycode)
    if workspace
      workspace.workspace_users.create(user_id: user_id)
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

  def create_workspace(payload)
    user = User.find(payload['user'])
    workspace = user.owned_workspaces.create(payload['workspace'])
    workspace.workspace_users.create(user_id: payload['user'])
    if workspace.id
      self.receive_workspace(workspace)
    else
      socket = error_socket(err, 422, payload['user'], 'RECEIVE_WORKSPACE_ERRORS')
      broadcast_user_channel(socket)
    end
  end

  def leave_workspace(payload)
    user_id = payload['user']
    workspace_id = payload['workspace']
    user_workspace = UserWorkspace.find_by(user_id: user_id, workspace_id: workspace_id)
    if user_workspace.destroy
      socket = {
        type: 'REMOVE_WORKSPACE',
        workspace: workspace_id
      }
      broadcast_user_channel(socket)
    end
  end

  def receive_workspace(workspace)
    socket = {
      workspace: set_object_JSON(workspace, workspace_keys),
      type: 'RECEIVE_WORKSPACE'
    }
    broadcast_user_channel(socket)
  end

  def receive_workspace_users(users)
    socket = {
      users: set_objects_JSON(users, permitted_user_keys),
      type: 'RECEIVE_ALL_USERS'
    }
    broadcast_user_channel(socket)
  end

  def receive_all_threads(threads)
    new_threads = threads.map do |t|
      new_thread = t.as_json
      new_thread['user_ids'] = t.members.map {|m| m.id}
      new_thread
    end
    socket = {
      threads: set_camel_JSON(new_threads, thread_keys),
      type: 'RECEIVE_ALL_THREADS'
    }
    broadcast_user_channel(socket)
  end

  def receive_thread(payload)
    # byebug
    workspace = Workspace.includes(:threads).includes(:users).find(payload['workspace']['id'])
    new_thread = workspace.threads.create({
      name: payload['thread']['name'],
      is_thread: payload['thread']['is_thread']
    })
    if new_thread.id
      invitees = payload['thread']['invitees']
      if invitees.empty? && new_thread.is_thread 
        # default to general workspace channel
        invitees = workspace.users.map{|u| u.id}
      else
        invitees.push(payload['user'])
      end
      add_invitees(invitees, new_thread)
      received_thread = new_thread.as_json
      received_thread['user_ids'] = new_thread.members.map {|m| m.id}
      socket = {
        thread: set_obj_camel_JSON(received_thread, thread_keys),
        type: 'RECEIVE_THREAD'
      }
      
      broadcast_to_members(new_thread.members, socket)
      self.receive_workspace_users(workspace.users)
    else
      err = new_thread.errors.messages
      socket = error_socket(err, 422, payload['user'], 'RECEIVE_THREAD_ERRORS')
      broadcast_user_channel(socket)
    end

  end

  def add_invitees(invitees, thread)
    invitees.each do |user|
      thread.user_threads.create(user_id: user)
    end
  end

  def delete_thread(payload)
    thread = MessageThread.includes(:members).find(payload['thread'])
    members = thread.members
    if thread.destroy
      socket = {
        currentUser: payload['user'],
        threadId: thread.id,
        type: 'REMOVE_THREAD'
      }
      broadcast_to_members(members, socket)
    else
      err = thread.errors.messages
      socket = error_socket(err, 422, payload['user'], 'RECEIVE_THREAD_ERRORS')
      broadcast_user_channel(socket)
    end
  end

  def workspace_keys
    ['id', 'name', 'keycode','created_at']
  end

  def thread_keys
    ['id', 'name', 'is_thread', 'created_at', 'user_ids']
  end

  def permitted_user_keys
    ['id','display_name']
  end

  def current_user_keys
    ['id', 'display_name', 'email','created_at',]
  end

  def thread_params
    threadObj = {
      user_id: params['thread']['userId'],
      name: params['thread']['name']
    }
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    # byebug
  end

  private
  def broadcast_user_channel(socket)
    UserConfigChannel.broadcast_to("user_config:#{params[:user]}", socket)
  end

  def broadcast_to_members(members, socket)
    #expect that members are User objects
    members.each do |m|
      UserConfigChannel.broadcast_to("user_config:#{m.id}", socket) 
    end
  end
end
