import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Calendar as CalendarIcon, MapPin, Clock, Users, Navigation, Heart, QrCode, Download } from "lucide-react";

interface AppointmentBookingProps {
  donorData: {
    personalInfo: {
      firstName: string;
      lastName: string;
      location: string;
    };
    bloodGroup: string;
  };
  onComplete: (bookingData: BookingData) => void;
  onBack: () => void;
}

interface BookingData {
  center: DonationCenter;
  date: Date;
  timeSlot: string;
  bookingId: string;
}

interface DonationCenter {
  id: string;
  name: string;
  address: string;
  distance: string;
  slotsAvailable: number;
  rating: number;
  features: string[];
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const donationCenters: DonationCenter[] = [
  {
    id: "1",
    name: "Central Community Blood Center",
    address: "123 Main St, Downtown",
    distance: "0.8 mi",
    slotsAvailable: 12,
    rating: 4.8,
    features: ["Parking Available", "Wheelchair Accessible", "Free WiFi"]
  },
  {
    id: "2",
    name: "Mercy Hospital Blood Drive",
    address: "456 Hospital Ave, Medical District",
    distance: "1.2 mi",
    slotsAvailable: 8,
    rating: 4.6,
    features: ["Express Donation", "Parking Available", "Snack Bar"]
  },
  {
    id: "3",
    name: "University Health Center",
    address: "789 Campus Dr, University Area",
    distance: "2.1 mi",
    slotsAvailable: 15,
    rating: 4.7,
    features: ["Student Discounts", "Free Parking", "Modern Facility"]
  }
];

export function AppointmentBooking({ donorData, onComplete, onBack }: AppointmentBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedCenter, setSelectedCenter] = useState<DonationCenter | null>(null);
  const [step, setStep] = useState<"center" | "datetime" | "confirmation">("center");

  const handleCenterSelection = (center: DonationCenter) => {
    setSelectedCenter(center);
    setStep("datetime");
  };

  const handleDateTimeConfirmation = () => {
    if (selectedDate && selectedTimeSlot && selectedCenter) {
      setStep("confirmation");
    }
  };

  const handleBookingConfirmation = () => {
    if (selectedDate && selectedTimeSlot && selectedCenter) {
      const bookingData: BookingData = {
        center: selectedCenter,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        bookingId: `BD${Date.now().toString().slice(-6)}`
      };
      onComplete(bookingData);
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    
    return date < today || date > maxDate || date.getDay() === 0; // Disable Sundays
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-1 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">Hemora</span>
          </div>
          <h1 className="text-3xl mb-2">Book Your Appointment</h1>
          <p className="text-gray-600">
            Hello {donorData.personalInfo.firstName}! Let's schedule your blood donation.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${step === "center" ? "text-primary" : step === "datetime" || step === "confirmation" ? "text-green-600" : "text-gray-400"}`}>
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${step === "center" ? "bg-primary text-white" : step === "datetime" || step === "confirmation" ? "bg-green-600 text-white" : "bg-gray-200"}`}>
                <MapPin className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline">Select Center</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center space-x-2 ${step === "datetime" ? "text-primary" : step === "confirmation" ? "text-green-600" : "text-gray-400"}`}>
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${step === "datetime" ? "bg-primary text-white" : step === "confirmation" ? "bg-green-600 text-white" : "bg-gray-200"}`}>
                <CalendarIcon className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline">Date & Time</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center space-x-2 ${step === "confirmation" ? "text-primary" : "text-gray-400"}`}>
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${step === "confirmation" ? "bg-primary text-white" : "bg-gray-200"}`}>
                <QrCode className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Step 1: Center Selection */}
        {step === "center" && (
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Choose a Donation Center</CardTitle>
                <CardDescription>
                  Centers near {donorData.personalInfo.location} | Blood Type: {donorData.bloodGroup}
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-6">
              {donationCenters.map((center) => (
                <Card key={center.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold">{center.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{center.distance}</Badge>
                            <Badge 
                              variant={center.slotsAvailable > 10 ? "default" : "destructive"}
                              className="ml-2"
                            >
                              {center.slotsAvailable} slots
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {center.address}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {center.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="flex items-center mr-4">
                            ⭐ {center.rating} rating
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {center.slotsAvailable} available today
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Button onClick={() => handleCenterSelection(center)}>
                          <Navigation className="mr-2 h-4 w-4" />
                          Select Center
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === "datetime" && selectedCenter && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose your preferred donation date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  className="rounded-md border"
                />
                <p className="text-sm text-gray-500 mt-4">
                  * Sundays are closed. Appointments available up to 30 days in advance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Time</CardTitle>
                <CardDescription>
                  {selectedDate?.toLocaleDateString()} at {selectedCenter.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedTimeSlot === slot ? "default" : "outline"}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className="justify-start"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {slot}
                    </Button>
                  ))}
                </div>
                
                {selectedDate && selectedTimeSlot && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Appointment Summary</h4>
                    <p className="text-sm text-green-700">
                      <strong>Date:</strong> {selectedDate.toLocaleDateString()}
                    </p>
                    <p className="text-sm text-green-700">
                      <strong>Time:</strong> {selectedTimeSlot}
                    </p>
                    <p className="text-sm text-green-700">
                      <strong>Location:</strong> {selectedCenter.name}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === "confirmation" && selectedCenter && selectedDate && selectedTimeSlot && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <QrCode className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-800">Booking Confirmation</CardTitle>
                <CardDescription>Your appointment has been successfully scheduled</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Booking ID</h3>
                  <p className="text-2xl font-mono text-primary">BD{Date.now().toString().slice(-6)}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Appointment Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {selectedTimeSlot}</p>
                      <p><strong>Duration:</strong> ~45 minutes</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Location</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>{selectedCenter.name}</strong></p>
                      <p>{selectedCenter.address}</p>
                      <p>{selectedCenter.distance} from your location</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Before Your Visit</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Eat a healthy meal and stay hydrated</li>
                    <li>• Bring a valid photo ID</li>
                    <li>• Wear comfortable clothing with sleeves that roll up</li>
                    <li>• Get a good night's sleep</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Details
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Add to Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => {
              if (step === "center") {
                onBack();
              } else if (step === "datetime") {
                setStep("center");
              } else {
                setStep("datetime");
              }
            }}
          >
            {step === "center" ? "Back to Registration" : "Previous"}
          </Button>

          {step === "datetime" && (
            <Button 
              onClick={handleDateTimeConfirmation}
              disabled={!selectedDate || !selectedTimeSlot}
            >
              Confirm Appointment
            </Button>
          )}

          {step === "confirmation" && (
            <Button onClick={handleBookingConfirmation} className="bg-green-600 hover:bg-green-700">
              Complete Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}