import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Avatar, AvatarContent, AvatarFallback } from "./ui/avatar";
import { Heart, Calendar, MapPin, Bell, User, Award, Clock, Droplets, ChevronLeft, BookOpen, Settings, Star, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface DonorDashboardProps {
  onBookAppointment: () => void;
  onGoHome: () => void;
}

// Mock donor data - in a real app this would come from a database/API
const mockDonorData = {
  name: "Sarah Johnson",
  bloodType: "A+",
  totalDonations: 12,
  nextEligibleDate: new Date("2024-11-15"),
  lastDonation: new Date("2024-09-20"),
  joinDate: new Date("2022-03-15"),
  phone: "(555) 123-4567",
  email: "sarah.johnson@email.com",
  location: "New York, NY"
};

const donationHistory = [
  {
    id: 1,
    date: new Date("2024-09-20"),
    location: "Central Community Blood Center",
    units: 1,
    type: "Whole Blood",
    status: "completed"
  },
  {
    id: 2,
    date: new Date("2024-07-15"),
    location: "Mercy Hospital Blood Drive",
    units: 1,
    type: "Whole Blood",
    status: "completed"
  },
  {
    id: 3,
    date: new Date("2024-05-10"),
    location: "University Health Center",
    units: 1,
    type: "Platelets",
    status: "completed"
  },
  {
    id: 4,
    date: new Date("2024-03-22"),
    location: "Downtown Blood Bank",
    units: 1,
    type: "Whole Blood",
    status: "completed"
  }
];

const badges = [
  { id: 1, name: "First Time Donor", icon: "🩸", earned: true, description: "Completed your first donation" },
  { id: 2, name: "5 Donations", icon: "🏅", earned: true, description: "Reached 5 total donations" },
  { id: 3, name: "Regular Hero", icon: "⭐", earned: true, description: "Donated regularly for 6+ months" },
  { id: 4, name: "10 Donations", icon: "🏆", earned: true, description: "Reached 10 total donations" },
  { id: 5, name: "Life Saver", icon: "💝", earned: false, description: "Help save 50+ lives (17 donations)" },
  { id: 6, name: "Champion", icon: "👑", earned: false, description: "Reach 25 total donations" }
];

const notifications = [
  {
    id: 1,
    type: "urgent",
    title: "Critical Blood Shortage",
    message: "O-negative blood urgently needed at Central Hospital. Your blood type is compatible!",
    time: "2 hours ago",
    actionText: "Respond"
  },
  {
    id: 2,
    type: "info",
    title: "Community Blood Drive",
    message: "Join us this Saturday at the Community Center for our monthly blood drive.",
    time: "1 day ago",
    actionText: "Learn More"
  },
  {
    id: 3,
    type: "reminder",
    title: "Donation Reminder",
    message: "You'll be eligible to donate again in 10 days. Want to schedule now?",
    time: "2 days ago",
    actionText: "Schedule"
  }
];

export function DonorDashboard({ onBookAppointment, onGoHome }: DonorDashboardProps) {
  const [daysUntilEligible, setDaysUntilEligible] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const today = new Date();
    const timeDiff = mockDonorData.nextEligibleDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysUntilEligible(Math.max(0, daysDiff));

    // Calculate progress (56 days between donations for whole blood)
    const donationInterval = 56;
    const daysSinceLastDonation = Math.floor((today.getTime() - mockDonorData.lastDonation.getTime()) / (1000 * 3600 * 24));
    const progress = Math.min(100, (daysSinceLastDonation / donationInterval) * 100);
    setProgressPercentage(progress);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent': return '🚨';
      case 'info': return 'ℹ️';
      case 'reminder': return '⏰';
      default: return '📢';
    }
  };

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'urgent': return 'border-red-200 bg-red-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      case 'reminder': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-1 mb-4">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold">Hemora</span>
            </div>
            <h1 className="text-3xl mb-2">Welcome back, {mockDonorData.name.split(' ')[0]}! 👋</h1>
            <p className="text-gray-600">Thank you for being a hero in your community</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onGoHome}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button onClick={onBookAppointment}>
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Stats */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarContent>SJ</AvatarContent>
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{mockDonorData.name}</h3>
                    <p className="text-gray-600">Blood Type: {mockDonorData.bloodType}</p>
                    <p className="text-sm text-gray-500">Donor since {formatDate(mockDonorData.joinDate)}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{mockDonorData.totalDonations}</p>
                    <p className="text-sm text-gray-600">Total Donations</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{mockDonorData.totalDonations * 3}</p>
                    <p className="text-sm text-gray-600">Lives Potentially Saved</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Settings className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Next Eligible Date Countdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Next Donation Eligibility</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  {daysUntilEligible > 0 ? (
                    <>
                      <div className="text-3xl font-bold text-primary mb-2">{daysUntilEligible}</div>
                      <p className="text-gray-600">days remaining</p>
                    </>
                  ) : (
                    <>
                      <div className="text-3xl font-bold text-green-600 mb-2">✓</div>
                      <p className="text-green-600 font-semibold">Eligible Now!</p>
                    </>
                  )}
                </div>
                
                <div className="relative">
                  <Progress value={progressPercentage} className="h-3 mb-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Last donation: {formatDate(mockDonorData.lastDonation)}</span>
                    <span>{progressPercentage.toFixed(0)}%</span>
                  </div>
                </div>

                {daysUntilEligible === 0 && (
                  <Button className="w-full mt-4" onClick={onBookAppointment}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Donation
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Donation Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Impact
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - History & Badges */}
          <div className="space-y-6">
            {/* Donation History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Droplets className="h-5 w-5" />
                  <span>Donation History</span>
                </CardTitle>
                <CardDescription>Your recent donations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationHistory.slice(0, 4).map((donation, index) => (
                    <motion.div
                      key={donation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="rounded-full bg-primary/10 p-2">
                        <Droplets className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{donation.location}</p>
                        <p className="text-xs text-gray-600">{formatDate(donation.date)}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {donation.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{donation.units} unit</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        ✓ Completed
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Full History
                </Button>
              </CardContent>
            </Card>

            {/* Achievement Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Achievement Badges</span>
                </CardTitle>
                <CardDescription>Your donation milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge) => (
                    <motion.div
                      key={badge.id}
                      whileHover={{ scale: 1.05 }}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        badge.earned 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-gray-200 bg-gray-50 text-gray-400'
                      }`}
                    >
                      <div className="text-2xl mb-2">{badge.icon}</div>
                      <p className="text-xs font-semibold">{badge.name}</p>
                      <p className="text-xs opacity-75 mt-1">{badge.description}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Progress:</strong> 5 more donations to unlock "Life Saver" badge!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Notifications */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                  <Badge variant="destructive" className="ml-auto">
                    {notifications.filter(n => n.type === 'urgent').length}
                  </Badge>
                </CardTitle>
                <CardDescription>Updates and urgent requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${getNotificationStyle(notification.type)}`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
                          <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className={notification.type === 'urgent' ? 'border-red-300 text-red-700 hover:bg-red-50' : ''}
                            >
                              {notification.actionText}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Impact Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Your Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🏥</div>
                  <p className="text-sm text-gray-600">Your donations have helped</p>
                  <p className="text-2xl font-bold text-primary">{mockDonorData.totalDonations * 3}</p>
                  <p className="text-sm text-gray-600">people in need</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-semibold text-green-800">Emergency Cases</p>
                    <p className="text-green-600">8 helped</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-blue-800">Surgeries</p>
                    <p className="text-blue-600">15 supported</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg text-center">
                  <p className="text-sm text-red-800">
                    <strong>You're a hero!</strong> Keep up the amazing work.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}