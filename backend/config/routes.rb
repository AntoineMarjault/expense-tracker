Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  namespace :api do
    namespace :v1 do
      get "transactions/index"
    end
      namespace :v1 do
            post "/login", to: "authentications#create"
            post "/signup", to: "users#create"

            resources :users, only: :destroy
            resources :travels, only: %i[index show create update destroy] do
              get 'statistics', to: 'travel_statistics#show', on: :member
            end
            resources :categories, only: %i[index show]
            resources :transactions, only: %i[index show create update destroy]
            resources :countries, only: :index
            resources :currencies, only: :index
        end
    end
end
