import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Heart, CheckCircle, Calendar, MapPin, Clock, QrCode, Share2, Home, Smartphone } from "lucide-react";
import { motion } from "motion/react";

interface BookingSuccessProps {
  bookingData: {
    center: {
      name: string;
      address: string;
      distance: string;
    };
    date: Date;
    timeSlot: string;
    bookingId: string;
  };
  donorData: {
    personalInfo: {
      firstName: string;
      lastName: string;
    };
    bloodGroup: string;
  };
  onGoHome: () => void;
}

export function BookingSuccess({ bookingData, donorData, onGoHome }: BookingSuccessProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const shareBooking = () => {
    const text = `I just scheduled a blood donation appointment! 🩸\n\nDate: ${bookingData.date.toLocaleDateString()}\nTime: ${bookingData.timeSlot}\nLocation: ${bookingData.center.name}\n\nEvery donation saves lives! #BloodDonation #SaveLives`;
    
    if (navigator.share) {
      navigator.share({
        title: "Blood Donation Appointment Scheduled",
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      // You could show a toast here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        {/* Animated Success Header */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: showAnimation ? 1 : 0, opacity: showAnimation ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="mx-auto mb-6 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: showAnimation ? 1 : 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <CheckCircle className="h-12 w-12 text-green-600" />
            </motion.div>
          </div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: showAnimation ? 0 : 20, opacity: showAnimation ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl lg:text-4xl mb-4 text-gray-900"
          >
            Appointment Confirmed!
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: showAnimation ? 0 : 20, opacity: showAnimation ? 1 : 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-gray-600"
          >
            Thank you, {donorData.personalInfo.firstName}! Your blood donation is scheduled.
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
                className="text-red-400"
              >
                <Heart className="h-6 w-6 fill-current" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Success Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: showAnimation ? 0 : 50, opacity: showAnimation ? 1 : 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="mb-6 shadow-lg border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Booking Confirmation</CardTitle>
                  <CardDescription className="text-green-100">
                    Your appointment is confirmed and saved
                  </CardDescription>
                </div>
                <div className="text-right">
                  <QrCode className="h-12 w-12 mb-2" />
                  <p className="text-sm font-mono">{bookingData.bookingId}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Appointment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date & Time</p>
                      <p className="font-semibold">
                        {bookingData.date.toLocaleDateString()} at {bookingData.timeSlot}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-purple-100 p-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold">Approximately 45 minutes</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold">{bookingData.center.name}</p>
                      <p className="text-sm text-gray-600">{bookingData.center.address}</p>
                      <Badge variant="outline" className="mt-1">
                        {bookingData.center.distance} away
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Donor Information */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-3">Donor Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <p className="font-semibold">
                      {donorData.personalInfo.firstName} {donorData.personalInfo.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Blood Type:</span>
                    <p className="font-semibold">{donorData.bloodGroup}</p>
                  </div>
                </div>
              </div>

              {/* Important Reminders */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">Important Reminders</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Eat a healthy meal 2-3 hours before your appointment
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Drink plenty of water (16 oz extra) before donating
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Bring a valid photo ID and your booking confirmation
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Wear clothing with sleeves that can be rolled up
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Arrive 10 minutes early for check-in
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Impact Message */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: showAnimation ? 0 : 30, opacity: showAnimation ? 1 : 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
            <CardContent className="p-6 text-center">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-800 mb-2">You're About to Save Lives!</h3>
              <p className="text-red-700">
                Your single donation can help save up to <strong>3 lives</strong>. Thank you for being a hero in your community.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: showAnimation ? 0 : 30, opacity: showAnimation ? 1 : 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <Button variant="outline" onClick={shareBooking} className="w-full">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" className="w-full">
            <Smartphone className="mr-2 h-4 w-4" />
            Save to Phone
          </Button>
          <Button onClick={onGoHome} className="w-full bg-primary hover:bg-primary/90">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showAnimation ? 1 : 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center mt-8 text-gray-600"
        >
          <p className="text-sm">
            Questions about your appointment? Contact us at{" "}
            <a href="tel:+1-800-DONATE" className="text-primary hover:underline">
              1-800-DONATE
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}