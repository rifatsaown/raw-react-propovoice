const ActivityHistory = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Activity History
      </h2>

      {/* Timeline */}
      <div className="relative">
        {/* Continuous vertical line for entire timeline */}
        <div className="absolute left-[125px] top-0 bottom-0 w-[1px] bg-gray-200"></div>

        <div className="space-y-0">
          {/* TODAY Section */}
          <div className="flex gap-6">
            {/* Time period label */}
            <div className="w-20 flex-shrink-0 pt-1">
              <span className="text-sm font-medium text-gray-500">TODAY</span>
            </div>

            {/* Icon column */}
            <div className="w-10 flex-shrink-0 flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded border-2 border-gray-200 flex items-center justify-center relative z-10">
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

            {/* Content */}
            <div className="flex-1 pb-6">
              <h3 className="text-base font-normal text-gray-900 mb-2">
                Deal <span className="font-semibold">"Ecommerce Redesign"</span>{' '}
                created from this Contact
              </h3>

              <div className="bg-[#F4F4F5] rounded-lg px-3 py-1 mb-2 inline-block">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-gray-600">
                    Budget:{' '}
                    <span className="text-gray-900 font-medium">$511</span>
                  </span>
                  <span className="text-gray-600">
                    Deal Owner:{' '}
                    <span className="text-gray-900 font-medium">Nasir U.</span>
                  </span>
                  <span className="text-gray-600">Stage in</span>
                  <button className="bg-blue-100 text-blue-700 flex items-center gap-1 hover:bg-blue-50 hover:text-blue-500 px-3 py-1 rounded-md font-medium">
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
                  <span className="text-gray-600">Opportunity Lebel</span>
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
          <div className="flex gap-6">
            {/* Empty space for time label */}
            <div className="w-20 flex-shrink-0"></div>

            {/* Icon column */}
            <div className="w-10 flex-shrink-0 flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded border-2 border-gray-200 flex items-center justify-center relative z-10">
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

            {/* Content */}
            <div className="flex-1 pb-6">
              <h3 className="text-base font-normal text-gray-900 mb-2">
                Meeting with <span className="font-semibold">"XYZ Ltd."</span>{' '}
                to discuss pricing
              </h3>

              <div className="bg-[#F4F4F5] rounded-lg px-3 py-1 mb-2 inline-block">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-gray-600">
                    Time: <span className="text-gray-900 font-medium">3pm</span>
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

          {/* THIS WEEK Section */}
          <div className="flex gap-6">
            {/* Time period label */}
            <div className="w-20 flex-shrink-0 pt-1">
              <span className="text-sm font-medium text-gray-500">
                THIS WEEK
              </span>
            </div>

            {/* Icon column */}
            <div className="w-10 flex-shrink-0 flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded border-2 border-gray-200 flex items-center justify-center relative z-10">
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

            {/* Content */}
            <div className="flex-1 pb-6">
              <h3 className="text-base font-normal text-gray-900 mb-3">
                <span className="font-semibold">"Nasir"</span> added context on
                the lead.
              </h3>

              <div className="bg-[#F4F4F5] rounded-lg px-3 py-1 mb-2 inline-block">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Client seems interested in our monthly pricing but needs
                  internal approval before moving forward. They mentioned a
                  decision might come by early next week. Let's prepare a ...
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
          <div className="flex gap-6">
            {/* Empty space for time label */}
            <div className="w-20 flex-shrink-0"></div>

            {/* Icon column */}
            <div className="w-10 flex-shrink-0 flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded border-2 border-gray-200 flex items-center justify-center relative z-10">
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

            {/* Content */}
            <div className="flex-1 pb-6">
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
  );
};

export default ActivityHistory;
