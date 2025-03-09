
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md border-blue-300 shadow-xl">
          <div className="h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-amber-300 rounded-t-lg"></div>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/e/e1/SRM_University_Logo.png" 
                alt="SRM University" 
                className="h-16"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/150x60?text=SRM+University";
                }}
              />
            </div>
            <CardTitle className="text-2xl text-center text-blue-900">Login to Campus Companion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-800">Email</label>
                <Input
                  type="email"
                  placeholder="your.email@srmist.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-800">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
              <p className="text-center text-sm text-blue-700">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-amber-600 hover:text-amber-700 hover:underline font-medium"
                  type="button"
                >
                  Sign up
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
