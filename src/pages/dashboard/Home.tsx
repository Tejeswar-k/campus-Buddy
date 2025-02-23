
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Navigation2, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome to SRM Campus Connect</CardTitle>
          <CardDescription className="text-lg">Your all-in-one campus companion</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          <Card className="border shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-purple-600" />
              <CardTitle className="text-xl">Study Assistant</CardTitle>
              <CardDescription>Get AI-powered help with your studies</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/study">
                <Button className="w-full">Start Learning</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <Navigation2 className="w-8 h-8 text-blue-600" />
              <CardTitle className="text-xl">Campus Navigation</CardTitle>
              <CardDescription>Find your way around campus</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/navigate">
                <Button className="w-full">Start Navigation</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CalendarDays className="w-8 h-8 text-green-600" />
              <CardTitle className="text-xl">Club Events</CardTitle>
              <CardDescription>Discover campus activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/events">
                <Button className="w-full">View Events</Button>
              </Link>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
