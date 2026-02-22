import React from 'react'
import { Users, ClipboardList, Clock3, ArrowRight, MapPin, BookOpen } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

const pipeline = [
  {
    stage: 'Leads',
    description: 'Families showing interest via web forms or events.',
    count: 23,
    items: [
      { name: 'Grace Obi', school: 'Primary 6', source: 'Open day', status: 'New' },
      { name: 'Yakubu Idris', school: 'Primary 5', source: 'Referral', status: 'Follow-up' },
    ],
  },
  {
    stage: 'Applications',
    description: 'Forms submitted, fees pending or paid.',
    count: 14,
    items: [
      { name: 'Farida Ahmed', school: 'Primary 6', source: 'Agent', status: 'Docs pending' },
      { name: 'Michelle Nweke', school: 'Primary 6', source: 'Parent portal', status: 'Interview set' },
    ],
  },
  {
    stage: 'Assessments',
    description: 'Interviews, placement tests, medicals.',
    count: 9,
    items: [
      { name: 'Samuel Aluko', school: 'Primary 6', source: 'Portal', status: 'Medical pending' },
      { name: 'Ijeoma Uzo', school: 'Primary 5', source: 'Referral', status: 'Offer drafted' },
    ],
  },
  {
    stage: 'Admitted',
    description: 'Offers accepted, awaiting onboarding.',
    count: 6,
    items: [
      { name: 'Chidera Igwe', school: 'Primary 6', source: 'Portal', status: 'Fees paid' },
      { name: 'Opeoluwa Adeyemi', school: 'Primary 6', source: 'Agent', status: 'Orientation set' },
    ],
  },
]

const analytics = [
  {
    label: 'Average conversion time',
    value: '18 days',
    trend: '+2d slower',
    icon: <Clock3 className="h-4 w-4" />,
  },
  {
    label: 'Acceptance rate',
    value: '64%',
    trend: '+6 pts',
    icon: <Users className="h-4 w-4" />,
  },
  {
    label: 'Scholarship requests',
    value: '12',
    trend: '3 pending docs',
    icon: <ClipboardList className="h-4 w-4" />,
  },
]

export function StudentEnrollment() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">Admissions</p>
          <h1 className="text-2xl font-bold text-gray-900">Enrollment pipeline</h1>
          <p className="text-sm text-gray-600">Track inquiries through assessments until onboarding day.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <ClipboardList className="h-4 w-4 mr-2" />
            Intake checklist
          </Button>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            New application
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {analytics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-4">
              <div className="text-xs text-gray-500 flex items-center gap-2">
                {metric.icon}
                <span>{metric.label}</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900 mt-2">{metric.value}</p>
              <p className="text-xs text-amber-600 mt-1">{metric.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {pipeline.map((column) => (
          <Card key={column.stage} className="bg-slate-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{column.stage}</CardTitle>
                  <p className="text-xs text-gray-500">{column.description}</p>
                </div>
                <Badge className="bg-white text-gray-900">{column.count}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {column.items.map((item) => (
                <div key={item.name} className="rounded-2xl border border-white bg-white p-3 shadow-sm">
                  <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.school} • {item.source}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {item.status}
                    </Badge>
                    <Button size="icon" variant="ghost">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-blue-600">
                View all in {column.stage}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-blue-600" />
              Feeder schools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Heritage Junior School</span>
              <span className="font-semibold text-gray-900">9 applicants</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Unity Primary</span>
              <span className="font-semibold text-gray-900">6 applicants</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Redeemer Montessori</span>
              <span className="font-semibold text-gray-900">5 applicants</span>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              View feeder analytics
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-purple-600" />
              Orientation checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Medical screening</span>
              <Badge variant="outline">7/12 complete</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Uniform measurements</span>
              <Badge variant="outline">5/12 complete</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Parent onboarding call</span>
              <Badge variant="outline">4/12 booked</Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600">
              Manage tasks
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
