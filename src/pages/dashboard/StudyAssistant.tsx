
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BookOpen, Lightbulb } from "lucide-react";

const StudyAssistant = () => {
  const handleLaunchAI = () => {
    window.open("https://partyrock.aws/u/AMARNATH269/T1dMkUA1k/WISE-UP", "_blank");
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Study Assistant</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            WISE-UP AI Study Assistant
          </CardTitle>
          <CardDescription>
            Your personal AI-powered learning companion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            WISE-UP is an advanced AI assistant designed to help students excel in their studies. 
            It provides instant answers to your questions, helps with homework, and offers personalized 
            learning guidance across various subjects.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex gap-3">
              <BookOpen className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-lg">Study Support</h3>
                <p className="text-muted-foreground">Get help with assignments, exam preparation, and understanding complex topics</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Lightbulb className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-lg">Personalized Learning</h3>
                <p className="text-muted-foreground">Receive tailored explanations and resources based on your learning needs</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={handleLaunchAI}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Launch WISE-UP AI Assistant
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyAssistant;
