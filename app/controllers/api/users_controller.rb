require 'byebug'

class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params) 
    if @user.save
      render :show
    else
      flash.now[:errors] = @user.errors.full_messages
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
    byebug
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      flash.now[:errors] = @user.errors.full_messages
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.delete
      flash[:messages] = "Account successfully deleted."
      # redirect_to api_session
    else
      flash.now[:errors] = "Something went wrong. Please try again"
    end
  end

  def user_params
    params.require(:user).permit(:display_name, :email, :password, :username)
  end
end
