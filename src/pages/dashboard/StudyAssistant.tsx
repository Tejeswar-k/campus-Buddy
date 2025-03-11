
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, BookOpen, Code, Terminal, Database } from "lucide-react";
import { getAIResponse } from "@/services/aiService";

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
        description: "Please enter a question about Computer Science topics.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse("");
    
    try {
      const result = await getAIResponse(query);
      
      if (result.success && result.data) {
        setResponse(result.data);
        toast({
          title: "Response generated",
          description: "Your answer is ready!",
        });
      } else {
        throw new Error(result.error || 'Failed to get response');
      }
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-blue-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-blue-200">
          <CardTitle className="text-2xl text-blue-900">BTech CS AI Assistant</CardTitle>
          <CardDescription className="text-blue-700">
            Your specialized Computer Science learning companion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Ask about any Computer Science topic (Data Structures, Algorithms, Software Engineering, etc)..."
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
                  Generating Response...
                </>
              ) : (
                <>
                  <Terminal className="mr-2 h-4 w-4" />
                  Get Answer
                </>
              )}
            </Button>
          </form>

          {response && (
            <Card className="mt-6 bg-slate-50 border-slate-200">
              <CardHeader className="pb-2 border-b border-slate-200">
                <CardTitle className="text-lg text-slate-900 flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  Response
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="prose max-w-none text-slate-900">
                  {response.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center text-blue-800 font-medium">
                  <Code className="mr-2 h-4 w-4" />
                  Core CS Subjects
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  DSA, OOP, Operating Systems, Networks
                </p>
              </CardContent>
            </Card>
            <Card className="bg-indigo-50 border-indigo-200">
              <CardContent className="p-4">
                <div className="flex items-center text-indigo-800 font-medium">
                  <Terminal className="mr-2 h-4 w-4" />
                  Development
                </div>
                <p className="text-sm text-indigo-700 mt-1">
                  Web, Mobile, Cloud, DevOps
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center text-purple-800 font-medium">
                  <Database className="mr-2 h-4 w-4" />
                  Advanced Topics
                </div>
                <p className="text-sm text-purple-700 mt-1">
                  AI/ML, System Design, Security
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyAssistant;
