class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render :json => {:errors => ["Invalid username or password"]}, :status => 422
      # render :new
    end
  end

  def destroy
    logout!
    render :json => {:sys_messages => ["Successfully logged out."]}, :status => 200
    # render :new
  end
end
