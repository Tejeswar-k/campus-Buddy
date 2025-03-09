
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const CampusInfo = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-900">
          SRM Institute of Science and Technology
        </CardTitle>
        <CardDescription className="text-blue-800 mt-2 font-medium">
          Kattankulathur, Chennai - 603203
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-blue-900">About SRMIST</h3>
            <p className="text-blue-800">
              SRMIST is one of India's top-ranking universities with over 52,000 full-time students and more than 3,200 faculty across all campuses, offering a wide range of undergraduate, postgraduate and doctoral programs in Engineering, Management, Medicine and Health sciences, and Science and Humanities.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-blue-900">Quick Facts</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-2">
              <li>Established in 1985</li>
              <li>NAAC Accredited with 'A++' Grade</li>
              <li>QS World Rankings: 401-450</li>
              <li>500+ Acres Green Campus</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
