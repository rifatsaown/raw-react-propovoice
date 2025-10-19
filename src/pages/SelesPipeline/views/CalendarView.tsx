import { Calendar } from 'lucide-react';

export default function CalendarView() {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="text-center text-gray-500">
        <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Calendar View</h3>
        <p className="text-sm">
          Calendar view is coming soon. This will show your deals organized by
          due dates.
        </p>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Upcoming features:</strong>
          </p>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            <li>• Monthly/Weekly calendar layout</li>
            <li>• Deal due date visualization</li>
            <li>• Drag & drop to reschedule</li>
            <li>• Calendar integration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
