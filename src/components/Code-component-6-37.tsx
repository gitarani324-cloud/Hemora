import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Heart, CheckCircle, Building2, Droplets, Share2, Home, Phone, MapPin, Clock, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

interface RequestSuccessProps {
  requestData: {
    patientName: string;
    hospital: string;
    bloodTypes: string[];
    unitsNeeded: string;
    urgencyLevel: string;
    contactPhone: string;
    additionalInfo: string;
    requestId: string;
  };
  onGoHome: () => void;
}

const urgencyLevels = [
  { value: "routine", label: "Routine", color: "bg-blue-100 text-blue-800" },
  { value: "urgent", label: "Urgent", color: "bg-yellow-100 text-yellow-800" },
  { value: "critical", label: "Critical", color: "bg-red-100 text-red-800" },
  { value: "emergency", label: "Emergency", color: "bg-red-200 text-red-900" },
];

// Mock matching centers data
const matchingCenters = [
  {
    id: "1",
    name: "Central Blood Bank",
    address: "123 Medical Center Dr",
    distance: "0.5 mi",
    availableTypes: ["A+", "O+", "AB+"],
    contactPhone: "(555) 123-4567",
    status: "Available Now"
  },
  {
    id: "2",
    name: "City Hospital Blood Center",
    address: "456 Hospital Ave",
    distance: "1.2 mi",
    availableTypes: ["A+", "A-", "O+", "O-"],
    contactPhone: "(555) 234-5678",
    status: "Available Now"
  },
  {
    id: "3",
    name: "Regional Medical Center",
    address: "789 Health Plaza",
    distance: "2.0 mi",
    availableTypes: ["All Types"],
    contactPhone: "(555) 345-6789",
    status: "Contact for Availability"
  }
];

export function RequestSuccess({ requestData, onGoHome }: RequestSuccessProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const getUrgencyStyle = (level: string) => {
    const urgency = urgencyLevels.find(u => u.value === level);
    return urgency ? urgency.color : "";
  };

  const getUrgencyLabel = (level: string) => {
    const urgency = urgencyLevels.find(u => u.value === level);
    return urgency ? urgency.label : level;
  };

  const isEmergency = requestData.urgencyLevel === "critical" || requestData.urgencyLevel === "emergency";

  const shareRequest = () => {
    const text = `Urgent blood request submitted! 🩸\n\nRequest ID: ${requestData.requestId}\nPatient: ${requestData.patientName}\nBlood Types: ${requestData.bloodTypes.join(", ")}\nUnits: ${requestData.unitsNeeded}\n\nPlease help spread the word! #BloodRequest #SaveLives`;
    
    if (navigator.share) {
      navigator.share({
        title: "Blood Request Submitted",
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const contactCenter = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className={`min-h-screen py-8 ${isEmergency ? 'bg-gradient-to-br from-red-50 to-pink-50' : 'bg-gradient-to-br from-green-50 to-blue-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Animated Success Header */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: showAnimation ? 1 : 0, opacity: showAnimation ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className={`mx-auto mb-6 w-24 h-24 rounded-full flex items-center justify-center ${isEmergency ? 'bg-red-100' : 'bg-green-100'}`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: showAnimation ? 1 : 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {isEmergency ? (
                <AlertTriangle className="h-12 w-12 text-red-600" />
              ) : (
                <CheckCircle className="h-12 w-12 text-green-600" />
              )}
            </motion.div>
          </div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: showAnimation ? 0 : 20, opacity: showAnimation ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl lg:text-4xl mb-4 text-gray-900"
          >
            {isEmergency ? "Emergency Request Submitted!" : "Request Submitted Successfully!"}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: showAnimation ? 0 : 20, opacity: showAnimation ? 1 : 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-gray-600"
          >
            Your blood request has been sent to nearby blood centers and donors.
          </motion.p>
        </motion.div>

        {/* Success Animation with Floating Hearts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showAnimation ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative mb-8 overflow-hidden"
        >
          <div className="flex justify-center space-x-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: showAnimation ? -20 : 50, opacity: showAnimation ? [0, 1, 0] : 0 }}
                transition={{
                  delay: 0.6 + i * 0.1,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className={isEmergency ? "text-red-400" : "text-red-400"}
              >
                <Heart className="h-6 w-6 fill-current" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Request Confirmation Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: showAnimation ? 0 : 50, opacity: showAnimation ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card className={`shadow-lg ${isEmergency ? 'border-red-200' : 'border-green-200'}`}>
              <CardHeader className={`rounded-t-lg ${isEmergency ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' : 'bg-gradient-to-r from-green-500 to-green-600 text-white'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Request Confirmation</CardTitle>
                    <CardDescription className={isEmergency ? "text-red-100" : "text-green-100"}>
                      Your request is being processed
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Building2 className="h-12 w-12 mb-2" />
                    <p className="text-sm font-mono">{requestData.requestId}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Request Details */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Patient Name</p>
                      <p className="font-semibold">{requestData.patientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hospital</p>
                      <p className="font-semibold">{requestData.hospital}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Blood Types</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {requestData.bloodTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            <Droplets className="h-3 w-3 mr-1" />
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Units Needed</p>
                      <p className="font-semibold">{requestData.unitsNeeded} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Urgency Level</p>
                      <Badge className={getUrgencyStyle(requestData.urgencyLevel)} variant="secondary">
                        {getUrgencyLabel(requestData.urgencyLevel)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <p className="font-semibold">{requestData.contactPhone}</p>
                    </div>
                  </div>

                  {requestData.additionalInfo && (
                    <div>
                      <p className="text-sm text-gray-600">Additional Information</p>
                      <p className="text-sm bg-gray-50 p-3 rounded-lg mt-1">{requestData.additionalInfo}</p>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Next Steps */}
                <div className={`p-4 rounded-lg ${isEmergency ? 'bg-red-50' : 'bg-blue-50'}`}>
                  <h4 className={`font-semibold mb-3 ${isEmergency ? 'text-red-800' : 'text-blue-800'}`}>What Happens Next</h4>
                  <ul className={`text-sm space-y-2 ${isEmergency ? 'text-red-700' : 'text-blue-700'}`}>
                    <li className="flex items-start">
                      <span className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${isEmergency ? 'bg-red-400' : 'bg-blue-400'}`}></span>
                      Your request has been sent to all nearby blood centers
                    </li>
                    <li className="flex items-start">
                      <span className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${isEmergency ? 'bg-red-400' : 'bg-blue-400'}`}></span>
                      Eligible donors in your area will be notified
                    </li>
                    <li className="flex items-start">
                      <span className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${isEmergency ? 'bg-red-400' : 'bg-blue-400'}`}></span>
                      You'll receive updates on donor matches
                    </li>
                    <li className="flex items-start">
                      <span className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${isEmergency ? 'bg-red-400' : 'bg-blue-400'}`}></span>
                      Blood centers will contact you directly
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button variant="outline" onClick={shareRequest} className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Request
                  </Button>
                  <Button onClick={onGoHome} className="flex-1 bg-primary hover:bg-primary/90">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Matching Centers */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: showAnimation ? 0 : 50, opacity: showAnimation ? 1 : 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Matching Blood Centers</span>
                </CardTitle>
                <CardDescription>
                  Centers that may have your requested blood type
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {matchingCenters.map((center) => (
                    <Card key={center.id} className="border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{center.name}</h4>
                            <p className="text-sm text-gray-600 flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {center.address} • {center.distance}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {center.status}
                          </Badge>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-1">Available Types:</p>
                          <div className="flex flex-wrap gap-1">
                            {Array.isArray(center.availableTypes) ? 
                              center.availableTypes.map((type) => (
                                <Badge 
                                  key={type} 
                                  variant={requestData.bloodTypes.includes(type) ? "default" : "outline"}
                                  className="text-xs"
                                >
                                  {type}
                                </Badge>
                              )) : (
                                <Badge variant="default" className="text-xs">
                                  {center.availableTypes}
                                </Badge>
                              )
                            }
                          </div>
                        </div>

                        <Button 
                          size="sm" 
                          onClick={() => contactCenter(center.contactPhone)}
                          className="w-full"
                        >
                          <Phone className="mr-2 h-3 w-3" />
                          Call {center.contactPhone}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    24/7 Emergency Support
                  </h4>
                  <p className="text-sm text-gray-700">
                    For urgent requests, call our emergency hotline: 
                    <a href="tel:+1-800-BLOOD-ER" className="font-semibold ml-1 text-primary hover:underline">
                      1-800-BLOOD-ER
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showAnimation ? 1 : 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center mt-8 text-gray-600"
        >
          <p className="text-sm">
            Request tracking and updates will be sent to your contact phone number.
          </p>
        </motion.div>
      </div>
    </div>
  );
}