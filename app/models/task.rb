class Task < ActiveRecord::Base
  validates :subject, :pomodoros, presence: true

end
