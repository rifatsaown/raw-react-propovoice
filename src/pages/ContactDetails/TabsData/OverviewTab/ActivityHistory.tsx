import { HighFlagIcon, TextFileIcon } from '@/components/Icons';
import type { ActivityGroup, ActivityItem } from '@/interfaces';

interface ActivityHistoryProps {
  activityData: ActivityGroup[];
  isLoading?: boolean;
  error?: string;
}

const ActivityHistory = ({
  activityData,
  isLoading = false,
  error,
}: ActivityHistoryProps) => {
  // Helper function to render activity metadata
  const renderActivityMetadata = (activity: ActivityItem) => {
    if (!activity.metadata) return null;

    const { metadata } = activity;
    const metadataItems = [];

    if (metadata.budget) {
      metadataItems.push(
        <span key="budget" className="text-[#71717A]">
          Budget: <span className="text-[#18181B]">{metadata.budget}</span>
        </span>
      );
    }

    if (metadata.dealOwner) {
      metadataItems.push(
        <span key="dealOwner" className="text-[#71717A]">
          Deal Owner:{' '}
          <span className="text-[#18181B]">{metadata.dealOwner}</span>
        </span>
      );
    }

    if (metadata.stage) {
      metadataItems.push(
        <span key="stage" className="text-[#71717A]">
          Stage in
        </span>,
        <button
          key="stageButton"
          className="bg-blue-100 text-[#006BFF] flex items-center gap-1 hover:bg-blue-50 hover:text-blue-500 px-2 py-0.5 rounded-md font-medium"
        >
          {metadata.stage}
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
      );
    }

    if (metadata.opportunityLevel) {
      metadataItems.push(
        <span key="opportunityLabel" className="text-[#71717A]">
          Opportunity Level
        </span>,
        <span key="opportunityLevel" className="flex items-center gap-1">
          {' '}
          <HighFlagIcon className="w-4 h-4" /> {metadata.opportunityLevel}
        </span>
      );
    }

    if (metadata.time) {
      metadataItems.push(
        <span key="time" className="text-[#71717A]">
          Time: <span className="text-[#18181B]">{metadata.time}</span>
        </span>
      );
    }

    if (metadata.location) {
      metadataItems.push(
        <span key="separator" className="text-gray-400">
          |
        </span>,
        <span key="location" className="text-[#71717A]">
          Location: <span className="text-[#18181B]">{metadata.location}</span>
        </span>
      );
    }

    if (metadata.status) {
      metadataItems.push(
        <button
          key="status"
          className={`px-2 py-0.5 rounded-md font-medium flex items-center gap-1 bg-[#2E90FA] text-white`}
        >
          {metadata.status.charAt(0).toUpperCase() + metadata.status.slice(1)}
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
      );
    }

    if (metadataItems.length === 0) return null;

    return (
      <div className="bg-[#F4F4F5] rounded-lg px-3 py-1 mb-2 inline-block">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {metadataItems}
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl mb-6 text-[#18181B] font-[500]">
          Activity History
        </h2>
        <div className="text-center py-8">
          <p className="text-red-600">
            Error loading activity history: {error}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl mb-6 text-[#18181B] font-[500]">
          Activity History
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500">Loading activity history...</p>
        </div>
      </div>
    );
  }

  if (!activityData || activityData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl mb-6 text-[#18181B] font-[500]">
          Activity History
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No activity history available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <h2 className="text-xl mb-6 text-[#18181B] font-[500]">
        Activity History
      </h2>

      {/* Timeline */}
      <div className="relative">
        {/* Continuous vertical line for entire timeline */}
        <div className="hidden md:block absolute left-[123px] top-0 bottom-0 w-[1px] bg-gray-200"></div>

        <div className="space-y-0">
          {activityData.map((group, groupIndex) => (
            <div key={group.period}>
              {group.activities.map((activity, activityIndex) => (
                <div
                  key={activity.id}
                  className="flex flex-col md:flex-row gap-3 md:gap-6"
                >
                  {/* Time period label - only show for first activity in group */}
                  {activityIndex === 0 && (
                    <div className="md:w-20 flex-shrink-0 pt-1">
                      <span
                        className={`text-xs md:text-sm font-medium text-[#71717A]`}
                      >
                        {group.period}
                      </span>
                    </div>
                  )}

                  {/* Empty space for subsequent activities in the same group */}
                  {activityIndex > 0 && (
                    <div className="hidden md:block w-20 flex-shrink-0"></div>
                  )}

                  {/* Icon column */}
                  <div className="hidden md:flex md:w-10 flex-shrink-0 md:flex-col items-center">
                    <div className="w-8 h-8 bg-[#F4F4F5] rounded-full border-gray-200 flex items-center justify-center relative z-10">
                      <TextFileIcon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6 md:pl-0">
                    <h3
                      className="text-sm md:text-base font-normal text-gray-900 mb-1"
                      dangerouslySetInnerHTML={{ __html: activity.title }}
                    ></h3>

                    {renderActivityMetadata(activity)}

                    {activity.description && (
                      <div className="bg-[#F4F4F5] rounded-lg px-3 py-1 mb-2 inline-block">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {activity.description}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm flex-wrap justify-between md:justify-start">
                      <span className="text-[#71717A]">
                        {activity.timestamp}
                      </span>
                      {activity.actions?.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={action.onClick}
                          className="text-[#18181B] font-medium hover:text-blue-600"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {activityIndex < group.activities.length - 1 && (
                    <div className="md:hidden w-full h-px bg-gray-200 mt-3" />
                  )}
                </div>
              ))}
              {groupIndex < activityData.length - 1 && (
                <div className="md:hidden w-full h-px bg-gray-300 my-3" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityHistory;
