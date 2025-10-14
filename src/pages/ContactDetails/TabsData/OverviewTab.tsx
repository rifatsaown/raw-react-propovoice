export default function OverviewTab() {
  return (
    <div className="p-6 min-h-screen mx-15">
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
        <div className="lg:col-span-2 space-y-6">
          {/* Activity History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Activity History
            </h2>

            {/* Timeline */}
            <div className="relative">
              <div className="space-y-8">
                {/* TODAY Section */}
                <div className="flex gap-6 relative">
                  {/* Vertical line behind icons */}
                  <div className="absolute left-[60px] top-0 bottom-0 w-px bg-gray-200"></div>

                  <div className="flex flex-col items-start min-w-[80px]">
                    <span className="text-sm font-medium text-gray-500 mb-3">
                      TODAY
                    </span>
                  </div>

                  <div className="flex-1 space-y-6 pb-4">
                    {/* Activity Item 1 - Deal Created */}
                    <div className="relative flex gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 bg-white rounded border-2 border-gray-200 flex items-center justify-center z-10 relative">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base font-normal text-gray-900 mb-3">
                          Deal{' '}
                          <span className="font-semibold">
                            "Ecommerce Redesign"
                          </span>{' '}
                          created from this Contact
                        </h3>

                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="text-gray-600">
                              Budget:{' '}
                              <span className="text-gray-900 font-medium">
                                $511
                              </span>
                            </span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600">
                              Deal Owner:{' '}
                              <span className="text-gray-900 font-medium">
                                Nasir U.
                              </span>
                            </span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600">Stage in</span>
                            <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-medium flex items-center gap-1">
                              Proposal
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                            <span className="text-gray-600">
                              Opportunity Lebel
                            </span>
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-semibold text-xs">
                              H
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500">16 May, 6:00 PM</span>
                          <button className="text-gray-900 font-medium hover:text-blue-600">
                            View Deal
                          </button>
                          <button className="text-gray-900 font-medium hover:text-blue-600">
                            Edit Deal
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 2 - Meeting */}
                    <div className="relative flex gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 bg-white rounded border-2 border-gray-200 flex items-center justify-center z-10 relative">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base font-normal text-gray-900 mb-3">
                          Meeting with{' '}
                          <span className="font-semibold">"XYZ Ltd."</span> to
                          discuss pricing
                        </h3>

                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="text-gray-600">
                              Time:{' '}
                              <span className="text-gray-900 font-medium">
                                3pm
                              </span>
                            </span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600">
                              Location:{' '}
                              <span className="text-gray-900 font-medium">
                                Google Meet
                              </span>
                            </span>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-md font-medium flex items-center gap-1">
                              Upcoming
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500">16 May, 6:00 PM</span>
                          <button className="text-gray-900 font-medium hover:text-blue-600">
                            Join
                          </button>
                          <button className="text-gray-900 font-medium hover:text-blue-600">
                            Reschedule
                          </button>
                          <button className="text-gray-900 font-medium hover:text-blue-600">
                            View on Colender
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* THIS WEEK Section */}
                <div className="flex gap-6 relative">
                  {/* Continue vertical line */}
                  <div className="absolute left-[60px] top-0 bottom-0 w-px bg-gray-200"></div>

                  <div className="flex flex-col items-start min-w-[80px]">
                    <span className="text-sm font-medium text-gray-500 mb-3">
                      THIS WEEK
                    </span>
                  </div>

                  <div className="flex-1 space-y-6 pb-4">
                    {/* Activity Item 3 - Note Added */}
                    <div className="relative flex gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 bg-white rounded border-2 border-gray-200 flex items-center justify-center z-10 relative">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base font-normal text-gray-900 mb-3">
                          <span className="font-semibold">"Nasir"</span> added
                          context on the lead.
                        </h3>

                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Client seems interested in our monthly pricing but
                            needs internal approval before moving forward. They
                            mentioned a decision might come by early next week.
                            Let's prepare a ...
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500">16 May, 6:00 PM</span>
                          <button className="text-gray-900 font-medium hover:text-blue-600">
                            Edit Note
                          </button>
                          <button className="text-gray-900 font-medium hover:text-blue-600">
                            Pin
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 4 - Lead Reassigned */}
                    <div className="relative flex gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 bg-white rounded border-2 border-gray-200 flex items-center justify-center z-10 relative">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base font-normal text-gray-900 mb-3">
                          Lead reassigned from{' '}
                          <span className="font-semibold">Anika</span> to{' '}
                          <span className="font-semibold">Tanvir</span>
                        </h3>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500">16 May, 6:00 PM</span>
                          <button className="text-gray-900 font-medium hover:text-blue-600">
                            Undo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* To Do Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">To Do</h2>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">Today ↓</span>
                <div className="hidden md:flex gap-4 text-xs text-gray-500">
                  <span>Activity Type</span>
                  <span>Priority</span>
                  <span>Status</span>
                </div>
              </div>

              <div className="space-y-3">
                {/* Todo Item 1 */}
                <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <input type="checkbox" className="mt-1" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">
                      Create Followup Call to Taxila Foundation
                    </h4>
                    <p className="text-xs text-gray-500">
                      Due Date: 20 Dec 2024 | Related to: Deal - Web Design
                      Proj...
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      📞 Call
                    </span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-semibold">
                      H
                    </span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
                      Upcoming
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      ⋯
                    </button>
                  </div>
                </div>

                {/* Todo Item 2 */}
                <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <input type="checkbox" className="mt-1" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">
                      Prepare Proposal to Send
                    </h4>
                    <p className="text-xs text-gray-500">
                      Due Date: 20 Dec 2024 | Related to: Deal - Web Design
                      Proj...
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                      📋 Task
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                      L
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Doing
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      ⋯
                    </button>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800">
                Load More
              </button>
            </div>

            {/* Status Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-600">Overdue</span>
                <span className="text-sm text-gray-500">4 Task</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600">Next</span>
                <span className="text-sm text-gray-500">3 Task</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Un Scheduled</span>
                <span className="text-sm text-gray-500">2 Task</span>
              </div>
            </div>
          </div>
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
