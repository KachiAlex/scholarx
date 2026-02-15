import React from 'react';
import { Users, GraduationCap, DollarSign, FileText, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const stats = [
  { label: 'Total Students', value: '2,847', change: '+12%', icon: <Users className="w-5 h-5" />, color: 'blue' },
  { label: 'Total Staff', value: '168', change: '+3', icon: <GraduationCap className="w-5 h-5" />, color: 'green' },
  { label: 'Fee Collection', value: '₦45.2M', change: '+8%', icon: <DollarSign className="w-5 h-5" />, color: 'purple' },
  { label: 'Active Exams', value: '12', change: '3 ongoing', icon: <FileText className="w-5 h-5" />, color: 'orange' },
];

const enrollmentData = [
  { month: 'Aug', students: 2650 },
  { month: 'Sep', students: 2720 },
  { month: 'Oct', students: 2780 },
  { month: 'Nov', students: 2810 },
  { month: 'Dec', students: 2795 },
  { month: 'Jan', students: 2847 },
];

const performanceData = [
  { class: 'JSS 1', excellent: 45, good: 35, average: 15, poor: 5 },
  { class: 'JSS 2', excellent: 42, good: 38, average: 14, poor: 6 },
  { class: 'JSS 3', excellent: 48, good: 32, average: 15, poor: 5 },
  { class: 'SS 1', excellent: 40, good: 35, average: 18, poor: 7 },
  { class: 'SS 2', excellent: 38, good: 40, average: 17, poor: 5 },
  { class: 'SS 3', excellent: 52, good: 30, average: 13, poor: 5 },
];

const feeCollectionData = [
  { name: 'Collected', value: 78, color: '#10b981' },
  { name: 'Pending', value: 15, color: '#f59e0b' },
  { name: 'Overdue', value: 7, color: '#ef4444' },
];

const recentActivities = [
  { title: 'Result Approval Pending', description: 'SS3 First Term results awaiting approval', time: '2 hours ago', type: 'warning' },
  { title: 'New Student Enrolled', description: 'John Adewale added to JSS 1A', time: '4 hours ago', type: 'success' },
  { title: 'Exam Scheduled', description: 'Mathematics CBT for JSS 2 - Jan 20', time: '5 hours ago', type: 'info' },
  { title: 'Fee Payment Received', description: '₦125,000 received from 15 students', time: '1 day ago', type: 'success' },
];

const upcomingEvents = [
  { title: 'Mid-Term Break', date: 'Feb 18 - Feb 22', type: 'Holiday' },
  { title: 'Parent-Teacher Conference', date: 'Feb 25', type: 'Meeting' },
  { title: 'SS3 Mock Exams', date: 'Mar 3 - Mar 7', type: 'Exam' },
  { title: 'Staff Training Workshop', date: 'Mar 10', type: 'Training' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.color === 'blue' ? 'text-blue-600' : stat.color === 'green' ? 'text-green-600' : stat.color === 'purple' ? 'text-purple-600' : 'text-orange-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' : stat.color === 'green' ? 'bg-green-100 text-green-600' : stat.color === 'purple' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Collection Status */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Collection Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={feeCollectionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {feeCollectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Academic Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Performance by Class</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="class" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="excellent" stackId="a" fill="#10b981" />
              <Bar dataKey="good" stackId="a" fill="#3b82f6" />
              <Bar dataKey="average" stackId="a" fill="#f59e0b" />
              <Bar dataKey="poor" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activities and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                  <div className={`p-2 rounded-lg ${activity.type === 'warning' ? 'bg-yellow-100' : activity.type === 'success' ? 'bg-green-100' : 'bg-blue-100'}`}>
                    {activity.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    ) : activity.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{event.date}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
