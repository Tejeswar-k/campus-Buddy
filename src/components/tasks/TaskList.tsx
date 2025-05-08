
import { Check, Trash } from "lucide-react";
import { Task } from "./types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList = ({ tasks, onToggleComplete, onDeleteTask }: TaskListProps) => {
  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "MMM dd, yyyy");
    } catch (error) {
      return dateStr;
    }
  };

  if (tasks.length === 0) {
    return <div className="text-center py-8 text-gray-500">No tasks yet. Add a task to get started!</div>;
  }

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow 
              key={task.id}
              className={cn(task.completed && "bg-gray-50/50")}
            >
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full h-8 w-8 p-0 border", 
                    task.completed 
                      ? "border-green-500 bg-green-50 hover:bg-green-100" 
                      : "border-gray-300 hover:bg-gray-100"
                  )}
                  onClick={() => onToggleComplete(task.id)}
                >
                  {task.completed && <Check className="h-4 w-4 text-green-500" />}
                </Button>
              </TableCell>
              <TableCell className={cn(task.completed && "text-gray-500 line-through")}>
                {task.title}
              </TableCell>
              <TableCell>
                <span className={cn(
                  "px-2 py-1 text-xs rounded-full",
                  {
                    "bg-blue-100 text-blue-800": task.category === "Academic",
                    "bg-amber-100 text-amber-800": task.category === "Exam",
                    "bg-purple-100 text-purple-800": task.category === "Assignment",
                    "bg-gray-100 text-gray-800": !["Academic", "Exam", "Assignment"].includes(task.category)
                  }
                )}>
                  {task.category}
                </span>
              </TableCell>
              <TableCell className={cn(task.completed && "text-gray-500")}>
                {formatDate(task.dueDate)}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
