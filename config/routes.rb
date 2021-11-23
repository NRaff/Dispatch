Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :users, except: [:new, :edit]
    resources :message_threads, only: [:create, :update, :destroy]
    resources :messages, only: [:create, :update, :destroy]
  end

  mount ActionCable.server, at: '/cable'
end
