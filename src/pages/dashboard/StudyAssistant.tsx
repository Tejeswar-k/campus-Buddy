
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Lightbulb, BookOpen, History, Zap } from "lucide-react";

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
      
      // Generate a comprehensive response based on the query
      const generatedResponse = generateComprehensiveResponse(query);
      setResponse(generatedResponse);
      
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

  // Enhanced function to generate comprehensive academic and general knowledge responses
  const generateComprehensiveResponse = (query: string): string => {
    const normalizedQuery = query.toLowerCase();
    
    // Engineering and computer science related queries
    if (normalizedQuery.includes("engineering") || normalizedQuery.includes("computer science")) {
      return "Engineering is a diverse field with various specializations including Computer Science, Mechanical, Civil, Electrical, and more. The Computer Science program typically covers fundamentals of programming, data structures, algorithms, database management, artificial intelligence, and software engineering.\n\nStudents engage in practical projects throughout their course to gain hands-on experience. Most universities maintain strong ties with technology companies for internships and placement opportunities. Computer Science particularly focuses on computational theory, programming languages, and software development methodologies.";
    }
    
    // Study related queries
    if (normalizedQuery.includes("exam") || normalizedQuery.includes("study") || normalizedQuery.includes("tips")) {
      return "Here are some effective study tips for university exams:\n\n1. Create a study schedule and stick to it\n2. Break down complex topics into smaller, manageable parts\n3. Use active learning techniques like teaching concepts to someone else\n4. Take regular breaks using techniques like the Pomodoro method\n5. Utilize past papers and practice tests\n6. Form study groups for collaborative learning\n7. Maintain a healthy lifestyle with proper sleep, nutrition and exercise\n8. Review your notes regularly instead of cramming\n9. Use visualization and memory techniques for difficult concepts\n10. Make connections between different topics to understand the bigger picture";
    }
    
    // Math related queries
    if (normalizedQuery.includes("math") || normalizedQuery.includes("mathematics") || normalizedQuery.includes("calculus")) {
      return "Mathematics is a fundamental discipline in many fields of study. Key areas include:\n\n1. Calculus: Differential and integral calculus, multiple integrals, and vector calculus\n2. Linear Algebra: Matrices, determinants, eigenvalues, and eigenvectors\n3. Differential Equations: Ordinary and partial differential equations\n4. Probability and Statistics: Random variables, probability distributions, hypothesis testing\n5. Numerical Methods: Numerical solution of equations, interpolation, and numerical integration\n6. Discrete Mathematics: Graph theory, combinatorics, and formal logic\n7. Real and Complex Analysis: Limits, continuity, and functions of complex variables\n\nThese mathematical foundations are essential for applications in physics, engineering, computer science, economics, and many other fields.";
    }
    
    // Physics related queries
    if (normalizedQuery.includes("physics") || normalizedQuery.includes("mechanics") || normalizedQuery.includes("electricity")) {
      return "Physics covers several important areas of study:\n\n1. Mechanics: Newton's laws, kinematics, dynamics, work and energy\n2. Thermodynamics: Laws of thermodynamics, heat transfer, enthalpy and entropy\n3. Electromagnetism: Electric fields, magnetic fields, Maxwell's equations\n4. Modern Physics: Quantum mechanics, relativity, atomic and nuclear physics\n5. Waves and Optics: Wave properties, interference, diffraction, optical instruments\n6. Astrophysics: Stellar evolution, cosmology, dark matter and dark energy\n7. Particle Physics: Elementary particles, quantum field theory, the Standard Model\n\nThese concepts provide the theoretical foundation for understanding the universe from subatomic particles to cosmic scales.";
    }
    
    // Chemistry related queries
    if (normalizedQuery.includes("chemistry") || normalizedQuery.includes("chemical")) {
      return "Chemistry encompasses various branches of study:\n\n1. General Chemistry: Atomic structure, periodic table, chemical bonding\n2. Organic Chemistry: Hydrocarbons, functional groups, polymers, reaction mechanisms\n3. Physical Chemistry: Thermodynamics, kinetics, electrochemistry, quantum chemistry\n4. Analytical Chemistry: Quantitative and qualitative analysis techniques, spectroscopy\n5. Materials Science: Properties of materials, corrosion, composites, nanomaterials\n6. Biochemistry: Structure and function of biomolecules, metabolism, enzymology\n7. Inorganic Chemistry: Coordination compounds, organometallics, solid-state chemistry\n\nChemistry knowledge is fundamental to understanding the composition, structure, properties, and changes of matter.";
    }
    
    // Programming related queries
    if (normalizedQuery.includes("programming") || normalizedQuery.includes("coding") || normalizedQuery.includes("java") || normalizedQuery.includes("python") || normalizedQuery.includes("c++")) {
      return "Programming is a core skill for computer science and many other disciplines. Key programming concepts include:\n\n1. Programming Languages: Java, Python, C++, JavaScript are commonly taught and used\n2. Data Structures: Arrays, linked lists, stacks, queues, trees, graphs, hash tables\n3. Algorithms: Sorting, searching, graph algorithms, dynamic programming, greedy algorithms\n4. Object-Oriented Programming: Classes, objects, inheritance, polymorphism, encapsulation\n5. Database Programming: SQL, database design, data manipulation, normalization\n6. Web Development: HTML, CSS, JavaScript, frameworks like React and Angular\n7. Software Engineering: Design patterns, testing methodologies, version control, agile practices\n8. Parallel and Distributed Computing: Concurrency, threading, distributed systems\n\nPractical programming projects help develop problem-solving skills and prepare for various technical roles in the industry.";
    }
    
    // Electronics related queries
    if (normalizedQuery.includes("electronics") || normalizedQuery.includes("circuits") || normalizedQuery.includes("digital")) {
      return "Electronics engineering covers these key areas:\n\n1. Circuit Analysis: Ohm's law, Kirchhoff's laws, circuit theorems, network analysis\n2. Electronic Devices: Diodes, transistors, operational amplifiers, sensors, actuators\n3. Digital Electronics: Boolean algebra, logic gates, flip-flops, counters, registers\n4. Microprocessors and Microcontrollers: Architecture, instruction sets, interfacing\n5. Communication Systems: Modulation, transmission, signal processing, error correction\n6. VLSI Design: Integrated circuit design, fabrication technology, layout techniques\n7. Embedded Systems: Real-time operating systems, firmware development, IoT applications\n8. Power Electronics: Converters, inverters, motor drives, renewable energy systems\n\nLaboratory work typically includes circuit design, simulation, PCB design, and hardware programming.";
    }
    
    // Management related queries
    if (normalizedQuery.includes("management") || normalizedQuery.includes("business") || normalizedQuery.includes("mba")) {
      return "Management education covers these essential areas:\n\n1. Business Fundamentals: Economics, accounting, finance, business law\n2. Organizational Behavior: Leadership, motivation, team dynamics, organizational culture\n3. Marketing Management: Market research, consumer behavior, marketing strategy, digital marketing\n4. Financial Management: Financial analysis, investment decisions, risk management, financial markets\n5. Operations Management: Process design, quality control, supply chain management, logistics\n6. Human Resource Management: Recruitment, training, performance evaluation, compensation\n7. Strategic Management: Competitive analysis, corporate strategy, global business environment\n8. Entrepreneurship: Business model design, startup management, innovation, venture capital\n\nCase studies, industry projects, and internships provide practical business experience and application of theory.";
    }
    
    // Medicine and healthcare related queries
    if (normalizedQuery.includes("medicine") || normalizedQuery.includes("medical") || normalizedQuery.includes("healthcare") || normalizedQuery.includes("doctor")) {
      return "Medical education typically includes these key components:\n\n1. Basic Sciences: Anatomy, physiology, biochemistry, microbiology, pharmacology\n2. Clinical Sciences: Internal medicine, surgery, pediatrics, obstetrics, psychiatry\n3. Diagnostic Methods: Laboratory diagnostics, imaging techniques, physical examination\n4. Therapeutics: Pharmacology, treatment protocols, intervention techniques, personalized medicine\n5. Community Medicine: Public health, epidemiology, preventive medicine, health policy\n6. Medical Ethics: Patient rights, confidentiality, ethical dilemmas, medical law\n7. Clinical Training: Hospital rotations, patient interaction, case studies, simulations\n8. Evidence-Based Medicine: Critical appraisal of research, clinical decision making\n\nMedical programs integrate theoretical knowledge with practical clinical experience to develop competent healthcare professionals.";
    }
    
    // History related queries
    if (normalizedQuery.includes("history") || normalizedQuery.includes("historical") || normalizedQuery.includes("ancient") || normalizedQuery.includes("civilization")) {
      return "Historical studies encompass various periods and civilizations:\n\n1. Ancient Civilizations: Mesopotamia, Egypt, Greece, Rome, China, and India\n2. Medieval Period: European feudalism, Islamic Golden Age, Byzantine Empire, Mongol Empire\n3. Renaissance and Enlightenment: Scientific revolution, arts and cultural developments\n4. Modern History: Industrial Revolution, World Wars, Cold War, Decolonization\n5. Contemporary History: Globalization, technological advancements, current geopolitics\n6. Thematic History: Economic history, social history, cultural history, military history\n7. Historiography: Methods of historical research, historical schools of thought\n\nHistorical analysis involves examining primary sources, understanding historiography, and contextualizing events within broader social, economic, and political frameworks.";
    }
    
    // Geography and environmental science queries
    if (normalizedQuery.includes("geography") || normalizedQuery.includes("environment") || normalizedQuery.includes("climate") || normalizedQuery.includes("ecosystem")) {
      return "Geography and environmental science cover these key areas:\n\n1. Physical Geography: Landforms, climate systems, natural disasters, biogeography\n2. Human Geography: Population patterns, urbanization, cultural landscapes, economic geography\n3. Environmental Science: Ecosystems, biodiversity, conservation biology, pollution\n4. Climate Science: Global climate patterns, climate change, atmospheric processes, paleoclimatology\n5. Geographic Information Systems (GIS): Spatial analysis, remote sensing, cartography, geospatial technology\n6. Sustainable Development: Resource management, environmental policy, green technology, ecological economics\n7. Regional Geography: Study of specific regions, their characteristics and interactions\n\nThese fields are increasingly important for addressing global challenges like climate change, biodiversity loss, sustainable urbanization, and resource management.";
    }
    
    // Literature and language queries
    if (normalizedQuery.includes("literature") || normalizedQuery.includes("language") || normalizedQuery.includes("writing") || normalizedQuery.includes("grammar")) {
      return "Literature and language studies include these central components:\n\n1. Literary Theory: Approaches to analyzing and interpreting texts, critical theory\n2. World Literature: Major works and authors across different cultures and time periods\n3. Linguistics: Phonetics, phonology, syntax, semantics, morphology, and language acquisition\n4. Comparative Literature: Cross-cultural literary traditions, translation studies, global influences\n5. Creative Writing: Fiction, poetry, drama, and non-fiction techniques, publication processes\n6. Rhetoric and Composition: Persuasive writing, argumentation, style, discourse analysis\n7. Literary History: Evolution of literary movements, genres, and traditions\n8. Digital Humanities: Computational approaches to textual analysis, digital archives\n\nThese disciplines develop critical thinking, communication skills, and cultural awareness through the study of language and literary expression.";
    }
    
    // Philosophy and ethics queries
    if (normalizedQuery.includes("philosophy") || normalizedQuery.includes("ethics") || normalizedQuery.includes("moral") || normalizedQuery.includes("metaphysics")) {
      return "Philosophy encompasses various branches of inquiry:\n\n1. Metaphysics: Nature of reality, existence, time, and space, ontology\n2. Epistemology: Theory of knowledge, belief, justification, skepticism, rationalism vs. empiricism\n3. Ethics: Moral principles, values, normative theories, applied ethics\n4. Logic: Principles of valid reasoning, symbolic logic, fallacies, argumentation theory\n5. Political Philosophy: Justice, rights, authority, and governance, social contract theory\n6. Philosophy of Mind: Consciousness, identity, mind-body problem, artificial intelligence\n7. Aesthetics: Nature of beauty, art, taste, and aesthetic experience\n8. Philosophy of Science: Scientific method, scientific realism, theory choice, explanation\n\nPhilosophical inquiry develops critical thinking skills and helps address fundamental questions about human existence, knowledge, and values across cultures and time periods.";
    }
    
    // Psychology queries
    if (normalizedQuery.includes("psychology") || normalizedQuery.includes("mental") || normalizedQuery.includes("behavior") || normalizedQuery.includes("cognitive")) {
      return "Psychology explores various aspects of human behavior and mental processes:\n\n1. Cognitive Psychology: Perception, attention, memory, language, problem-solving\n2. Developmental Psychology: Growth and change across the lifespan, stages of development\n3. Social Psychology: Interpersonal behavior, group dynamics, social influence, attitudes\n4. Clinical Psychology: Assessment, diagnosis, and treatment of mental disorders, therapy modalities\n5. Neuropsychology: Brain-behavior relationships, neural mechanisms, cognitive neuroscience\n6. Personality Psychology: Individual differences, trait theories, psychodynamic approaches\n7. Health Psychology: Psychological factors in health, illness, and healthcare\n8. Research Methods: Experimental design, statistical analysis, qualitative methods, ethics\n\nPsychological principles have applications in education, healthcare, business, sports, and many other fields affecting everyday human experience.";
    }
    
    // Artificial Intelligence queries
    if (normalizedQuery.includes("artificial intelligence") || normalizedQuery.includes("ai") || normalizedQuery.includes("machine learning") || normalizedQuery.includes("neural network")) {
      return "Artificial Intelligence encompasses multiple subfields and approaches:\n\n1. Machine Learning: Algorithms that improve through experience, supervised and unsupervised learning\n2. Deep Learning: Neural network architectures with multiple layers, convolutional and recurrent networks\n3. Natural Language Processing: Text analysis, generation, translation, sentiment analysis\n4. Computer Vision: Image and video analysis, object recognition, scene understanding\n5. Reinforcement Learning: Decision-making through rewards and penalties, agent-based systems\n6. Knowledge Representation: Ontologies, semantic networks, reasoning systems\n7. AI Ethics: Fairness, accountability, transparency, privacy, and safety concerns\n8. Applied AI: Industry applications in healthcare, finance, transportation, education\n\nAI technologies continue to advance rapidly, transforming numerous industries and creating new research directions at the intersection of computer science, cognitive science, and other disciplines.";
    }
    
    // Economics and finance queries
    if (normalizedQuery.includes("economics") || normalizedQuery.includes("finance") || normalizedQuery.includes("market") || normalizedQuery.includes("banking")) {
      return "Economics and finance cover these essential areas:\n\n1. Microeconomics: Individual market behavior, supply and demand, price theory, consumer choice\n2. Macroeconomics: National economies, GDP, inflation, monetary and fiscal policy\n3. International Economics: Trade theory, global markets, exchange rates, economic integration\n4. Corporate Finance: Capital structure, investment decisions, risk management, valuation\n5. Banking and Financial Markets: Financial intermediation, central banking, market efficiency\n6. Behavioral Economics: Psychological factors in economic decision-making, market anomalies\n7. Economic Development: Growth theories, inequality, poverty reduction, sustainable development\n8. Econometrics: Statistical methods for analyzing economic data, forecasting, causal inference\n\nThese disciplines provide analytical frameworks for understanding economic systems and financial decision-making at individual, institutional, and governmental levels.";
    }
    
    // Biology and life sciences queries
    if (normalizedQuery.includes("biology") || normalizedQuery.includes("life science") || normalizedQuery.includes("genetic") || normalizedQuery.includes("ecology")) {
      return "Biology and life sciences encompass diverse fields of study:\n\n1. Cell Biology: Cell structure, function, metabolism, and cellular processes\n2. Genetics: Inheritance, gene expression, genomics, and molecular genetics\n3. Evolutionary Biology: Natural selection, adaptation, speciation, phylogenetics\n4. Ecology: Ecosystem dynamics, population biology, conservation, biodiversity\n5. Physiology: Organ systems, homeostasis, comparative physiology\n6. Microbiology: Bacteria, viruses, fungi, microbial ecology and biotechnology\n7. Biotechnology: Genetic engineering, CRISPR, bioinformatics, biomedical applications\n8. Neurobiology: Neural structure, function, development, and behavior\n\nThese biological disciplines help us understand living systems from molecular mechanisms to global ecosystems, with applications in medicine, agriculture, conservation, and biotechnology.";
    }
    
    // Political science queries
    if (normalizedQuery.includes("political") || normalizedQuery.includes("government") || normalizedQuery.includes("international relations") || normalizedQuery.includes("policy")) {
      return "Political science examines these key areas:\n\n1. Political Theory: Ideologies, concepts of justice, power, and authority\n2. Comparative Politics: Political systems, institutions, and processes across countries\n3. International Relations: Diplomacy, international organizations, global governance\n4. Public Policy: Policy formulation, implementation, evaluation, public administration\n5. Political Behavior: Voting, public opinion, political psychology, political communication\n6. Political Economy: Intersection of politics and economics, development policy\n7. Security Studies: War, conflict resolution, terrorism, cybersecurity\n8. Human Rights and Justice: Civil liberties, social movements, transitional justice\n\nPolitical science provides frameworks for understanding governance systems, political behavior, and policy outcomes at local, national, and international levels.";
    }
    
    // General knowledge response
    return "I'm your AI Academic Assistant, designed to help with a wide range of subjects including:\n\n• Mathematics and Sciences (Physics, Chemistry, Biology)\n• Engineering and Computer Science\n• Medicine and Healthcare\n• Business and Management\n• Humanities (History, Literature, Philosophy)\n• Social Sciences (Psychology, Economics, Political Science)\n• Study techniques and exam preparation\n\nYour query was about \"" + query + "\" - please try asking a more specific question about any academic subject, and I'll provide a detailed response tailored to your needs.";
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-blue-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
          <CardTitle className="text-2xl text-blue-900">AI Academic Assistant</CardTitle>
          <CardDescription className="text-blue-700">
            Ask any academic question - from math and science to humanities and beyond
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Ask about any subject, topic, or academic question..."
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
                  <Zap className="mr-2 h-4 w-4" />
                  Get Answer
                </>
              )}
            </Button>
          </form>

          {response && (
            <Card className="mt-6 bg-amber-50 border-amber-200">
              <CardHeader className="pb-2 border-b border-amber-200">
                <CardTitle className="text-lg text-amber-900 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Academic Response
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="prose max-w-none text-blue-900">
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
                  <BookOpen className="mr-2 h-4 w-4" />
                  Academic Subjects
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  Math, Science, Engineering, Humanities, and more
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center text-green-800 font-medium">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Study Techniques
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Exam prep, note-taking, memory improvement tips
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center text-purple-800 font-medium">
                  <History className="mr-2 h-4 w-4" />
                  Knowledge Base
                </div>
                <p className="text-sm text-purple-700 mt-1">
                  Comprehensive information across academic disciplines
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
