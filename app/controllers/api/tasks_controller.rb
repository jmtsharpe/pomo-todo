class Api::TasksController < ApplicationController

  def new
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render :show
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def edit
  end

  def update
		@task = Task.find(params[:id])

    if @task.update(task_params)
      flash[:success] = "Updated successfully"
      render :show
    else
      flash.now[:errors] = @task.errors.full_messsages
      render :show
    end
  end

  def index
    @tasks = Task.where(user_id: params[:userId])
    render :index
  end

  def show
    @task = Task.find(params[:id])
    render :show
  end

  def destroy
    if Task.find(params[:id]).destroy
      @tasks = Task.where(user_id: params[:userId])
      render :index
    end
  end

  private

  def task_params
    params.require(:task).permit( :subject, :pomodoros, :user_id )
  end

end
