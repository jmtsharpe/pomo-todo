json.extract!( user, :username, :id )


json.tasks do
 	json.array!(user.tasks) do |task|
	  	json.partial!('api/tasks', task: task)
	end
end

