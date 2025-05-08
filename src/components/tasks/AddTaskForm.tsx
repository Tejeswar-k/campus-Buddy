
import { useState } from "react";
import { Task } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, "id">) => void;
}

export const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const categories = ["Academic", "Exam", "Assignment", "Other"];
  
  const form = useForm({
    defaultValues: {
      title: "",
      category: "Academic",
      dueDate: ""
    }
  });

  const handleSubmit = form.handleSubmit((data) => {
    if (!data.title.trim()) {
      toast({
        title: "Task title is required",
        variant: "destructive"
      });
      return;
    }

    onAddTask({
      title: data.title,
      category: data.category,
      dueDate: data.dueDate,
      completed: false
    });
    
    toast({
      title: "Task added",
      description: "Your task has been added successfully"
    });
    
    form.reset();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Task Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="E.g., Complete lab report" 
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <select 
                    className="w-full h-10 px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    {...field}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">
            Add Task
          </Button>
        </div>
      </form>
    </Form>
  );
};
