require 'byebug'

class Api::MessageThreadsController < ApplicationController
  def create
    @message_thread = current_user.threads.create(thread_params)
    if @message_thread.id
      render :show
    else
      @err = @message_thread.errors.messages
      render "api/errors/errors", :status =>  422
    end
  end

  def update
    @message_thread = MessageThread.find(params[:id])
    if @message_thread.update(thread_params)
      render :show
    else
      @err = @message_thread.errors.messages
      render "api/errors/errors", :status =>  422
    end
  end

  def destroy
    @message_thread = MessageThread.find(params[:id])
    if @message_thread.destroy
      render json: {:sys_messages => "Thread successfully deleted."}, :status => 200
    else
      render json: {:errors => ["Something went wrong. Please try again"]}, :status => 422
    end
  end

  def thread_params
    params.require(:thread).permit(:name)
  end
end
