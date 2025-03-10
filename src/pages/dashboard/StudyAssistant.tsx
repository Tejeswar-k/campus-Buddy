
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

  // Enhanced function to generate academic responses
  const generateSampleResponse = (query: string): string => {
    const normalizedQuery = query.toLowerCase();
    
    // SRM University related queries
    if (normalizedQuery.includes("srm") || normalizedQuery.includes("university")) {
      return "SRM University is a private university in India with its main campus located in Kattankulathur, Tamil Nadu. It offers programs in engineering, management, medicine, and humanities. The university is known for its focus on research and innovation, with state-of-the-art facilities and strong industry connections. SRM University has multiple campuses across India and has partnerships with international universities for student exchange programs.";
    } 
    
    // Engineering and computer science related queries
    if (normalizedQuery.includes("engineering") || normalizedQuery.includes("computer science")) {
      return "Engineering at SRM University offers various specializations including Computer Science, Mechanical, Civil, Electrical, and more. The Computer Science program covers fundamentals of programming, data structures, algorithms, database management, artificial intelligence, and software engineering.\n\nStudents engage in practical projects throughout their course to gain hands-on experience. The department maintains strong ties with technology companies for internships and placement opportunities.";
    }
    
    // Study related queries
    if (normalizedQuery.includes("exam") || normalizedQuery.includes("study") || normalizedQuery.includes("tips")) {
      return "Here are some effective study tips for university exams:\n\n1. Create a study schedule and stick to it\n2. Break down complex topics into smaller, manageable parts\n3. Use active learning techniques like teaching concepts to someone else\n4. Take regular breaks using techniques like the Pomodoro method\n5. Utilize past papers and practice tests\n6. Form study groups for collaborative learning\n7. Maintain a healthy lifestyle with proper sleep, nutrition and exercise\n8. Review your notes regularly instead of cramming\n9. Use visualization and memory techniques for difficult concepts";
    }
    
    // Math related queries
    if (normalizedQuery.includes("math") || normalizedQuery.includes("mathematics") || normalizedQuery.includes("calculus")) {
      return "Mathematics is a fundamental discipline in engineering education. Key areas covered include:\n\n1. Calculus: Differential and integral calculus, multiple integrals, and vector calculus\n2. Linear Algebra: Matrices, determinants, eigenvalues, and eigenvectors\n3. Differential Equations: Ordinary and partial differential equations\n4. Probability and Statistics: Random variables, probability distributions, hypothesis testing\n5. Numerical Methods: Numerical solution of equations, interpolation, and numerical integration\n\nThese mathematical foundations are essential for engineering applications such as signal processing, control systems, and computational modeling.";
    }
    
    // Physics related queries
    if (normalizedQuery.includes("physics") || normalizedQuery.includes("mechanics") || normalizedQuery.includes("electricity")) {
      return "Physics in engineering education covers several important areas:\n\n1. Mechanics: Newton's laws, kinematics, dynamics, work and energy\n2. Thermodynamics: Laws of thermodynamics, heat transfer, enthalpy and entropy\n3. Electromagnetism: Electric fields, magnetic fields, Maxwell's equations\n4. Modern Physics: Quantum mechanics, relativity, atomic and nuclear physics\n5. Waves and Optics: Wave properties, interference, diffraction, optical instruments\n\nThese concepts provide the theoretical foundation for various engineering applications and technologies.";
    }
    
    // Chemistry related queries
    if (normalizedQuery.includes("chemistry") || normalizedQuery.includes("chemical")) {
      return "Chemistry in engineering covers:\n\n1. General Chemistry: Atomic structure, periodic table, chemical bonding\n2. Organic Chemistry: Hydrocarbons, functional groups, polymers\n3. Physical Chemistry: Thermodynamics, kinetics, electrochemistry\n4. Analytical Chemistry: Quantitative and qualitative analysis techniques\n5. Materials Science: Properties of engineering materials, corrosion, composites\n\nChemistry knowledge is particularly important for chemical engineering, materials science, biomedical engineering, and environmental engineering.";
    }
    
    // Programming related queries
    if (normalizedQuery.includes("programming") || normalizedQuery.includes("coding") || normalizedQuery.includes("java") || normalizedQuery.includes("python") || normalizedQuery.includes("c++")) {
      return "Programming is a core skill for computer science and many engineering disciplines. Key programming concepts include:\n\n1. Programming Languages: Java, Python, C++, JavaScript are commonly taught\n2. Data Structures: Arrays, linked lists, stacks, queues, trees, graphs\n3. Algorithms: Sorting, searching, graph algorithms, dynamic programming\n4. Object-Oriented Programming: Classes, objects, inheritance, polymorphism\n5. Database Programming: SQL, database design, data manipulation\n6. Web Development: HTML, CSS, JavaScript, frameworks like React and Angular\n7. Software Engineering: Design patterns, testing, version control\n\nPractical programming projects help students develop problem-solving skills and prepare for industry roles.";
    }
    
    // Electronics related queries
    if (normalizedQuery.includes("electronics") || normalizedQuery.includes("circuits") || normalizedQuery.includes("digital")) {
      return "Electronics engineering covers:\n\n1. Circuit Analysis: Ohm's law, Kirchhoff's laws, circuit theorems\n2. Electronic Devices: Diodes, transistors, operational amplifiers\n3. Digital Electronics: Boolean algebra, logic gates, flip-flops, counters\n4. Microprocessors: Architecture, instruction sets, interfacing\n5. Communication Systems: Modulation, transmission, signal processing\n6. VLSI Design: Integrated circuit design, fabrication technology\n7. Embedded Systems: Microcontrollers, real-time operating systems\n\nLaboratory work includes circuit design, simulation, PCB design, and hardware programming.";
    }
    
    // Management related queries
    if (normalizedQuery.includes("management") || normalizedQuery.includes("business") || normalizedQuery.includes("mba")) {
      return "Management education at SRM covers:\n\n1. Business Fundamentals: Economics, accounting, finance\n2. Organizational Behavior: Leadership, motivation, team dynamics\n3. Marketing Management: Market research, consumer behavior, marketing strategy\n4. Financial Management: Financial analysis, investment decisions, risk management\n5. Operations Management: Process design, quality control, supply chain\n6. Human Resource Management: Recruitment, training, performance evaluation\n7. Strategic Management: Competitive analysis, corporate strategy\n8. Entrepreneurship: Business model design, startup management\n\nCase studies, industry projects, and internships provide practical business experience.";
    }
    
    // Medicine and healthcare related queries
    if (normalizedQuery.includes("medicine") || normalizedQuery.includes("medical") || normalizedQuery.includes("healthcare") || normalizedQuery.includes("doctor")) {
      return "Medical education at SRM includes:\n\n1. Basic Sciences: Anatomy, physiology, biochemistry, microbiology\n2. Clinical Sciences: Internal medicine, surgery, pediatrics, obstetrics\n3. Diagnostic Methods: Laboratory diagnostics, imaging techniques\n4. Therapeutics: Pharmacology, treatment protocols, intervention techniques\n5. Community Medicine: Public health, epidemiology, preventive medicine\n6. Medical Ethics: Patient rights, confidentiality, ethical dilemmas\n7. Clinical Training: Hospital rotations, patient interaction, case studies\n\nThe program follows a curriculum that integrates theoretical knowledge with practical clinical experience in the university's teaching hospital.";
    }
    
    // General academic query response
    return "I'm your AI Study Assistant. I can help you with information about academic subjects, study techniques, or university-related questions. Your query was about \"" + query + "\" - please be more specific with your question, and I'll provide a more detailed response on that topic. You can ask about:\n\n- Specific subjects (Math, Physics, Engineering, Computer Science, etc.)\n- Study techniques and exam preparation\n- SRM University programs and facilities\n- Career guidance in your field of study";
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
