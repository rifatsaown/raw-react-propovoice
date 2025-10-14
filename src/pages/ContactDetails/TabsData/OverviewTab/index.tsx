import ActivityHistory from './ActivityHistory';
import BasicInfo from './BasicInfo';
import OverviewTodo from './OverviewTodo';

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
          <OverviewTodo />
        </div>

        {/* Right Column - Contact Info */}
        <BasicInfo />
      </div>
    </div>
  );
}
