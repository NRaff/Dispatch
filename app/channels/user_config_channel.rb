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
    self.receive_all_threads(user.threads)
  end

  def receive_all_threads(threads)
    socket = {
      threads: set_objects_JSON(threads, thread_keys),
      type: 'RECEIVE_ALL_THREADS'
    }
    UserConfigChannel.broadcast_to("user_config:#{params[:user]}", socket)
  end

  def receive_thread(thread)
    # create the new thread object from the current user
    # create any necessary associations via the invited users array
    # broadcast the newly created thread to each invited user

  end

  def update_thread
    # find the thread
    # make necessary changes
    # broadcast changes to associated users according to the 'user_threads' association
  end

  def delete_thread
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

  def thread_keys
    ['id', 'name', 'is_thread', 'created_at']
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
