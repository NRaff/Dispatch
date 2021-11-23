require 'byebug'

class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params) 
    if @user.save
      login!(@user)
      render :show
    else
      @err = @user.errors.messages
      render "api/errors/errors", :status => 422
      # render :json => {:errors => @user.errors.messages}, :status => 422
      # render :json => {:errors => @user.errors.full_messages}, :status => 422
    end
  end

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      @err = @user.errors.messages
      render "api/errors/errors", :status => 422
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      render json: {:sys_messages => "Account successfully deleted."}, :status => 200
      # redirect_to api_session
    else
      render json: {:errors => ["Something went wrong. Please try again"]}, :status => 403
    end
  end

  def user_params
    params.require(:user).permit(:display_name, :email, :password)
  end
end
