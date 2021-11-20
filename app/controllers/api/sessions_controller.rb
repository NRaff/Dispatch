class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render :json => {:errors => {:login => ["Invalid email or password."]}}, :status => 422
    end
  end

  def destroy
    if current_user
      logout!
      render :json => {:sys_messages => ["Successfully logged out."]}, :status => 200
    else
      render :json => {:errors => ["No user is logged in."]}, :status => 422
    end
  end
end
