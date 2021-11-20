json.set! :errors do
  json.extract! @err, *@err.keys
end
