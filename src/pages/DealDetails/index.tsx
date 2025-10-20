import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Building,
  Calendar,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function DealDetails() {
  const { dealID } = useParams<{ dealID: string }>();
  const navigate = useNavigate();

  // Sample deal data - in real app, this would come from API
  const dealData = {
    id: dealID,
    title: 'Enterprise Software Implementation',
    status: 'In Progress',
    value: 125000,
    client: {
      name: 'TechCorp Solutions',
      email: 'contact@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business Ave, San Francisco, CA 94105',
    },
    owner: 'John Smith',
    createdDate: '2024-01-15',
    expectedCloseDate: '2024-03-15',
    description:
      'Complete implementation of our enterprise software solution including setup, training, and ongoing support for 500+ users.',
    stage: 'Proposal',
    probability: 75,
  };

  const handleBack = () => {
    navigate('/main/sales-pipeline');
  };

  return (
    <div className="min-h-screen p-6 mx-11">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pipeline
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {dealData.title}
            </h1>
            <p className="text-sm text-gray-500">Deal ID: {dealData.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              dealData.status === 'In Progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {dealData.status}
          </span>
          <span className="text-2xl font-bold text-gray-900">
            ${dealData.value.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Deal Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Deal Overview */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Deal Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Deal Value</p>
                  <p className="font-semibold">
                    ${dealData.value.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Deal Owner</p>
                  <p className="font-semibold">{dealData.owner}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Created Date</p>
                  <p className="font-semibold">
                    {new Date(dealData.createdDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Expected Close</p>
                  <p className="font-semibold">
                    {new Date(dealData.expectedCloseDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {dealData.description}
            </p>
          </div>

          {/* Client Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Client Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-semibold">{dealData.client.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{dealData.client.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{dealData.client.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold">{dealData.client.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Stats */}
        <div className="space-y-6">
          {/* Stage & Probability */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Deal Progress</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Current Stage</p>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                  {dealData.stage}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Win Probability</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${dealData.probability}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {dealData.probability}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button className="w-full" variant="default">
                Edit Deal
              </Button>
              <Button className="w-full" variant="outline">
                Add Note
              </Button>
              <Button className="w-full" variant="outline">
                Schedule Meeting
              </Button>
              <Button className="w-full" variant="outline">
                Send Email
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Deal created</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Moved to Proposal stage</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">
                    Client meeting scheduled
                  </p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
