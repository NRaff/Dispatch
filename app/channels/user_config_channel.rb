require 'byebug'

class UserConfigChannel < ApplicationCable::Channel
  def subscribed
    stream_for "user_config:#{params[:user]}"
  end

  def receive_all_users
    users = User.all
    usersObj = set_objects_JSON(users, permittedUserKeys)
    socket = {
      users: usersObj,
      type: 'RECEIVE_ALL_USERS'
    }
    UserConfigChannel.broadcast_to("user_config:#{params[:user]}")
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
        if permitKeys.includes(key)
          subObj[key.camelize(:lower)] = val
        end
      end
      allObjects[obj.id] = subObj
    end
    allObjects
  end

  def permittedUserKeys
    ['id','display_name']
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
