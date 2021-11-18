class Api::SessionsController < ApplicationController
  def create
    @user = user.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      login!(@user)
      # render :show
    else
      flash.now[:errors] = ["Invalid username or password"]
      # render :new
    end
  end

  def destroy
    logout!
    # render :new
  end
end
