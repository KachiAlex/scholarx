import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Menu, User, Bell, Search } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/pages/Dashboard';
import { StudentsList } from './components/pages/StudentsList';
import { StudentEnrollment } from './components/pages/StudentEnrollment';
import { StudentPromotion } from './components/pages/StudentPromotion';
import { StudentDocuments } from './components/pages/StudentDocuments';
import { StudentHealth } from './components/pages/StudentHealth';
import { StudentAttendance } from './components/pages/StudentAttendance';
import { TimetableScheduling } from './components/pages/TimetableScheduling';
import { StaffHR } from './components/pages/StaffHR';
import { CommunicationHub } from './components/pages/CommunicationHub';
import { ExamManagement } from './components/pages/ExamManagement';
import { FinanceManagement } from './components/pages/FinanceManagement';
import { AnalyticsDashboard } from './components/pages/AnalyticsDashboard';
import { SystemSettings } from './components/pages/SystemSettings';
import { SchoolProfile } from './components/pages/SchoolProfile';
import { RolesPermissions } from './components/pages/RolesPermissions';
import { UserAccounts } from './components/pages/UserAccounts';
import { AuditLogs } from './components/pages/AuditLogs';
import { ImportExport } from './components/pages/ImportExport';
import { AcademicStructureOverview } from './components/pages/AcademicStructureOverview';
import { ClassesAndArms } from './components/pages/ClassesAndArms';
import { SubjectsCatalog } from './components/pages/SubjectsCatalog';
import { TeacherAllocation } from './components/pages/TeacherAllocation';
import { CAConfiguration } from './components/pages/CAConfiguration';
import { GradingPolicy } from './components/pages/GradingPolicy';
import { AcademicCalendar } from './components/pages/AcademicCalendar';
import { CAScoreEntry } from './components/pages/CAScoreEntry';
import { ResultComputation } from './components/pages/ResultComputation';
import { ResultApproval } from './components/pages/ResultApproval';
import { Broadsheets } from './components/pages/Broadsheets';
import { Transcripts } from './components/pages/Transcripts';
import { ResultPublishing } from './components/pages/ResultPublishing';
import { AccessControl } from './components/pages/AccessControl';
import { SessionManagement } from './components/pages/SessionManagement';
import { DataEncryption } from './components/pages/DataEncryption';
import { BackupRestore } from './components/pages/BackupRestore';
import { PendingApprovals } from './components/pages/PendingApprovals';
import { SystemAlerts } from './components/pages/SystemAlerts';
import { TaskManagement } from './components/pages/TaskManagement';
import { SchoolBranding } from './components/pages/SchoolBranding';
import { ReportTemplates } from './components/pages/ReportTemplates';
import { GradingScale } from './components/pages/GradingScale';
import { SuperAdminPortal } from './components/pages/SuperAdminPortal';
import { LoginRole } from './components/auth/LoginPanel';
import { AccessPortalPage } from './components/pages/AccessPortalPage';
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
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLoginSuccess = (role: LoginRole) => {
    navigate(role === 'super-admin' ? '/super-admin' : '/tenant');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'students-list':
        return <StudentsList />;
      case 'student-enrollment':
        return <StudentEnrollment />;
      case 'student-promotion':
        return <StudentPromotion />;
      case 'student-documents':
        return <StudentDocuments />;
      case 'student-health':
        return <StudentHealth />;
      case 'student-attendance':
        return <StudentAttendance />;
      case 'class-timetable':
      case 'teacher-timetable':
      case 'exam-timetable':
        return <TimetableScheduling
          initialView={
            activePage === 'teacher-timetable'
              ? 'teacher'
              : activePage === 'exam-timetable'
              ? 'exam'
              : 'class'
          }
        />;
      case 'staff-list':
      case 'staff-roles':
      case 'payroll':
      case 'leave-management':
      case 'performance':
        return <StaffHR />;
      case 'announcements':
      case 'bulk-notifications':
      case 'parent-messaging':
      case 'communication-logs':
        return <CommunicationHub />;
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
      case 'academic-structure':
        return <AcademicStructureOverview />;
      case 'classes':
        return <ClassesAndArms />;
      case 'subjects':
        return <SubjectsCatalog />;
      case 'teacher-allocation':
        return <TeacherAllocation />;
      case 'ca-configuration':
        return <CAConfiguration />;
      case 'ca-entry':
        return <CAScoreEntry />;
      case 'result-computation':
        return <ResultComputation />;
      case 'result-approval':
        return <ResultApproval />;
      case 'broadsheets':
        return <Broadsheets />;
      case 'transcripts':
        return <Transcripts />;
      case 'result-publishing':
        return <ResultPublishing />;
      case 'grading-policy':
        return <GradingPolicy />;
      case 'academic-calendar':
        return <AcademicCalendar />;
      case 'access-control':
        return <AccessControl />;
      case 'session-management':
        return <SessionManagement />;
      case 'data-encryption':
        return <DataEncryption />;
      case 'backup-restore':
        return <BackupRestore />;
      case 'pending-approvals':
        return <PendingApprovals />;
      case 'system-alerts':
        return <SystemAlerts />;
      case 'task-management':
        return <TaskManagement />;
      case 'branding':
        return <SchoolBranding />;
      case 'report-templates':
        return <ReportTemplates />;
      case 'grading-scale':
        return <GradingScale />;
      case 'system-settings':
        return <SystemSettings />;
      case 'school-profile':
        return <SchoolProfile />;
      case 'roles-permissions':
        return <RolesPermissions />;
      case 'user-accounts':
        return <UserAccounts />;
      case 'audit-logs':
        return <AuditLogs />;
      case 'import-export':
        return <ImportExport />;
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

  const tenantShell = (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
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
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>

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
                <DropdownMenuItem className="text-red-600" onClick={() => navigate('/login')}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{renderPage()}</main>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<HomePage onNavigateToDashboard={() => navigate('/login')} />} />
      <Route
        path="/login"
        element={<AccessPortalPage onLoginSuccess={handleLoginSuccess} onBackToMarketing={() => navigate('/')} />}
      />
      <Route path="/tenant" element={tenantShell} />
      <Route path="/super-admin" element={<SuperAdminPortal onSignOut={() => navigate('/login')} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
