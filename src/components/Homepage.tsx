import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Heart, Users, Calendar, MapPin, UserCheck, Clock, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface HomepageProps {
  currentPage: string;
  onDonateNow: () => void;
  onFindDrive: () => void;
  onRequestBlood: () => void;
  onGoToDashboard: () => void;
  onNavigateToAbout: () => void;
  onNavigateToDrives: () => void;
  onNavigateToContact: () => void;
  onNavigateToHome: () => void;
}

export function Homepage({ 
  currentPage,
  onDonateNow, 
  onFindDrive, 
  onRequestBlood, 
  onGoToDashboard,
  onNavigateToAbout,
  onNavigateToDrives,
  onNavigateToContact,
  onNavigateToHome
}: HomepageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);



  const stats = [
    { label: "Units Needed Today", value: "247", icon: Heart },
    { label: "Active Donors This Month", value: "1,284", icon: Users },
    { label: "Upcoming Drives", value: "12", icon: Calendar },
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: "Register",
      description: "Create your donor profile and complete health screening",
      icon: UserCheck,
    },
    {
      step: 2,
      title: "Book",
      description: "Schedule your donation at a convenient time and location",
      icon: Calendar,
    },
    {
      step: 3,
      title: "Donate",
      description: "Complete your donation and help save lives",
      icon: Heart,
    },
  ];

  const campaigns = [
    {
      title: "Emergency Blood Drive",
      description: "Critical shortage of O-negative blood. Your donation can save up to 3 lives.",
      image: "https://images.unsplash.com/photo-1697192156499-d85cfe1452c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMGRvbmF0aW9uJTIwbWVkaWNhbCUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzU3MTM5NTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      urgent: true,
    },
    {
      title: "Community Heroes Drive",
      description: "Join local heroes in our monthly community blood donation event.",
      image: "https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwY29tbXVuaXR5JTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NTcxMzk1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      urgent: false,
    },
    {
      title: "Hospital Partnership",
      description: "Supporting local hospitals with regular blood supply partnerships.",
      image: "https://images.unsplash.com/photo-1739185069005-8cb46fef2702?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhvc3BpdGFsJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1NzEzOTUzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      urgent: false,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Donor",
      quote: "Donating blood has been one of the most rewarding experiences. Knowing that I'm helping save lives gives me purpose.",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "First-time Donor",
      quote: "The process was so smooth and the staff made me feel comfortable. I'll definitely be coming back to donate again.",
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Blood Recipient's Family",
      quote: "My father needed emergency surgery and blood transfusions saved his life. Thank you to all the donors out there.",
      avatar: "ER",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl mb-6 text-gray-900">
                Donate Blood, <span className="text-primary">Save Lives.</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-lg">
                Every donation can save up to three lives. Join our community of heroes and make a difference in your local area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={onDonateNow} className="px-8 py-3">
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={onRequestBlood}
                  className="px-8 py-3 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Request Blood
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1697192156499-d85cfe1452c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMGRvbmF0aW9uJTIwbWVkaWNhbCUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzU3MTM5NTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Blood donation"
                className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl text-primary mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl mb-4 text-gray-900">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started as a blood donor is simple. Follow these three easy steps to begin saving lives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <Card key={index} className="text-center border-none shadow-md">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-primary text-white w-16 h-16 flex items-center justify-center">
                      <step.icon className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">
                    Step {step.step}: {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl mb-4 text-gray-900">Featured Campaigns</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our current blood donation campaigns and make an immediate impact in your community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                  />
                  {campaign.urgent && (
                    <Badge className="absolute top-2 right-2 bg-red-600 text-white">
                      Urgent
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{campaign.title}</CardTitle>
                  <CardDescription>{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={onDonateNow}>
                    Join Campaign
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl mb-4 text-gray-900">What Our Community Says</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from donors and families whose lives have been touched by blood donation.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="relative">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevTestimonial}
                    className="p-2"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextTestimonial}
                    className="p-2"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="text-center">
                  <blockquote className="text-lg italic text-gray-700 mb-6">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonials[currentTestimonial].name}
                      </p>
                      <p className="text-gray-600">
                        {testimonials[currentTestimonial].role}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Hemora</span>
              </div>
              <p className="text-gray-400">
                Connecting donors with those in need. Every donation saves lives.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Our Mission</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Impact Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Medical Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Hemora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}