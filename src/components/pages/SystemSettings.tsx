import React, { useState } from 'react';
import { Save, Upload, School, Shield, Bell, Palette, Database, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';

export function SystemSettings() {
  const [settings, setSettings] = useState({
    schoolName: 'Excellence Academy',
    schoolAddress: '123 Education Road, Lagos, Nigeria',
    schoolEmail: 'info@excellenceacademy.edu.ng',
    schoolPhone: '+234-801-234-5678',
    currentSession: '2025/2026',
    currentTerm: 'First Term',
    enableSMS: true,
    enableEmail: true,
    enableBiometric: false,
    enableOnlinePayment: true,
    autoBackup: true,
    twoFactorAuth: false,
    maintenanceMode: false,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-sm text-gray-600 mt-1">Configure system-wide settings and preferences</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="school" className="space-y-4">
        <TabsList>
          <TabsTrigger value="school">School Info</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* School Information */}
        <TabsContent value="school" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-blue-600" />
                <CardTitle>School Profile</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>School Name</Label>
                  <Input
                    value={settings.schoolName}
                    onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Address</Label>
                  <Input
                    value={settings.schoolAddress}
                    onChange={(e) => setSettings({ ...settings, schoolAddress: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={settings.schoolEmail}
                    onChange={(e) => setSettings({ ...settings, schoolEmail: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={settings.schoolPhone}
                    onChange={(e) => setSettings({ ...settings, schoolPhone: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <Label>School Logo</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                    <School className="w-10 h-10 text-blue-600" />
                  </div>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Recommended: 200x200px, PNG or JPG</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Branding Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Primary Color</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Input type="color" value="#3b82f6" className="w-20" />
                    <Input value="#3b82f6" readOnly />
                  </div>
                </div>
                <div>
                  <Label>Secondary Color</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Input type="color" value="#10b981" className="w-20" />
                    <Input value="#10b981" readOnly />
                  </div>
                </div>
                <div>
                  <Label>Accent Color</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Input type="color" value="#f59e0b" className="w-20" />
                    <Input value="#f59e0b" readOnly />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Current Session</Label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                    value={settings.currentSession}
                    onChange={(e) => setSettings({ ...settings, currentSession: e.target.value })}
                  >
                    <option>2025/2026</option>
                    <option>2024/2025</option>
                    <option>2023/2024</option>
                  </select>
                </div>
                <div>
                  <Label>Current Term</Label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                    value={settings.currentTerm}
                    onChange={(e) => setSettings({ ...settings, currentTerm: e.target.value })}
                  >
                    <option>First Term</option>
                    <option>Second Term</option>
                    <option>Third Term</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Grading System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { grade: 'A', min: 80, max: 100, remark: 'Excellent' },
                  { grade: 'B', min: 70, max: 79, remark: 'Very Good' },
                  { grade: 'C', min: 60, max: 69, remark: 'Good' },
                  { grade: 'D', min: 50, max: 59, remark: 'Pass' },
                  { grade: 'E', min: 40, max: 49, remark: 'Fair' },
                  { grade: 'F', min: 0, max: 39, remark: 'Fail' },
                ].map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-3 items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <Label className="text-xs">Grade</Label>
                      <Input value={item.grade} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Min Score</Label>
                      <Input type="number" value={item.min} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Max Score</Label>
                      <Input type="number" value={item.max} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Remark</Label>
                      <Input value={item.remark} className="mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Promotion Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Minimum Pass Percentage</Label>
                <Input type="number" defaultValue="40" className="mt-1" />
              </div>
              <div>
                <Label>Minimum Subjects to Pass</Label>
                <Input type="number" defaultValue="5" className="mt-1" />
              </div>
              <div>
                <Label>Maximum Failed Subjects for Promotion</Label>
                <Input type="number" defaultValue="2" className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <CardTitle>Notification Channels</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">SMS Notifications</p>
                  <p className="text-sm text-gray-600">Send notifications via SMS</p>
                </div>
                <Switch
                  checked={settings.enableSMS}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableSMS: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-600">Send notifications via email</p>
                </div>
                <Switch
                  checked={settings.enableEmail}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableEmail: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>SMS Provider</Label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1">
                  <option>Termii</option>
                  <option>SMS Portal NG</option>
                  <option>BulkSMS Nigeria</option>
                </select>
              </div>
              <div>
                <Label>Sender ID</Label>
                <Input placeholder="SCHOLIX" />
              </div>
              <div>
                <Label>API Key</Label>
                <Input type="password" placeholder="Enter API key" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <CardTitle>Security Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Auto Backup</p>
                  <p className="text-sm text-gray-600">Automatically backup data daily</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Maintenance Mode</p>
                  <p className="text-sm text-gray-600">Put system in maintenance mode</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Minimum Password Length</Label>
                <Input type="number" defaultValue="8" />
              </div>
              <div className="space-y-2">
                <Label>Password Requirements</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Require uppercase letters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Require lowercase letters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Require numbers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-700">Require special characters</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Plug className="w-5 h-5 text-blue-600" />
                <CardTitle>Payment Gateway</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Online Payment</p>
                  <p className="text-sm text-gray-600">Accept payments online</p>
                </div>
                <Switch
                  checked={settings.enableOnlinePayment}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableOnlinePayment: checked })}
                />
              </div>

              <div>
                <Label>Payment Provider</Label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1">
                  <option>Paystack</option>
                  <option>Flutterwave</option>
                  <option>Interswitch</option>
                </select>
              </div>

              <div>
                <Label>Public Key</Label>
                <Input placeholder="pk_test_..." />
              </div>

              <div>
                <Label>Secret Key</Label>
                <Input type="password" placeholder="sk_test_..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Biometric Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Biometric Attendance</p>
                  <p className="text-sm text-gray-600">Use biometric devices for attendance</p>
                </div>
                <Switch
                  checked={settings.enableBiometric}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableBiometric: checked })}
                />
              </div>

              <div>
                <Label>Device Type</Label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1">
                  <option>Fingerprint Scanner</option>
                  <option>Face Recognition</option>
                  <option>Card Reader</option>
                </select>
              </div>

              <div>
                <Label>Device IP Address</Label>
                <Input placeholder="192.168.1.100" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
