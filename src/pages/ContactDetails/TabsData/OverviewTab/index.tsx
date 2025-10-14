import ActivityHistory from './ActivityHistory';
import Todo from './Todo';

export default function OverviewTab() {
  return (
    <div className="p-6 min-h-screen lg:mx-15">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#18181B]">Overview</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">⏰ Last Modified on Today, 12:08 PM</span>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1">
            Create ↓
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Activity */}
        <div className="lg:col-span-2 space-y-1">
          {/* Activity History */}
          <ActivityHistory />
          {/* To Do Section */}
          <Todo />
        </div>

        {/* Right Column - Contact Info */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Basic Info</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                + Custom Field
              </button>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Personal Info</h3>
              <button className="text-gray-400 hover:text-gray-600">✏️</button>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-center gap-2">📞 +8801760708381</p>
              <p className="flex items-center gap-2">
                ✉️ norencybujital@gmail.com
              </p>
              <p className="flex items-center gap-2">📍 320, New York, US</p>
            </div>
          </div>

          {/* Company */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Company</h3>
              <button className="text-gray-400 hover:text-gray-600">✏️</button>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-center gap-2">🏢 Nurency Digital</p>
              <p className="flex items-center gap-2">🌐 nurency.com</p>
            </div>
          </div>

          {/* Job Title */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Job Title</h3>
              <button className="text-gray-400 hover:text-gray-600">✏️</button>
            </div>
            <div className="text-sm text-gray-700">
              <p>Project Manager</p>
            </div>
          </div>

          {/* Birth Date */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Birth Date</h3>
              <button className="text-gray-400 hover:text-gray-600">✏️</button>
            </div>
            <div className="text-sm text-gray-700">
              <p>20 Dec 2023</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Social Media</h3>
              <button className="text-gray-400 hover:text-gray-600">✏️</button>
            </div>
            <div className="flex gap-2">
              <span className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                📘
              </span>
              <span className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                💼
              </span>
              <span className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                🐦
              </span>
              <span className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
                📷
              </span>
              <span className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                📸
              </span>
            </div>
          </div>

          {/* Industry */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Industry</h3>
              <button className="text-gray-400 hover:text-gray-600">✏️</button>
            </div>
            <div className="text-sm text-gray-700">
              <p>Web Design</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Description</h3>
              <button className="text-gray-400 hover:text-gray-600">✏️</button>
            </div>
            <div className="text-sm text-gray-700">
              <p>
                Give your users more reasons to stick around with fast, flexible
                and frictionless payment experiences that boost cash flow.
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Tag</h3>
              <button className="text-gray-400 hover:text-gray-600">✏️</button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                webdesign <span className="cursor-pointer">×</span>
              </span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                Design <span className="cursor-pointer">×</span>
              </span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                Admin <span className="cursor-pointer">×</span>
              </span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                Admin <span className="cursor-pointer">×</span>
              </span>
              <button className="text-blue-600 text-xs hover:text-blue-800">
                + Add
              </button>
            </div>
          </div>

          {/* Others */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Others</h3>
              <button className="text-gray-400 hover:text-gray-600">✏️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
