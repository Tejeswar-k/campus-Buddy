
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    registerNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate email domain
      if (!formData.email.endsWith('@srmist.edu.in')) {
        toast({
          title: "Invalid email",
          description: "Please use your SRM University email (@srmist.edu.in)",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            register_number: formData.registerNumber,
          },
          emailRedirectTo: window.location.origin + '/dashboard',
        },
      });
      
      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // After successful signup, automatically log in the user
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) {
          toast({
            title: "Auto login failed",
            description: "Account created successfully! Please login with your credentials.",
            variant: "default",
          });
          navigate("/login");
        } else {
          toast({
            title: "Sign up successful",
            description: "Welcome to Campus Buddy!",
          });
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      toast({
        title: "Sign up failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md border-blue-300 shadow-xl">
          <div className="h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-amber-300 rounded-t-lg"></div>
          <CardHeader>
            <CardTitle className="text-2xl text-center text-blue-900">Create your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-800">Full Name</label>
                <Input
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-800">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="your.email@srmist.edu.in"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
                <p className="text-xs text-blue-600">Please use your SRM University email (@srmist.edu.in)</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-800">Register Number</label>
                <Input
                  name="registerNumber"
                  placeholder="RA2211003010XXX"
                  value={formData.registerNumber}
                  onChange={handleChange}
                  required
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-800">Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
                <p className="text-xs text-blue-600">Password must be at least 6 characters long</p>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
              <p className="text-center text-sm text-blue-700">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-amber-600 hover:text-amber-700 hover:underline font-medium"
                  type="button"
                >
                  Login
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;
