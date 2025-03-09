
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Navigation2, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-900">Welcome to SRM Campus Connect</CardTitle>
          <CardDescription className="text-lg text-blue-700">Your all-in-one campus companion</CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-blue-200 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>
              <CardHeader className="pt-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <CardTitle className="text-xl text-blue-900">Study Assistant</CardTitle>
                <CardDescription className="text-blue-700">Get AI-powered help with your studies</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/dashboard/study">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Learning</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-blue-200 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-300"></div>
              <CardHeader className="pt-6">
                <Navigation2 className="w-8 h-8 text-amber-500" />
                <CardTitle className="text-xl text-blue-900">Campus Navigation</CardTitle>
                <CardDescription className="text-blue-700">Find your way around campus</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/dashboard/navigate">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Navigation</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-blue-200 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <CardHeader className="pt-6">
                <CalendarDays className="w-8 h-8 text-blue-600" />
                <CardTitle className="text-xl text-blue-900">Club Events</CardTitle>
                <CardDescription className="text-blue-700">Discover campus activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/dashboard/events">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">View Events</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-blue-200 shadow-md overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <CardHeader>
            <CardTitle className="text-xl text-blue-900">About SRM University</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-800 mb-4">
              SRM Institute of Science and Technology (formerly known as SRM University) is one of the top-ranking universities in India with over 52,000 students and more than 3,200 faculty across all campuses.
            </p>
            <div className="rounded-lg overflow-hidden border border-blue-200">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/e/e1/SRM_University_Logo.png" 
                alt="SRM University" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/400x200?text=SRM+University";
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 shadow-md overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-300"></div>
          <CardHeader>
            <CardTitle className="text-xl text-blue-900">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border border-blue-100 rounded-lg hover:bg-blue-50 transition">
                <div className="flex justify-between">
                  <h3 className="font-medium text-blue-900">Tech Symposium 2023</h3>
                  <span className="text-amber-600 text-sm">June 15</span>
                </div>
                <p className="text-blue-700 text-sm mt-1">Main Auditorium, 9:00 AM</p>
              </div>
              
              <div className="p-3 border border-blue-100 rounded-lg hover:bg-blue-50 transition">
                <div className="flex justify-between">
                  <h3 className="font-medium text-blue-900">Cultural Fest</h3>
                  <span className="text-amber-600 text-sm">June 20</span>
                </div>
                <p className="text-blue-700 text-sm mt-1">Open Air Theatre, 5:00 PM</p>
              </div>
              
              <div className="p-3 border border-blue-100 rounded-lg hover:bg-blue-50 transition">
                <div className="flex justify-between">
                  <h3 className="font-medium text-blue-900">Placement Drive</h3>
                  <span className="text-amber-600 text-sm">June 25</span>
                </div>
                <p className="text-blue-700 text-sm mt-1">MBA Block, 10:00 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
