
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-900">SRM Institute of Science and Technology</CardTitle>
          <CardDescription className="text-lg text-blue-700">Kattankulathur, Chennai - 603203</CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl text-blue-900">About SRMIST</h3>
              <p className="text-blue-800">
                SRM Institute of Science and Technology (formerly known as SRM University) is one of India's top-ranking universities with over 52,000 full-time students and more than 3,200 faculty across all campuses, offering a wide range of undergraduate, postgraduate and doctoral programs in Engineering, Management, Medicine and Health sciences, and Science and Humanities.
              </p>
              <p className="text-blue-800">
                Founded in 1985 by Dr. T.R. Paarivendhar, SRMIST has emerged as one of the premier institutions in India. The institution's commitment to excellence has earned it numerous accolades, including NAAC accreditation with 'A++' Grade and a place in the QS World Rankings.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-xl text-blue-900">Campus Highlights</h3>
              <ul className="list-disc list-inside text-blue-800 space-y-2">
                <li>500+ Acre green campus with modern infrastructure</li>
                <li>State-of-the-art research facilities</li>
                <li>World-class sports complex</li>
                <li>Placement partnerships with over 800+ companies</li>
                <li>International collaborations with universities worldwide</li>
                <li>Strong focus on innovation and entrepreneurship</li>
                <li>Vibrant campus life with 100+ student clubs</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-xl text-blue-900 mb-4">Academic Excellence</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-blue-900">Engineering</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800 text-sm">
                    Offering 24+ undergraduate and 35+ postgraduate programs across various engineering disciplines with state-of-the-art laboratories.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-blue-900">Medicine & Health Sciences</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800 text-sm">
                    Comprehensive medical education with a 1500-bed multi-specialty hospital providing hands-on clinical experience.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-blue-900">Management Studies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800 text-sm">
                    AACSB-accredited programs with focus on experiential learning, industry connects, and global business exposure.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-xl text-blue-900 mb-4">Contact Information</h3>
            <p className="text-blue-800">
              <strong>Address:</strong> SRM Nagar, Kattankulathur, Chengalpattu District, Tamil Nadu - 603203<br />
              <strong>Phone:</strong> +91-44-27417777, +91-44-27417504<br />
              <strong>Email:</strong> admissions@srmist.edu.in<br />
              <strong>Website:</strong> www.srmist.edu.in
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
