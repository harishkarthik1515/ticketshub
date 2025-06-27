import React, { useState } from 'react';
import { 
  Calendar, Plus, Users, TrendingUp, Clock, MapPin, 
  Star, Eye, Edit, Trash2, MessageSquare, Target, CheckCircle, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useManagementAuth } from '../../contexts/ManagementAuthContext';
import { getEventsByOrganizer, getConnectionsByUser } from '../../data/mockDatabase';
import Breadcrumbs from '../Breadcrumbs';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useManagementAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const myEvents = getEventsByOrganizer(user.id);
  const connections = getConnectionsByUser(user.id);

  // Organizer-specific analytics data
  const eventPerformanceData = [
    { month: 'Jan', events: 5, attendees: 1200, revenue: 450000 },
    { month: 'Feb', events: 8, attendees: 2100, revenue: 780000 },
    { month: 'Mar', events: 6, attendees: 1800, revenue: 650000 },
    { month: 'Apr', events: 10, attendees: 2800, revenue: 980000 },
    { month: 'May', events: 12, attendees: 3200, revenue: 1200000 },
    { month: 'Jun', events: 15, attendees: 4100, revenue: 1450000 },
  ];

  const eventCategoryData = [
    { name: 'Corporate Events', value: 40, color: '#3b82f6' },
    { name: 'Entertainment', value: 30, color: '#8b5cf6' },
    { name: 'Educational', value: 20, color: '#10b981' },
    { name: 'Social Events', value: 10, color: '#f59e0b' },
  ];

  const partnerEngagementData = [
    { type: 'Vendors', connected: 25, pending: 5 },
    { type: 'Speakers', connected: 18, pending: 3 },
    { type: 'Sponsors', connected: 12, pending: 2 },
  ];

  const stats = [
    {
      title: 'My Events Created',
      value: myEvents.length,
      change: '+2 this month',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Partner Connections',
      value: connections.filter(c => c.status === 'accepted').length,
      change: '+5 new partnerships',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Collaborations',
      value: connections.filter(c => c.status === 'pending').length,
      change: '3 awaiting response',
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Event Success Rate',
      value: '94%',
      change: '+2% improvement',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const recentOrganizerActivities = [
    {
      id: 1,
      message: 'Tech Innovation Summit 2025 published and live for bookings',
      time: '2 hours ago',
      type: 'success',
      icon: CheckCircle
    },
    {
      id: 2,
      message: 'New partnership request from Elite Catering Services',
      time: '4 hours ago',
      type: 'info',
      icon: Users
    },
    {
      id: 3,
      message: 'Event proposal for Business Conference approved by admin',
      time: '1 day ago',
      type: 'success',
      icon: Calendar
    }
  ];

  const handleCreateEvent = () => {
    navigate('/management/create-event');
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Organizer Hub</h1>
          <p className="text-gray-600 mt-1">Create amazing events and build powerful partnerships</p>
        </div>
        <button 
          onClick={handleCreateEvent}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <p className="text-green-600 text-xs mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Performance Trends</h3>
          <LineChart 
            data={eventPerformanceData} 
            dataKey="attendees" 
            xAxisKey="month" 
            color="#3b82f6"
            height={250}
          />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Category Distribution</h3>
          <PieChart 
            data={eventCategoryData} 
            dataKey="value" 
            nameKey="name"
            height={250}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth</h3>
        <BarChart 
          data={eventPerformanceData} 
          dataKey="revenue" 
          xAxisKey="month" 
          color="#10b981"
          height={250}
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Recent Activity' },
              { id: 'events', label: 'My Events' },
              { id: 'connections', label: 'Partner Network' },
              { id: 'suggestions', label: 'Recommended Partners' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {recentOrganizerActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        activity.type === 'success' ? 'text-green-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{activity.message}</p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">My Event Portfolio</h3>
                <button 
                  onClick={handleCreateEvent}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Event</span>
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {myEvents.map((event) => (
                  <div key={event.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{event.title}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.venue}, {event.location}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'published' ? 'bg-green-100 text-green-800' :
                        event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{event.expectedAttendees}</span> expected attendees
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'connections' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Partner Network Status</h3>
              <div className="space-y-4">
                {connections.map((connection) => (
                  <div key={connection.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{connection.partnerType} Partnership</h4>
                        <p className="text-gray-600 text-sm">Event: Tech Innovation Summit 2025</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      connection.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      connection.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {connection.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'suggestions' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI-Recommended Partners</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Elite Catering', type: 'Vendor', rating: 4.8, specialty: 'Premium Catering', match: '95%' },
                  { name: 'Dr. Sarah Wilson', type: 'Speaker', rating: 4.9, specialty: 'AI & Technology', match: '92%' },
                  { name: 'TechCorp Solutions', type: 'Sponsor', rating: 4.7, specialty: 'Technology Events', match: '88%' }
                ].map((partner, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{partner.name}</h4>
                        <p className="text-gray-600 text-sm">{partner.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{partner.rating}</span>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">{partner.match} match</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{partner.specialty}</p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;