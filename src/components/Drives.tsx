import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart, Calendar, MapPin, Clock, Users, ArrowLeft, Filter } from "lucide-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface DrivesProps {
  currentPage: string;
  onNavigateToHome: () => void;
  onNavigateToAbout: () => void;
  onNavigateToDrives: () => void;
  onNavigateToContact: () => void;
  onGoToDashboard: () => void;
  onDonateNow: () => void;
}

export function Drives({
  currentPage,
  onNavigateToHome,
  onNavigateToAbout,
  onNavigateToDrives,
  onNavigateToContact,
  onGoToDashboard,
  onDonateNow
}: DrivesProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");



  const upcomingDrives = [
    {
      id: 1,
      title: "Emergency Blood Drive - City Hospital",
      date: "January 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "City Hospital Main Lobby",
      address: "123 Medical Center Dr, Downtown",
      slotsAvailable: 45,
      totalSlots: 60,
      urgency: "high",
      bloodTypes: ["O-", "O+", "A-"],
      image: "https://images.unsplash.com/photo-1697192156499-d85cfe1452c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMGRvbmF0aW9uJTIwbWVkaWNhbCUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzU3MTM5NTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      organizer: "City Hospital Blood Bank"
    },
    {
      id: 2,
      title: "Community Heroes Blood Drive",
      date: "January 18, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Community Center",
      address: "456 Community Ave, Midtown",
      slotsAvailable: 28,
      totalSlots: 40,
      urgency: "medium",
      bloodTypes: ["All Types"],
      image: "https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwY29tbXVuaXR5JTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NTcxMzk1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      organizer: "Red Cross Community Chapter"
    },
    {
      id: 3,
      title: "University Campus Blood Drive",
      date: "January 22, 2024",
      time: "11:00 AM - 6:00 PM",
      location: "Student Union Building",
      address: "789 University Blvd, Campus",
      slotsAvailable: 52,
      totalSlots: 80,
      urgency: "low",
      bloodTypes: ["All Types"],
      image: "https://images.unsplash.com/photo-1739185069005-8cb46fef2702?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhvc3BpdGFsJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1NzEzOTUzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      organizer: "University Health Services"
    },
    {
      id: 4,
      title: "Corporate Partnership Drive",
      date: "January 25, 2024",
      time: "8:00 AM - 3:00 PM",
      location: "Tech Plaza Corporate Center",
      address: "321 Business Park Dr, Tech District",
      slotsAvailable: 15,
      totalSlots: 30,
      urgency: "medium",
      bloodTypes: ["B-", "AB-", "O-"],
      image: "https://images.unsplash.com/photo-1697192156499-d85cfe1452c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMGRvbmF0aW9uJTIwbWVkaWNhbCUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzU3MTM5NTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      organizer: "Corporate Health Initiative"
    },
    {
      id: 5,
      title: "Weekend Community Drive",
      date: "January 27, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "Riverside Park Pavilion",
      address: "555 Park Lane, Riverside",
      slotsAvailable: 35,
      totalSlots: 50,
      urgency: "low",
      bloodTypes: ["All Types"],
      image: "https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwY29tbXVuaXR5JTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NTcxMzk1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      organizer: "Riverside Community Association"
    },
    {
      id: 6,
      title: "Mobile Blood Drive - Shopping Center",
      date: "January 30, 2024",
      time: "12:00 PM - 7:00 PM",
      location: "Westfield Shopping Center",
      address: "888 Shopping Blvd, West Side",
      slotsAvailable: 22,
      totalSlots: 35,
      urgency: "high",
      bloodTypes: ["O-", "A-", "B-"],
      image: "https://images.unsplash.com/photo-1739185069005-8cb46fef2702?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhvc3BpdGFsJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1NzEzOTUzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      organizer: "Mobile Blood Services"
    }
  ];

  const filters = [
    { id: "all", label: "All Drives", count: upcomingDrives.length },
    { id: "high", label: "Urgent", count: upcomingDrives.filter(d => d.urgency === "high").length },
    { id: "medium", label: "Medium Priority", count: upcomingDrives.filter(d => d.urgency === "medium").length },
    { id: "low", label: "Regular", count: upcomingDrives.filter(d => d.urgency === "low").length }
  ];

  const filteredDrives = selectedFilter === "all" 
    ? upcomingDrives 
    : upcomingDrives.filter(drive => drive.urgency === selectedFilter);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-600 text-white";
      case "medium": return "bg-orange-500 text-white";
      case "low": return "bg-green-600 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "high": return "Urgent";
      case "medium": return "Medium Priority";
      case "low": return "Regular";
      default: return "Regular";
    }
  };

  return (
    <div className="min-h-screen bg-background transition-all duration-300 ease-in-out">
      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileMenuOpen}>
          {/* Background Overlay */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            {/* Sliding Menu Panel */}
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                {/* Close Button */}
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setMobileMenuOpen(false)}>
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                
                {/* Sidebar content goes here */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                      <button 
                        onClick={() => {
                          onNavigateToHome();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-1" 
                        aria-label="Home – Blood Donation"
                      >
                        <img 
                           src="/assets/logo.svg" 
                           alt="Blood Donation logo" 
                           width="32" 
                           height="32" 
                           className="w-8 h-8 object-contain"
                         />
                        <span className="text-xl font-semibold text-gray-900">Hemora</span>
                      </button>
                    </div>
                  <nav className="flex flex-1 flex-col">
                    <div className="space-y-1">
                      <button 
                        onClick={() => {
                          onNavigateToHome();
                          setMobileMenuOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                          currentPage === 'homepage' 
                            ? 'text-primary bg-primary/10' 
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }`}
                      >
                        Home
                      </button>
                      <button 
                        onClick={() => {
                          onNavigateToAbout();
                          setMobileMenuOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                          currentPage === 'about' 
                            ? 'text-primary bg-primary/10' 
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }`}
                      >
                        About
                      </button>
                      <button 
                        onClick={() => {
                          onNavigateToDrives();
                          setMobileMenuOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                          currentPage === 'drives' 
                            ? 'text-primary bg-primary/10' 
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }`}
                      >
                        Drives
                      </button>
                      <button 
                        onClick={() => {
                          onGoToDashboard();
                          setMobileMenuOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                          currentPage === 'dashboard' 
                            ? 'text-primary bg-primary/10' 
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }`}
                      >
                        Dashboard
                      </button>
                      <button 
                        onClick={() => {
                          onNavigateToContact();
                          setMobileMenuOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                          currentPage === 'contact' 
                            ? 'text-primary bg-primary/10' 
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }`}
                      >
                        Contact
                      </button>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Button 
                        onClick={() => {
                          onDonateNow();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full"
                      >
                        Donate Now
                      </Button>
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Navigation */}
      <nav className="navbar-sticky">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button 
              onClick={onNavigateToHome}
              className="flex items-center space-x-1 brand" 
              aria-label="Home – Blood Donation"
            >
              <img 
                 src="/assets/logo.svg" 
                 alt="Blood Donation logo" 
                 width="32" 
                 height="32" 
                 className="w-8 h-8 object-contain"
               />
              <span className="text-xl font-semibold app-name">Hemora</span>
            </button>
            <div className="navbar-desktop hidden md:flex items-center space-x-8">
              <button 
                onClick={onNavigateToHome} 
                className={`nav-link ${
                  currentPage === 'homepage' 
                    ? 'nav-link-active' 
                    : ''
                }`}
              >
                Home
              </button>
              <button 
                onClick={onNavigateToAbout} 
                className={`nav-link ${
                  currentPage === 'about' 
                    ? 'nav-link-active' 
                    : ''
                }`}
              >
                About
              </button>
              <button 
                onClick={onNavigateToDrives} 
                className={`nav-link ${
                  currentPage === 'drives' 
                    ? 'nav-link-active' 
                    : ''
                }`}
              >
                Drives
              </button>
              <button 
                onClick={onGoToDashboard} 
                className={`nav-link ${
                  currentPage === 'dashboard' 
                    ? 'nav-link-active' 
                    : ''
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={onNavigateToContact} 
                className={`nav-link ${
                  currentPage === 'contact' 
                    ? 'nav-link-active' 
                    : ''
                }`}
              >
                Contact
              </button>
              <Button onClick={onDonateNow}>Donate Now</Button>
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <Button onClick={onDonateNow} size="sm">Donate</Button>
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={onNavigateToHome}
              className="mb-6 text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-4xl lg:text-6xl mb-6 text-gray-900">
              Upcoming <span className="text-primary">Blood Drives</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Find and register for blood donation drives in your area. Every donation counts and helps save lives in your community.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-lg font-medium text-gray-900">Filter by Priority:</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                onClick={() => setSelectedFilter(filter.id)}
                className="transition-all duration-200"
              >
                {filter.label} ({filter.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Drives Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDrives.map((drive) => (
              <Card key={drive.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <ImageWithFallback
                    src={drive.image}
                    alt={drive.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className={`absolute top-3 right-3 ${getUrgencyColor(drive.urgency)}`}>
                    {getUrgencyLabel(drive.urgency)}
                  </Badge>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-medium">{drive.slotsAvailable} slots available</span>
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{drive.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    Organized by {drive.organizer}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-medium">{drive.date}</div>
                        <div className="text-sm text-gray-600">{drive.time}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">{drive.location}</div>
                        <div className="text-sm text-gray-600">{drive.address}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Heart className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-medium">Blood Types Needed:</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {drive.bloodTypes.map((type, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Availability</span>
                      <span className="text-sm font-medium">
                        {drive.slotsAvailable}/{drive.totalSlots} slots
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(drive.slotsAvailable / drive.totalSlots) * 100}%` }}
                      ></div>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={onDonateNow}
                      disabled={drive.slotsAvailable === 0}
                    >
                      {drive.slotsAvailable === 0 ? 'Fully Booked' : 'Register for Drive'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredDrives.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No drives found
              </h3>
              <p className="text-gray-600 mb-6">
                No blood drives match your current filter. Try selecting a different filter or check back later.
              </p>
              <Button onClick={() => setSelectedFilter("all")} variant="outline">
                Show All Drives
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl mb-6 text-gray-900">
            Can't Find a Convenient Drive?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a personal donation appointment at one of our permanent donation centers. 
            We have flexible hours and locations to fit your schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onDonateNow} className="px-8 py-3">
              <Heart className="mr-2 h-5 w-5" />
              Schedule Personal Appointment
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onNavigateToContact}
              className="px-8 py-3"
            >
              Contact Us for More Info
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}