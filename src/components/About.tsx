import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Heart, Users, Calendar, MapPin, UserCheck, Clock, Award, ArrowLeft } from "lucide-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";


interface AboutProps {
  currentPage: string;
  onNavigateToHome: () => void;
  onNavigateToAbout: () => void;
  onNavigateToDrives: () => void;
  onNavigateToContact: () => void;
  onGoToDashboard: () => void;
  onDonateNow: () => void;
}

export function About({
  currentPage,
  onNavigateToHome,
  onNavigateToAbout,
  onNavigateToDrives,
  onNavigateToContact,
  onGoToDashboard,
  onDonateNow
}: AboutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  const impactStats = [
    { number: "1", description: "donation can save up to 3 lives" },
    { number: "4.5M", description: "Americans need blood transfusions each year" },
    { number: "43,000", description: "units of blood are used daily in the US" },
    { number: "38%", description: "of the population is eligible to donate" }
  ];

  const bloodTypes = [
    { type: "O-", description: "Universal donor - can give to all blood types", urgent: true },
    { type: "O+", description: "Most common blood type - high demand", urgent: false },
    { type: "A-", description: "Can donate to A and AB blood types", urgent: false },
    { type: "A+", description: "Second most common blood type", urgent: false },
    { type: "B-", description: "Rare blood type - always needed", urgent: true },
    { type: "B+", description: "Can donate to B and AB blood types", urgent: false },
    { type: "AB-", description: "Rare blood type - universal plasma donor", urgent: true },
    { type: "AB+", description: "Universal plasma donor", urgent: false }
  ];

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
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16 lg:py-24">
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
              About <span className="text-primary">Blood Donation</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Blood donation is one of the most significant contributions you can make to society. 
              Every donation has the potential to save multiple lives and make a lasting impact on your community.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl mb-4 text-gray-900">The Impact of Your Donation</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding the numbers behind blood donation helps illustrate just how vital your contribution is.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <p className="text-gray-600">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Blood Donation Matters */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl mb-6 text-gray-900">
                Why Blood Donation <span className="text-primary">Matters</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 mt-1">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Saves Lives</h3>
                    <p className="text-gray-600">
                      Blood transfusions are essential for surgeries, cancer treatments, chronic illnesses, 
                      and traumatic injuries. Your donation directly saves lives.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 mt-1">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                    <p className="text-gray-600">
                      Blood cannot be manufactured - it can only come from generous donors like you. 
                      Your donation supports your local community and hospitals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 mt-1">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Personal Health Benefits</h3>
                    <p className="text-gray-600">
                      Regular blood donation can help maintain healthy iron levels, provide free health screenings, 
                      and may reduce the risk of certain health conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Heart-shaped object and syringe - blood donation concept"
                className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blood Types Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl mb-4 text-gray-900">Blood Types & Compatibility</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding blood types helps us match donors with recipients and highlights the importance of diverse donors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bloodTypes.map((blood, index) => (
              <Card key={index} className={`border-2 hover:shadow-lg transition-all ${
                blood.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200'
              }`}>
                <CardHeader className="text-center">
                  <CardTitle className={`text-2xl ${
                    blood.urgent ? 'text-red-600' : 'text-primary'
                  }`}>
                    {blood.type}
                  </CardTitle>
                  {blood.urgent && (
                    <div className="text-xs bg-red-600 text-white px-2 py-1 rounded-full inline-block">
                      High Need
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {blood.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of heroes in your community. Schedule your blood donation appointment today 
            and help save lives in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onDonateNow}
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3"
            >
              <Heart className="mr-2 h-5 w-5" />
              Schedule Donation
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={onNavigateToDrives}
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-3"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Find Blood Drives
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}