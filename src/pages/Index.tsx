
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Campus Companion
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your all-in-one companion for SRM University - from AI-powered study assistance to campus events.
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="text-lg px-8 py-6"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="text-lg px-8 py-6 bg-gray-900 hover:bg-gray-800"
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
