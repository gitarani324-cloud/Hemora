import React, { useState, Fragment } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Heart, Mail, Phone, MapPin, Clock, ArrowLeft, Send } from "lucide-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { Dialog, Transition } from "@headlessui/react";


interface ContactProps {
  currentPage: string;
  onNavigateToHome: () => void;
  onNavigateToAbout: () => void;
  onNavigateToDrives: () => void;
  onNavigateToContact: () => void;
  onGoToDashboard: () => void;
  onDonateNow: () => void;
}

export function Contact({
  currentPage,
  onNavigateToHome,
  onNavigateToAbout,
  onNavigateToDrives,
  onNavigateToContact,
  onGoToDashboard,
  onDonateNow
}: ContactProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours."
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "Emergency: +1 (555) 911-BLOOD"],
      description: "Available 24/7 for urgent blood requests"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@hemora.org", "urgent@hemora.org"],
      description: "We respond to all emails within 24 hours"
    },
    {
      icon: MapPin,
      title: "Main Office",
      details: ["123 Healthcare Plaza", "Medical District, City 12345"],
      description: "Visit us for in-person consultations"
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat-Sun: 9:00 AM - 4:00 PM"],
      description: "Extended hours for donation appointments"
    }
  ];

  const faqs = [
    {
      question: "How often can I donate blood?",
      answer: "You can donate whole blood every 56 days (8 weeks). Platelet donations can be made every 7 days, up to 24 times per year."
    },
    {
      question: "What should I do before donating?",
      answer: "Eat a healthy meal, drink plenty of water, get a good night's sleep, and bring a valid ID. Avoid alcohol 24 hours before donation."
    },
    {
      question: "How long does the donation process take?",
      answer: "The entire process takes about 45-60 minutes, with the actual blood donation taking only 8-10 minutes."
    },
    {
      question: "Are there any side effects?",
      answer: "Most people feel fine after donating. Some may experience mild dizziness or fatigue, which usually resolves quickly with rest and fluids."
    }
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
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Have questions about blood donation? Need help with scheduling? We're here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us how we can help you..."
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full py-3" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  We're committed to making blood donation as easy and accessible as possible. 
                  Reach out to us through any of the following channels.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                          ))}
                          <p className="text-sm text-gray-600 mt-2">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl mb-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about blood donation. Can't find what you're looking for? Contact us directly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl mb-6">
            Emergency Blood Request?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            For urgent blood requests or medical emergencies requiring immediate blood supply, 
            contact our emergency hotline available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Emergency Line: (555) 911-BLOOD
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={onDonateNow}
              className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3"
            >
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}