
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
      <div className="w-full max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-8 flex justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/e/e1/SRM_University_Logo.png" 
              alt="SRM University" 
              className="h-20"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/200x80?text=SRM+University";
              }}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
            Welcome to Campus Companion
          </h1>
          <p className="text-xl text-blue-700 mb-4 max-w-2xl mx-auto">
            Your all-in-one companion for SRM University - from AI-powered study assistance to campus navigation and events.
          </p>
          <p className="text-lg text-blue-600 mb-8 max-w-3xl mx-auto">
            SRM Institute of Science and Technology (formerly known as SRM University) is one of India's top universities with over 52,000 students across multiple campuses. Our main campus at Kattankulathur, Chennai offers world-class education with modern facilities.
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="text-lg px-8 py-6 border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700"
            >
              Sign Up
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
