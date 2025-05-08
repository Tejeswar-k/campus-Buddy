
import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { TaskList } from "@/components/tasks/TaskList";
import { AddTaskForm } from "@/components/tasks/AddTaskForm";
import { Task } from "@/components/tasks/types";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Write lab record for Physics experiment",
      category: "Academic",
      dueDate: "2025-05-20",
      completed: false
    },
    {
      id: "2",
      title: "Prepare for Database Management midterm exam",
      category: "Exam",
      dueDate: "2025-05-15",
      completed: false
    },
    {
      id: "3",
      title: "Complete programming assignment",
      category: "Assignment",
      dueDate: "2025-05-10",
      completed: true
    }
  ]);

  const addTask = (newTask: Omit<Task, "id">) => {
    const task = {
      ...newTask,
      id: Date.now().toString()
    };
    setTasks([...tasks, task]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-900">Tasks</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <AddTaskForm onAddTask={addTask} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList 
            tasks={tasks} 
            onToggleComplete={toggleTaskCompletion}
            onDeleteTask={deleteTask}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Tasks;
