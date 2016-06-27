Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
  	resources :users
    resource :session
    resources :tasks
    resources :timer, only: [:show]
  end

end
