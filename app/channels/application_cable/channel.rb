module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def error_socket(errors, status, user, type)
      return {
        errors: errors,
        status: status,
        currentUser: user,
        type: type
      }
    end

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
  end
end
