import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Heart, Building2, Phone, AlertTriangle, Droplets, FileText, ChevronLeft } from "lucide-react";

interface RequestBloodProps {
  onComplete: (data: RequestData) => void;
  onBack: () => void;
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

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = [
  { value: "routine", label: "Routine", color: "bg-blue-100 text-blue-800" },
  { value: "urgent", label: "Urgent", color: "bg-yellow-100 text-yellow-800" },
  { value: "critical", label: "Critical", color: "bg-red-100 text-red-800" },
  { value: "emergency", label: "Emergency", color: "bg-red-200 text-red-900" },
];

export function RequestBlood({ onComplete, onBack }: RequestBloodProps) {
  const [formData, setFormData] = useState<Omit<RequestData, 'requestId'>>({
    patientName: "",
    hospital: "",
    bloodTypes: [],
    unitsNeeded: "",
    urgencyLevel: "",
    contactPhone: "",
    additionalInfo: "",
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.patientName) newErrors.patientName = "Patient name is required";
    if (!formData.hospital) newErrors.hospital = "Hospital name is required";
    if (formData.bloodTypes.length === 0) newErrors.bloodTypes = "At least one blood type must be selected";
    if (!formData.unitsNeeded) newErrors.unitsNeeded = "Number of units is required";
    if (!formData.urgencyLevel) newErrors.urgencyLevel = "Urgency level is required";
    if (!formData.contactPhone) newErrors.contactPhone = "Contact phone is required";

    const unitsNum = parseInt(formData.unitsNeeded);
    if (formData.unitsNeeded && (isNaN(unitsNum) || unitsNum < 1 || unitsNum > 50)) {
      newErrors.unitsNeeded = "Units must be between 1 and 50";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const requestData: RequestData = {
        ...formData,
        requestId: `BR${Date.now().toString().slice(-6)}`
      };
      onComplete(requestData);
    }
  };

  const toggleBloodType = (bloodType: string) => {
    setFormData(prev => ({
      ...prev,
      bloodTypes: prev.bloodTypes.includes(bloodType)
        ? prev.bloodTypes.filter(type => type !== bloodType)
        : [...prev.bloodTypes, bloodType]
    }));
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getUrgencyStyle = (level: string) => {
    const urgency = urgencyLevels.find(u => u.value === level);
    return urgency ? urgency.color : "";
  };

  const isEmergency = formData.urgencyLevel === "critical" || formData.urgencyLevel === "emergency";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-1 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">Hemora</span>
          </div>
          <h1 className="text-3xl mb-2">Request Blood</h1>
          <p className="text-gray-600">Submit a blood request for a patient in need</p>
        </div>

        {/* Emergency Alert */}
        {isEmergency && (
          <Alert className="mb-6 border-red-500 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Emergency Request:</strong> This request will be prioritized and sent to all nearby blood centers immediately.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Form */}
        <Card className={isEmergency ? "border-red-200 shadow-lg" : ""}>
          <CardHeader className={isEmergency ? "bg-red-50" : ""}>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Blood Request Form</span>
              {isEmergency && (
                <Badge className="bg-red-600 text-white">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Emergency
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Please provide detailed information about the blood request
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Patient & Hospital Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => updateField("patientName", e.target.value)}
                  className={errors.patientName ? "border-red-500" : ""}
                  placeholder="Enter patient name"
                />
                {errors.patientName && <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>}
              </div>
              <div>
                <Label htmlFor="hospital">Hospital/Medical Facility</Label>
                <Input
                  id="hospital"
                  value={formData.hospital}
                  onChange={(e) => updateField("hospital", e.target.value)}
                  className={errors.hospital ? "border-red-500" : ""}
                  placeholder="Enter hospital name"
                />
                {errors.hospital && <p className="text-red-500 text-sm mt-1">{errors.hospital}</p>}
              </div>
            </div>

            {/* Blood Types */}
            <div>
              <Label>Required Blood Type(s)</Label>
              <p className="text-sm text-gray-600 mb-3">Select all compatible blood types</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {bloodGroups.map((type) => (
                  <div
                    key={type}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      formData.bloodTypes.includes(type)
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleBloodType(type)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.bloodTypes.includes(type)}
                        onChange={() => toggleBloodType(type)}
                      />
                      <Droplets className="h-4 w-4 text-primary" />
                      <span>{type}</span>
                    </div>
                  </div>
                ))}
              </div>
              {errors.bloodTypes && <p className="text-red-500 text-sm mt-2">{errors.bloodTypes}</p>}
            </div>

            {/* Units & Urgency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="unitsNeeded">Units Needed</Label>
                <Input
                  id="unitsNeeded"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.unitsNeeded}
                  onChange={(e) => updateField("unitsNeeded", e.target.value)}
                  className={errors.unitsNeeded ? "border-red-500" : ""}
                  placeholder="Number of units"
                />
                {errors.unitsNeeded && <p className="text-red-500 text-sm mt-1">{errors.unitsNeeded}</p>}
              </div>
              <div>
                <Label htmlFor="urgencyLevel">Urgency Level</Label>
                <Select
                  value={formData.urgencyLevel}
                  onValueChange={(value) => updateField("urgencyLevel", value)}
                >
                  <SelectTrigger className={errors.urgencyLevel ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex items-center space-x-2">
                          <Badge className={level.color} variant="secondary">
                            {level.label}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.urgencyLevel && <p className="text-red-500 text-sm mt-1">{errors.urgencyLevel}</p>}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <Label htmlFor="contactPhone">Contact Phone Number</Label>
              <Input
                id="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => updateField("contactPhone", e.target.value)}
                className={errors.contactPhone ? "border-red-500" : ""}
                placeholder="Phone number for contact"
              />
              {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
            </div>

            {/* Additional Information */}
            <div>
              <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => updateField("additionalInfo", e.target.value)}
                placeholder="Any additional details about the request, medical conditions, or special requirements..."
                rows={4}
              />
            </div>

            {/* Summary */}
            {formData.patientName && formData.bloodTypes.length > 0 && formData.urgencyLevel && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Request Summary
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Patient:</span>
                  <span>{formData.patientName}</span>
                  <span className="text-gray-600">Blood Types:</span>
                  <span>{formData.bloodTypes.join(", ")}</span>
                  <span className="text-gray-600">Units:</span>
                  <span>{formData.unitsNeeded || "Not specified"}</span>
                  <span className="text-gray-600">Urgency:</span>
                  <span>
                    <Badge className={getUrgencyStyle(formData.urgencyLevel)} variant="secondary">
                      {urgencyLevels.find(u => u.value === formData.urgencyLevel)?.label}
                    </Badge>
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <Button 
            onClick={handleSubmit}
            className={isEmergency ? "bg-red-600 hover:bg-red-700" : ""}
          >
            {isEmergency && <AlertTriangle className="mr-2 h-4 w-4" />}
            Submit Request
          </Button>
        </div>

        {/* Emergency Contact Info */}
        {isEmergency && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Contact
            </h4>
            <p className="text-sm text-red-700">
              For immediate assistance, call our 24/7 emergency hotline: 
              <a href="tel:+1-800-BLOOD-ER" className="font-semibold ml-1 underline">
                1-800-BLOOD-ER
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}