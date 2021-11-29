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
    usersObj = set_objects_JSON(users, permittedUserKeys)
    socket = {
      users: usersObj,
      type: 'RECEIVE_ALL_USERS'
    }
    UserConfigChannel.broadcast_to("user_config:#{params[:user]}", socket)
  end

  def receive_user
    user = User.find(params[:user])
    userObj = set_object_JSON(user, currentUserKeys)
    socket = {
      user: userObj,
      type: 'RECEIVE_USER'
    }
    UserConfigChannel.broadcast_to("user_config:#{params[:user]}", socket)
  end

  def receive_all_threads

  end

  def receive_thread

  end

  def update_thread

  end

  def delete_thread

  end

  # ! consider move this to super class
  def set_objects_JSON(objects, permitKeys)
    allObjects = Hash.new()
    objects.each do |obj|
      subObj = Hash.new()
      obj.attributes.each do |key, val|
        if permitKeys.include?(key)
          subObj[key.camelize(:lower)] = val
        end
      end
      allObjects[obj.id] = subObj
    end
    allObjects
  end

  def set_object_JSON(object, permitKeys)
    obj = Hash.new()
    object.attributes.each do |key, val|
      if permitKeys.include?(key)
        obj[key.camelize(:lower)] = val
      end
    end
    obj
  end

  def permittedUserKeys
    ['id','display_name']
  end

  def currentUserKeys
    ['id', 'display_name', 'email','created_at',]
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    # byebug
  end
end
