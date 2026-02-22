import React, { useMemo, useState } from 'react'
import {
  Search,
  Filter,
  Download,
  UserPlus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  BookOpen,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'

interface Student {
  id: string;
  admissionNo: string;
  name: string;
  class: string;
  arm: string;
  gender: string;
  status: 'Active' | 'Suspended' | 'Graduated';
  guardian: string;
  phone: string;
}

const mockStudents: Student[] = [
  { id: '1', admissionNo: 'SCH/2024/001', name: 'Adewale Johnson', class: 'SS 3', arm: 'A', gender: 'Male', status: 'Active', guardian: 'Mr. Johnson Adewale', phone: '0801-234-5678' },
  { id: '2', admissionNo: 'SCH/2024/002', name: 'Chioma Okafor', class: 'SS 2', arm: 'B', gender: 'Female', status: 'Active', guardian: 'Mrs. Okafor Grace', phone: '0802-345-6789' },
  { id: '3', admissionNo: 'SCH/2024/003', name: 'Ibrahim Musa', class: 'SS 3', arm: 'A', gender: 'Male', status: 'Active', guardian: 'Alhaji Musa Ibrahim', phone: '0803-456-7890' },
  { id: '4', admissionNo: 'SCH/2024/004', name: 'Blessing Eze', class: 'JSS 1', arm: 'C', gender: 'Female', status: 'Active', guardian: 'Mr. Eze Emmanuel', phone: '0804-567-8901' },
  { id: '5', admissionNo: 'SCH/2024/005', name: 'Oluwaseun Balogun', class: 'SS 1', arm: 'A', gender: 'Male', status: 'Active', guardian: 'Mrs. Balogun Funke', phone: '0805-678-9012' },
  { id: '6', admissionNo: 'SCH/2023/156', name: 'Fatima Abdullahi', class: 'SS 3', arm: 'B', gender: 'Female', status: 'Active', guardian: 'Dr. Abdullahi Hassan', phone: '0806-789-0123' },
  { id: '7', admissionNo: 'SCH/2024/007', name: 'Emeka Onyeka', class: 'JSS 2', arm: 'A', gender: 'Male', status: 'Active', guardian: 'Mr. Onyeka Paul', phone: '0807-890-1234' },
  { id: '8', admissionNo: 'SCH/2024/008', name: 'Aisha Mohammed', class: 'JSS 3', arm: 'B', gender: 'Female', status: 'Active', guardian: 'Mallam Mohammed Sule', phone: '0808-901-2345' },
];

export function StudentsList() {
  const [students] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [classFilter, setClassFilter] = useState<'all' | string>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | Student['status']>('all')

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.guardian.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesClass = classFilter === 'all' || student.class === classFilter
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter
      return matchesSearch && matchesClass && matchesStatus
    })
  }, [students, searchTerm, classFilter, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-700'
      case 'Suspended':
        return 'bg-amber-100 text-amber-700'
      case 'Graduated':
        return 'bg-slate-100 text-slate-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const atRiskStudents = students.filter((student) => student.status !== 'Active').slice(0, 3)
  const totalActive = students.filter((student) => student.status === 'Active').length
  const totalMale = students.filter((student) => student.gender === 'Male').length
  const totalFemale = students.filter((student) => student.gender === 'Female').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">Lifecycle</p>
          <h1 className="text-2xl font-bold text-gray-900">Student management</h1>
          <p className="text-sm text-gray-600 mt-1">Monitor admissions, wellbeing, and documents in one workspace.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Bulk export
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, admission no, or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
                value={classFilter}
                onChange={(event) => setClassFilter(event.target.value as typeof classFilter)}
              >
                <option value="all">All classes</option>
                {['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
              >
                <option value="all">All statuses</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Graduated">Graduated</option>
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Advanced filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">Total students</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{students.length}</p>
            <p className="text-xs text-gray-500 mt-1">Updated 5 mins ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">Active</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{totalActive}</p>
            <p className="text-xs text-emerald-600 mt-1">Retention 97%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">Male</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{totalMale}</p>
            <p className="text-xs text-gray-500 mt-1">52% of cohort</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">Female</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">{totalFemale}</p>
            <p className="text-xs text-gray-500 mt-1">48% of cohort</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk + pipelines */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              At-risk queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {atRiskStudents.length === 0 && <p className="text-sm text-gray-500">No escalations at the moment.</p>}
            {atRiskStudents.map((student) => (
              <div key={student.id} className="rounded-2xl border border-gray-100 p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.class} {student.arm} • Guardian {student.guardian}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    Open profile
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Enrollment signals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Pending applications</span>
              <span className="font-semibold text-gray-900">18</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Transfers in progress</span>
              <span className="font-semibold text-gray-900">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Scholarships awaiting docs</span>
              <span className="font-semibold text-amber-600">3</span>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2">
              View pipeline
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All students ({filteredStudents.length})</CardTitle>
            <p className="text-xs text-gray-500">Showing filtered results</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admission No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Guardian</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.admissionNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.class} {student.arm}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.guardian}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedStudent(student)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Student Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Student details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-100 p-3">
                  <p className="text-xs text-gray-500">Admission number</p>
                  <p className="font-semibold text-gray-900">{selectedStudent.admissionNo}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 p-3">
                  <p className="text-xs text-gray-500">Status</p>
                  <Badge className={getStatusColor(selectedStudent.status)}>{selectedStudent.status}</Badge>
                </div>
                <div className="rounded-2xl border border-gray-100 p-3">
                  <p className="text-xs text-gray-500">Class & arm</p>
                  <p className="font-semibold text-gray-900">
                    {selectedStudent.class} {selectedStudent.arm}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 p-3">
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="font-semibold text-gray-900">{selectedStudent.gender}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-100 p-4 space-y-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">Guardian contact</p>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="w-4 h-4 text-gray-400" /> {selectedStudent.guardian}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Phone className="w-4 h-4 text-gray-400" /> {selectedStudent.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Mail className="w-4 h-4 text-gray-400" /> guardian@school.edu
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input placeholder="Enter first name" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input placeholder="Enter last name" />
              </div>
              <div>
                <Label>Admission Number</Label>
                <Input placeholder="Auto-generated" disabled />
              </div>
              <div>
                <Label>Gender</Label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <Label>Class</Label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>JSS 1</option>
                  <option>JSS 2</option>
                  <option>JSS 3</option>
                  <option>SS 1</option>
                  <option>SS 2</option>
                  <option>SS 3</option>
                </select>
              </div>
              <div>
                <Label>Arm</Label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </div>
              <div>
                <Label>Guardian Name</Label>
                <Input placeholder="Enter guardian name" />
              </div>
              <div>
                <Label>Guardian Phone</Label>
                <Input placeholder="Enter phone number" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Add Student
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
