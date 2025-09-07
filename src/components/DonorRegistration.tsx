import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { ChevronLeft, ChevronRight, User, Droplets, FileText, CheckCircle, AlertCircle, Heart } from "lucide-react";

interface DonorRegistrationProps {
  onComplete: (data: DonorData) => void;
  onBack: () => void;
}

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

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const healthQuestions = [
  "Are you feeling well today?",
  "Have you donated blood in the last 56 days?",
  "Are you currently taking any medications?",
  "Have you had any recent tattoos or piercings?",
  "Have you traveled outside the country recently?",
  "Do you have any chronic medical conditions?",
];

export function DonorRegistration({ onComplete, onBack }: DonorRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  
  const [donorData, setDonorData] = useState<DonorData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      age: "",
      phone: "",
      email: "",
      location: "",
    },
    bloodGroup: "",
    healthScreening: {},
    consent: false,
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!donorData.personalInfo.firstName) newErrors.firstName = "First name is required";
      if (!donorData.personalInfo.lastName) newErrors.lastName = "Last name is required";
      if (!donorData.personalInfo.age) newErrors.age = "Age is required";
      if (parseInt(donorData.personalInfo.age) < 17 || parseInt(donorData.personalInfo.age) > 65) {
        newErrors.age = "Age must be between 17 and 65";
      }
      if (!donorData.personalInfo.phone) newErrors.phone = "Phone number is required";
      if (!donorData.personalInfo.email) newErrors.email = "Email is required";
      if (!donorData.personalInfo.location) newErrors.location = "Location is required";
    }

    if (step === 2) {
      if (!donorData.bloodGroup) newErrors.bloodGroup = "Blood group selection is required";
    }

    if (step === 3) {
      const answeredQuestions = Object.keys(donorData.healthScreening).length;
      if (answeredQuestions < healthQuestions.length) {
        newErrors.healthScreening = "Please answer all health screening questions";
      }
    }

    if (step === 4) {
      if (!donorData.consent) newErrors.consent = "Consent is required to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 3) {
        checkEligibility();
      }
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const checkEligibility = () => {
    const screening = donorData.healthScreening;
    const ineligibleAnswers = [
      !screening["Are you feeling well today?"],
      screening["Have you donated blood in the last 56 days?"],
      screening["Have you had any recent tattoos or piercings?"],
    ];

    const eligible = !ineligibleAnswers.some(answer => answer);
    setIsEligible(eligible);
  };

  const handleSubmit = () => {
    if (validateStep(currentStep) && isEligible) {
      onComplete(donorData);
    }
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setDonorData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateHealthScreening = (question: string, answer: boolean) => {
    setDonorData(prev => ({
      ...prev,
      healthScreening: { ...prev.healthScreening, [question]: answer }
    }));
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return User;
      case 2: return Droplets;
      case 3: return FileText;
      case 4: return CheckCircle;
      default: return User;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-1 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">Hemora</span>
          </div>
          <h1 className="text-3xl mb-2">Donor Registration</h1>
          <p className="text-gray-600">Help us save lives by becoming a registered donor</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((step) => {
                const Icon = getStepIcon(step);
                return (
                  <div
                    key={step}
                    className={`flex flex-col items-center ${
                      step <= currentStep ? 'text-primary' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`rounded-full p-2 mb-2 ${
                        step <= currentStep ? 'bg-primary text-white' : 'bg-gray-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs text-center">
                      {step === 1 && "Personal"}
                      {step === 2 && "Blood Group"}
                      {step === 3 && "Health"}
                      {step === 4 && "Consent"}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Blood Group Selection"}
              {currentStep === 3 && "Health Screening"}
              {currentStep === 4 && "Final Consent"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Please provide your basic information"}
              {currentStep === 2 && "Select your blood type"}
              {currentStep === 3 && "Answer these health questions honestly"}
              {currentStep === 4 && "Review and confirm your registration"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={donorData.personalInfo.firstName}
                    onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={donorData.personalInfo.lastName}
                    onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="17"
                    max="65"
                    value={donorData.personalInfo.age}
                    onChange={(e) => updatePersonalInfo("age", e.target.value)}
                    className={errors.age ? "border-red-500" : ""}
                  />
                  {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={donorData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={donorData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="location">Location/City</Label>
                  <Input
                    id="location"
                    value={donorData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    className={errors.location ? "border-red-500" : ""}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Blood Group */}
            {currentStep === 2 && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bloodGroups.map((group) => (
                    <Button
                      key={group}
                      variant={donorData.bloodGroup === group ? "default" : "outline"}
                      onClick={() => setDonorData(prev => ({ ...prev, bloodGroup: group }))}
                      className="h-24 flex flex-col items-center justify-center space-y-2"
                    >
                      <Droplets className="h-8 w-8" />
                      <span className="text-lg">{group}</span>
                    </Button>
                  ))}
                </div>
                {errors.bloodGroup && <p className="text-red-500 text-sm mt-4">{errors.bloodGroup}</p>}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Don't know your blood type?</strong> That's okay! We can determine it during your visit.
                    Select "O+" as a temporary choice and we'll update your profile after testing.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Health Screening */}
            {currentStep === 3 && (
              <div className="space-y-4">
                {healthQuestions.map((question, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <p className="mb-3">{question}</p>
                    <div className="flex space-x-4">
                      <Button
                        variant={donorData.healthScreening[question] === true ? "default" : "outline"}
                        onClick={() => updateHealthScreening(question, true)}
                        size="sm"
                      >
                        Yes
                      </Button>
                      <Button
                        variant={donorData.healthScreening[question] === false ? "default" : "outline"}
                        onClick={() => updateHealthScreening(question, false)}
                        size="sm"
                      >
                        No
                      </Button>
                    </div>
                  </div>
                ))}
                {errors.healthScreening && <p className="text-red-500 text-sm">{errors.healthScreening}</p>}
              </div>
            )}

            {/* Step 4: Consent */}
            {currentStep === 4 && (
              <div className="space-y-6">
                {/* Eligibility Result */}
                {isEligible !== null && (
                  <Alert className={isEligible ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
                    <div className="flex items-center">
                      {isEligible ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      )}
                      <AlertDescription className={isEligible ? "text-green-800" : "text-red-800"}>
                        {isEligible
                          ? "Great! You are eligible to donate blood today."
                          : "Based on your answers, you are not eligible to donate at this time. You will be eligible again on March 15, 2024."}
                      </AlertDescription>
                    </div>
                  </Alert>
                )}

                {/* Registration Summary */}
                <div className="border rounded-lg p-4">
                  <h3 className="mb-4">Registration Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-600">Name:</span>
                    <span>{donorData.personalInfo.firstName} {donorData.personalInfo.lastName}</span>
                    <span className="text-gray-600">Age:</span>
                    <span>{donorData.personalInfo.age}</span>
                    <span className="text-gray-600">Blood Group:</span>
                    <span>{donorData.bloodGroup}</span>
                    <span className="text-gray-600">Location:</span>
                    <span>{donorData.personalInfo.location}</span>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent"
                    checked={donorData.consent}
                    onCheckedChange={(checked) => 
                      setDonorData(prev => ({ ...prev, consent: checked as boolean }))
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="consent" className="text-sm">
                      I consent to donating blood and confirm that all information provided is accurate.
                      I understand the donation process and potential risks.
                    </Label>
                  </div>
                </div>
                {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={currentStep === 1 ? onBack : prevStep}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            {currentStep === 1 ? "Back to Home" : "Previous"}
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={nextStep}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={!isEligible || !donorData.consent}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Registration
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}