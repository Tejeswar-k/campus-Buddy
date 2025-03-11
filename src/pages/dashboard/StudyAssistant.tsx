
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, BookOpen, Code, Terminal, Database, Server, Shield, Cloud } from "lucide-react";
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
      console.log("Sending query to PartyRock:", query);
      const result = await getAIResponse(query);
      
      if (result.success && result.data) {
        console.log("Received response:", result.data);
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
        <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white border-b border-blue-800">
          <CardTitle className="text-2xl">WISE-UP BTech CS AI Assistant</CardTitle>
          <CardDescription className="text-blue-100">
            Your specialized Computer Science learning companion powered by AWS PartyRock
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Ask about any Computer Science topic (DSA, OS, Software Engineering, Databases, etc)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[120px] border-blue-200 focus:border-blue-400 focus:ring-blue-300"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
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
            <Card className="mt-6 bg-gray-50 border-gray-200">
              <CardHeader className="pb-2 border-b border-gray-200 bg-gray-100">
                <CardTitle className="text-lg text-gray-900 flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  CS Assistant Response
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 prose max-w-none">
                <div className="whitespace-pre-line text-gray-800">
                  {response}
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="bg-blue-50 border-blue-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center text-blue-800 font-medium">
                  <Code className="mr-2 h-4 w-4" />
                  Core CS
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  DSA, OOP, OS, Networks
                </p>
              </CardContent>
            </Card>
            <Card className="bg-indigo-50 border-indigo-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center text-indigo-800 font-medium">
                  <Database className="mr-2 h-4 w-4" />
                  Development
                </div>
                <p className="text-sm text-indigo-700 mt-1">
                  Web, Mobile, Cloud, DevOps
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center text-purple-800 font-medium">
                  <Server className="mr-2 h-4 w-4" />
                  Advanced
                </div>
                <p className="text-sm text-purple-700 mt-1">
                  AI/ML, System Design, Security
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Card className="bg-green-50 border-green-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center text-green-800 font-medium">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Software Eng.
                </div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50 border-yellow-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center text-yellow-800 font-medium">
                  <Shield className="mr-2 h-4 w-4" />
                  Cybersecurity
                </div>
              </CardContent>
            </Card>
            <Card className="bg-cyan-50 border-cyan-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center text-cyan-800 font-medium">
                  <Cloud className="mr-2 h-4 w-4" />
                  Cloud Computing
                </div>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border-red-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center text-red-800 font-medium">
                  <Terminal className="mr-2 h-4 w-4" />
                  Algorithms
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyAssistant;
