class Api::MessagesController < ApplicationController
  def create
    @message = current_user.messages.create(message_params)
    if @message.id
      render :show
    else
      @err = @message.errors.messages
      render "api/errors/errors", :status => 422
    end
  end

  def update
    @message = Message.find(params[:id])
    if @message.update(message_params)
      render :show
    else
      @err = @message.errors.messages
      render "api/errors/errors", :status => 422
    end
  end

  def destroy
    @message = Message.find(params[:id])
    if @message.destroy
      render json: {:sys_messages => "Thread successfully deleted."}, :status => 200
    else
      render json: {:errors => ["Something went wrong. Please try again"]}, :status => 422
    end
  end

  def message_params
    # sender_id should always be pulled from the logged in user
    params.require(:message).permit(:thread_id, :message)
  end
end
