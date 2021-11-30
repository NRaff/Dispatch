require 'byebug'

class UserConfigChannel < ApplicationCable::Channel
  def subscribed
    stream_for "user_config:#{params[:user]}"
    self.receive_all_users
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
    UserConfigChannel.broadcast_to("user_config:#{params[:user]}", socket)
  end

  def receive_user
    # user = User.find(params[:user])
    user = User.includes(:threads).find(params[:user])
    user_obj = set_object_JSON(user, current_user_keys)
    socket = {
      user: user_obj,
      type: 'RECEIVE_USER'
    }
    UserConfigChannel.broadcast_to("user_config:#{params[:user]}", socket)
    self.receive_all_threads(user.threads.includes(:members))
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
    UserConfigChannel.broadcast_to("user_config:#{params[:user]}", socket)
  end

  def receive_thread(payload)
    user = User.includes(:threads).find(payload['user'])
    thread_names = user.threads.map { |t| t.name }
    unless thread_names.include?(payload['thread']['name'])
      new_thread = user.threads.create({
        name: payload['thread']['name'],
        is_thread: payload['thread']['is_thread']
      })
      if new_thread.id
        invitees = payload['thread']['invitees']
        received_thread = new_thread.as_json
        received_thread['user_ids'] = new_thread.members.map {|m| m.id}
        socket = {
          thread: set_obj_camel_JSON(received_thread, thread_keys),
          type: 'RECEIVE_THREAD'
        }
        add_invitees(invitees, new_thread, socket)
        UserConfigChannel.broadcast_to("user_config:#{user.id}", socket)
      else
        err = new_thread.errors.messages
        socket = {
          errors: err, 
          status: 422,
          currentUser: payload['user'],
          type: 'RECEIVE_THREAD_ERRORS'
        }
        UserConfigChannel.broadcast_to("user_config:#{payload['user']}", socket)
      end
    else
      err = ["Thread already exists"]
      socket = {
          errors: err, 
          status: 422,
          currentUser: payload['user'],
          type: 'RECEIVE_THREAD_ERRORS'
        }
      UserConfigChannel.broadcast_to("user_config:#{payload['user']}", socket)
    end
  end

  def add_invitees(invitees, thread, socket)
    invitees.each do |user|
      thread.user_threads.create(user_id: user)
      UserConfigChannel.broadcast_to("user_config:#{user}", socket)  
    end
  end

  def update_thread
    updated_thread = MessageThread.find(payload['thread']['id'])
    if updated_thread.update(payload['thread'])
      socket = {
        thread: set_object_JSON(updated_thread, thread_keys),
        type: 'RECEIVE_THREAD'
      }
      invitees = payload['thread']['invitees']
      add_invitees(invitees, updated_thread, socket)
      UserConfigChannel.broadcast_to("user_config:#{payload['user']}", socket)
    else
      err = updated_thread.errors.messages
      socket = {
        errors: err,
        status: 422,
        currentUser: payload['user'],
        type: 'RECEIVE_THREAD_ERRORS'
      }
      UserConfigChannel.broadcast_to("user_config:#{payload['user']}", socket)
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
      
      members.each do |member|
        UserConfigChannel.broadcast_to("user_config:#{member.id}", socket)
      end
    else
      err = thread.errors.messages
      socket = {
        errors: err,
        status: 422,
        currentUser: payload['user'],
        type: 'RECEIVE_THREAD_ERRORS'
      }
      UserConfigChannel.broadcast_to("user_config:#{payload['user']}", socket)
    end
    # find the thread (use includes)
    # delete thread
    # broadcast changes to associated users
  end

  # ! consider move this to super class
  def set_objects_JSON(objects, permit_keys)
    all_objects = Hash.new()
    objects.each do |obj|
      sub_obj = Hash.new()
      obj.attributes.each do |key, val|
        if permit_keys.include?(key)
          sub_obj[key.camelize(:lower)] = val
        end
      end
      all_objects[obj.id] = sub_obj
    end
    all_objects
  end

  # ! consider move to super class
  def set_camel_JSON(objects, permit_keys)
    all_objects = Hash.new()
    objects.each do |obj|
      sub_obj = Hash.new()
      # byebug
      obj.each do |key, val|
        if permit_keys.include?(key)
          sub_obj[key.camelize(:lower)] = val
        end
      end
      all_objects[obj['id']] = sub_obj
    end
    all_objects
  end
  
  # ! consider move this to super class
  def set_object_JSON(object, permit_keys)
    obj = Hash.new()
    object.attributes.each do |key, val|
      if permit_keys.include?(key)
        obj[key.camelize(:lower)] = val
      end
    end
    obj
  end

  def set_obj_camel_JSON(object, permit_keys)
    obj = Hash.new()
    object.each do |key, val|
      if permit_keys.include?(key)
        obj[key.camelize(:lower)] = val
      end
    end
    obj
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
end
