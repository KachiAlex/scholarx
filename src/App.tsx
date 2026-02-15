import React, { useState } from 'react';
import { Menu, User, Bell, Search } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/pages/Dashboard';
import { StudentsList } from './components/pages/StudentsList';
import { ExamManagement } from './components/pages/ExamManagement';
import { FinanceManagement } from './components/pages/FinanceManagement';
import { AnalyticsDashboard } from './components/pages/AnalyticsDashboard';
import { SystemSettings } from './components/pages/SystemSettings';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // If not showing dashboard, show the home page
  if (!showDashboard) {
    return <HomePage onNavigateToDashboard={() => setShowDashboard(true)} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'students-list':
      case 'student-enrollment':
      case 'student-promotion':
      case 'student-documents':
        return <StudentsList />;
      case 'exam-creation':
      case 'question-bank':
      case 'live-monitoring':
      case 'exam-results':
      case 'exam-security':
        return <ExamManagement />;
      case 'fee-structure':
      case 'fee-collection':
      case 'outstanding-fees':
      case 'invoices':
      case 'financial-reports':
        return <FinanceManagement />;
      case 'academic-analytics':
      case 'student-progress':
      case 'teacher-performance':
      case 'attendance-analytics':
      case 'financial-analytics':
        return <AnalyticsDashboard />;
      case 'system-settings':
      case 'school-profile':
      case 'roles-permissions':
      case 'user-accounts':
      case 'audit-logs':
      case 'import-export':
        return <SystemSettings />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Feature Coming Soon
              </h2>
              <p className="text-gray-600">
                This module is currently under development.
              </p>
            </div>
          </div>
        );
    }
  };

  const getPageTitle = () => {
    const pageTitles: { [key: string]: string } = {
      dashboard: 'Dashboard',
      'students-list': 'Student Management',
      'student-enrollment': 'Student Enrollment',
      'exam-creation': 'CBT & Examinations',
      'fee-structure': 'Finance & Fees',
      'academic-analytics': 'Analytics & Reports',
      'system-settings': 'System Settings',
    };
    return pageTitles[activePage] || 'SCHOLIX';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h1>
              <p className="text-xs text-gray-500">2025/2026 Academic Session - First Term</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64"
              />
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium text-gray-900">Result Approval Pending</p>
                    <p className="text-xs text-gray-600 mt-1">SS3 First Term results awaiting approval</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <div className="p-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium text-gray-900">New Student Enrolled</p>
                    <p className="text-xs text-gray-600 mt-1">John Adewale added to JSS 1A</p>
                    <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                  </div>
                  <div className="p-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium text-gray-900">Exam Scheduled</p>
                    <p className="text-xs text-gray-600 mt-1">Mathematics CBT for JSS 2 - Jan 20</p>
                    <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">System Administrator</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Change Password</DropdownMenuItem>
                <DropdownMenuItem>Activity Log</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600"
                  onClick={() => setShowDashboard(false)}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
