
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const StudyAssistant = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({
        title: "Empty query",
        description: "Please enter a question or topic to get help with.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse(""); // Clear previous response
    
    try {
      // For demo purposes, generate a response locally since we don't have a backend API
      // In a real application, this would call your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      // Generate a sample response based on the query
      const sampleResponse = generateSampleResponse(query);
      setResponse(sampleResponse);
      
      toast({
        title: "Response generated",
        description: "Your answer is ready!",
      });
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate sample responses for demonstration purposes
  const generateSampleResponse = (query: string): string => {
    const normalizedQuery = query.toLowerCase();
    
    if (normalizedQuery.includes("srm") || normalizedQuery.includes("university")) {
      return "SRM University is a private university in India with its main campus located in Kattankulathur, Tamil Nadu. It offers programs in engineering, management, medicine, and humanities. The university is known for its focus on research and innovation, with state-of-the-art facilities and strong industry connections. SRM University has multiple campuses across India and has partnerships with international universities for student exchange programs.";
    } 
    
    if (normalizedQuery.includes("engineering") || normalizedQuery.includes("computer science")) {
      return "Engineering at SRM University offers various specializations including Computer Science, Mechanical, Civil, Electrical, and more. The Computer Science program covers fundamentals of programming, data structures, algorithms, database management, artificial intelligence, and software engineering.\n\nStudents engage in practical projects throughout their course to gain hands-on experience. The department maintains strong ties with technology companies for internships and placement opportunities.";
    }
    
    if (normalizedQuery.includes("exam") || normalizedQuery.includes("study") || normalizedQuery.includes("tips")) {
      return "Here are some effective study tips for university exams:\n\n1. Create a study schedule and stick to it\n2. Break down complex topics into smaller, manageable parts\n3. Use active learning techniques like teaching concepts to someone else\n4. Take regular breaks using techniques like the Pomodoro method\n5. Utilize past papers and practice tests\n6. Form study groups for collaborative learning\n7. Maintain a healthy lifestyle with proper sleep, nutrition and exercise\n8. Review your notes regularly instead of cramming\n9. Use visualization and memory techniques for difficult concepts";
    }
    
    return "I'm your AI Study Assistant. I can help you with information about academic subjects, study techniques, or university-related questions. Your query was about \"" + query + "\" - please be more specific with your question, and I'll provide a more detailed response on that topic.";
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-blue-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
          <CardTitle className="text-2xl text-blue-900">AI Study Assistant</CardTitle>
          <CardDescription className="text-blue-700">
            Get help with your studies, ask questions, or get explanations on any topic
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Ask anything about your studies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[120px] border-blue-200 focus:border-blue-400 focus:ring-blue-300"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Response...
                </>
              ) : (
                "Get Help"
              )}
            </Button>
          </form>

          {response && (
            <Card className="mt-6 bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <div className="prose max-w-none text-blue-900">
                  {response.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyAssistant;
