import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Heart, Mail, Phone, MapPin, Clock, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

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
                id="hamburger-btn"
                className="hamburger-icon" 
                aria-label="Menu"
                aria-expanded="false"
                onClick={() => {
                  const menu = document.getElementById('mobile-menu');
                const overlay = document.getElementById('mobile-menu-overlay');
                  if (menu && overlay) {
                    menu.classList.remove('hidden');
                    overlay.classList.remove('hidden');
                  }
                }}
              >
                &#9776;
              </button>
            </div>
          </div>
          <div id="mobile-menu-overlay" className="mobile-menu-overlay hidden"></div>
          <div id="mobile-menu" className="mobile-menu hidden">
            <div className="mobile-menu-header">
              <div className="mobile-menu-logo">
              <img src="/assets/logo.svg" alt="Hemora" className="mobile-logo-img" />
              <span>Hemora</span>
            </div>
              <button 
                id="mobile-close-btn"
                className="mobile-menu-close" 
                aria-label="Close menu"
              >
                ×
              </button>
            </div>
            <div className="mobile-menu-content">
              <button className={`mobile-menu-button ${currentPage === 'homepage' ? 'active' : ''}`} onClick={onNavigateToHome}>Home</button>
              <button className={`mobile-menu-button ${currentPage === 'about' ? 'active' : ''}`} onClick={onNavigateToAbout}>About</button>
              <button className={`mobile-menu-button ${currentPage === 'drives' ? 'active' : ''}`} onClick={onNavigateToDrives}>Drives</button>
              <button className={`mobile-menu-button ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={onGoToDashboard}>Dashboard</button>
              <button className={`mobile-menu-button ${currentPage === 'contact' ? 'active' : ''}`} onClick={onNavigateToContact}>Contact</button>
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