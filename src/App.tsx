import { useState } from "react";
import { Homepage } from "./components/Homepage";
import { DonorRegistration } from "./components/DonorRegistration";
import { AppointmentBooking } from "./components/AppointmentBooking";
import { BookingSuccess } from "./components/BookingSuccess";
import { RequestBlood } from "./components/RequestBlood";
import { RequestSuccess } from "./components/RequestSuccess";
import { DonorDashboard } from "./components/DonorDashboard";
import { About } from "./components/About";
import { Drives } from "./components/Drives";
import { Contact } from "./components/Contact";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

type AppState = "homepage" | "about" | "drives" | "contact" | "registration" | "booking" | "success" | "request-blood" | "request-success" | "dashboard";

interface DonorData {
  personalInfo: {
    firstName: string;
    lastName: string;
    age: string;
    phone: string;
    email: string;
    location: string;
  };
  bloodGroup: string;
  healthScreening: {
    [key: string]: boolean;
  };
  consent: boolean;
}

interface BookingData {
  center: {
    id: string;
    name: string;
    address: string;
    distance: string;
    slotsAvailable: number;
    rating: number;
    features: string[];
  };
  date: Date;
  timeSlot: string;
  bookingId: string;
}

interface RequestData {
  patientName: string;
  hospital: string;
  bloodTypes: string[];
  unitsNeeded: string;
  urgencyLevel: string;
  contactPhone: string;
  additionalInfo: string;
  requestId: string;
}

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>("homepage");
  const [donorData, setDonorData] = useState<DonorData | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [requestData, setRequestData] = useState<RequestData | null>(null);

  const handleNavigateToAbout = () => {
    setCurrentState("about");
  };

  const handleNavigateToDrives = () => {
    setCurrentState("drives");
  };

  const handleNavigateToContact = () => {
    setCurrentState("contact");
  };

  const handleNavigateToHome = () => {
    setCurrentState("homepage");
  };

  const handleDonateNow = () => {
    setCurrentState("registration");
    toast.success("Starting your donor registration journey!", {
      description: "Let's get you registered to save lives.",
    });
  };

  const handleFindDrive = () => {
    toast.info("Feature coming soon!", {
      description: "We're working on a drive finder feature. For now, use 'Donate Now' to book an appointment.",
    });
  };

  const handleRequestBlood = () => {
    setCurrentState("request-blood");
    toast.info("Request blood for a patient", {
      description: "Fill out the form to request blood for medical needs.",
    });
  };

  const handleGoToDashboard = () => {
    setCurrentState("dashboard");
    toast.success("Welcome to your dashboard", {
      description: "View your donation history and upcoming appointments.",
    });
  };

  const handleRegistrationComplete = (data: DonorData) => {
    setDonorData(data);
    setCurrentState("booking");
    toast.success(`Welcome ${data.personalInfo.firstName}!`, {
      description: "Registration complete. Now let's schedule your appointment.",
    });
  };

  const handleBookingComplete = (data: BookingData) => {
    setBookingData(data);
    setCurrentState("success");
    toast.success("Appointment confirmed!", {
      description: `Your booking ${data.bookingId} is confirmed for ${data.date.toLocaleDateString()}.`,
    });
  };

  const handleRequestComplete = (data: RequestData) => {
    setRequestData(data);
    setCurrentState("request-success");
    toast.success("Blood request submitted!", {
      description: `Request ${data.requestId} has been submitted successfully.`,
    });
  };

  const handleBackToHome = () => {
    setCurrentState("homepage");
    setDonorData(null);
    setBookingData(null);
    setRequestData(null);
  };

  const handleBackToRegistration = () => {
    setCurrentState("registration");
  };

  const handleBackToBooking = () => {
    setCurrentState("booking");
  };

  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out">
      <Toaster position="top-right" richColors />
      
      {currentState === "homepage" && (
        <div className="animate-in fade-in duration-300">
          <Homepage
            currentPage={currentState}
            onDonateNow={handleDonateNow}
            onFindDrive={handleFindDrive}
            onRequestBlood={handleRequestBlood}
            onGoToDashboard={handleGoToDashboard}
            onNavigateToAbout={handleNavigateToAbout}
            onNavigateToDrives={handleNavigateToDrives}
            onNavigateToContact={handleNavigateToContact}
            onNavigateToHome={handleNavigateToHome}
          />
        </div>
      )}

      {currentState === "about" && (
        <div className="animate-in fade-in duration-300">
          <About 
            currentPage={currentState}
            onNavigateToHome={handleNavigateToHome}
            onNavigateToAbout={handleNavigateToAbout}
            onNavigateToDrives={handleNavigateToDrives}
            onNavigateToContact={handleNavigateToContact}
            onGoToDashboard={handleGoToDashboard}
            onDonateNow={handleDonateNow}
          />
        </div>
      )}

      {currentState === "drives" && (
        <div className="animate-in fade-in duration-300">
          <Drives 
            currentPage={currentState}
            onNavigateToHome={handleNavigateToHome}
            onNavigateToAbout={handleNavigateToAbout}
            onNavigateToDrives={handleNavigateToDrives}
            onNavigateToContact={handleNavigateToContact}
            onGoToDashboard={handleGoToDashboard}
            onDonateNow={handleDonateNow}
          />
        </div>
      )}

      {currentState === "contact" && (
        <div className="animate-in fade-in duration-300">
          <Contact 
            currentPage={currentState}
            onNavigateToHome={handleNavigateToHome}
            onNavigateToAbout={handleNavigateToAbout}
            onNavigateToDrives={handleNavigateToDrives}
            onNavigateToContact={handleNavigateToContact}
            onGoToDashboard={handleGoToDashboard}
            onDonateNow={handleDonateNow}
          />
        </div>
      )}

      {currentState === "registration" && (
        <DonorRegistration
          onComplete={handleRegistrationComplete}
          onBack={handleBackToHome}
        />
      )}

      {currentState === "booking" && donorData && (
        <AppointmentBooking
          donorData={donorData}
          onComplete={handleBookingComplete}
          onBack={handleBackToRegistration}
        />
      )}

      {currentState === "success" && donorData && bookingData && (
        <BookingSuccess
          donorData={donorData}
          bookingData={bookingData}
          onGoHome={handleBackToHome}
        />
      )}

      {currentState === "request-blood" && (
        <RequestBlood
          onComplete={handleRequestComplete}
          onBack={handleBackToHome}
        />
      )}

      {currentState === "request-success" && requestData && (
        <RequestSuccess
          requestData={requestData}
          onGoHome={handleBackToHome}
        />
      )}

      {currentState === "dashboard" && (
        <DonorDashboard
          onBookAppointment={handleDonateNow}
          onGoHome={handleBackToHome}
        />
      )}
    </div>
  );
}