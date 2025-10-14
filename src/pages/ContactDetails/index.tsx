import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Briefcase,
  Eye,
  FileText,
  Folder,
  FolderOpen,
  List,
  MessageSquare,
  Receipt,
  ShoppingBag,
} from 'lucide-react';
import { Suspense, useCallback, useMemo, useState } from 'react';
import ContactDetailsHeader from './Header';
import ConversationTab from './TabsData/ConversationTab';
import DealsTab from './TabsData/DealsTab';
import FilesTab from './TabsData/FilesTab';
import InvoiceTab from './TabsData/InvoiceTab';
import NotesTab from './TabsData/NotesTab';
import OrdersTab from './TabsData/OrdersTab';
import OverviewTab from './TabsData/OverviewTab/index';
import ProjectTab from './TabsData/ProjectTab';
import ProposalTab from './TabsData/ProposalTab';
import ToDoTab from './TabsData/ToDoTab';

// Type definitions
interface Contact {
  name: string;
  company: string;
  type: string;
  email: string;
  messenger: string;
  phone: string;
  avatar?: string;
}

interface TabItem {
  value: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  mobileHidden?: boolean; // Hide on mobile if needed
}

// Mock data
const mockContact: Contact = {
  name: 'Nasir Uddin',
  company: 'nurency',
  type: 'Client',
  email: 'nasir@example.com',
  messenger: 'nasir.uddin',
  phone: '+8801760706361',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

// Custom hook for tab data with responsive considerations
const useTabData = (): TabItem[] => {
  return useMemo(
    () => [
      {
        value: 'overview',
        label: 'Overview',
        icon: <Eye size={20} strokeWidth={1.7} />,
      },
      {
        value: 'todo',
        label: 'To Do',
        icon: <List size={20} strokeWidth={1.7} />,
      },
      {
        value: 'notes',
        label: 'Notes',
        icon: <FileText size={20} strokeWidth={1.7} />,
        badge: 10,
      },
      {
        value: 'conversation',
        label: 'Conversation',
        icon: <MessageSquare size={20} strokeWidth={1.7} />,
        badge: 10,
      },
      {
        value: 'deals',
        label: 'Deals',
        icon: <FileText size={20} strokeWidth={1.7} />,
      },
      {
        value: 'proposal',
        label: 'Proposal & Agreement',
        icon: <Briefcase size={20} strokeWidth={1.7} />,
        mobileHidden: true, // Hide on mobile due to long label
      },
      {
        value: 'project',
        label: 'Project',
        icon: <FolderOpen size={20} strokeWidth={1.7} />,
      },
      {
        value: 'orders',
        label: 'Orders',
        icon: <ShoppingBag size={20} strokeWidth={1.7} />,
      },
      {
        value: 'invoice',
        label: 'Invoice',
        icon: <Receipt size={20} strokeWidth={1.7} />,
      },
      {
        value: 'files',
        label: 'Files',
        icon: <Folder size={20} strokeWidth={1.7} />,
      },
    ],
    []
  );
};

// Tab content mapping with lazy loading
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabContentMap: Record<string, React.ComponentType<any>> = {
  overview: OverviewTab,
  todo: ToDoTab,
  notes: NotesTab,
  conversation: ConversationTab,
  deals: DealsTab,
  proposal: ProposalTab,
  project: ProjectTab,
  orders: OrdersTab,
  invoice: InvoiceTab,
  files: FilesTab,
};

// Loading component for tab content
const TabContentLoader = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export default function ContactDetails() {
  const tabData = useTabData();
  const [activeTab, setActiveTab] = useState('overview');

  // Memoized tab content to prevent unnecessary re-renders
  const renderTabContent = useCallback((tabValue: string) => {
    const TabComponent = TabContentMap[tabValue];
    if (!TabComponent) return null;

    return (
      <Suspense fallback={<TabContentLoader />}>
        <TabComponent contact={mockContact} />
      </Suspense>
    );
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <ContactDetailsHeader contact={mockContact} />

      <div className="bg-white">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tabs List */}
          <div className="relative">
            <div
              className="overflow-x-auto scrollbar-hide "
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <TabsList className="flex  w-max bg-transparent border-none px-16 h-auto min-h-[50px]">
                {tabData.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`
                      group flex items-center gap-2 px-4 sm:px-6 py-4 mx-0.5 rounded-t-2xl rounded-b-none 
                      text-sm sm:text-base font-normal whitespace-nowrap border-none 
                      transition-all duration-150 bg-transparent flex-shrink-0
                      data-[state=active]:bg-[#F4F4F5] data-[state=active]:shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.07)] 
                      data-[state=active]:text-black data-[state=active]:z-10 
                      data-[state=active]:font-semibold data-[state=active]:rounded-t-2xl 
                      data-[state=inactive]:text-[#757575] data-[state=inactive]:bg-transparent 
                      data-[state=inactive]:shadow-none data-[state=inactive]:border-none 
                      focus-visible:outline-none focus-visible:ring-0
                      ${tab.mobileHidden ? 'hidden sm:flex' : 'flex'}
                      hover:bg-gray-50 hover:text-gray-700
                    `}
                  >
                    <span className="flex items-center">{tab.icon}</span>
                    <span className="mt-[1px] hidden sm:inline">
                      {tab.label}
                    </span>
                    {/* Mobile: Show only icon and badge */}
                    <span className="mt-[1px] sm:hidden">
                      {tab.label.length > 8
                        ? tab.label.substring(0, 8) + '...'
                        : tab.label}
                    </span>
                    {tab.badge && (
                      <span className="ml-1">
                        <Badge
                          className="rounded-full px-2 py-0.5 text-xs sm:text-sm font-semibold 
                            bg-[#E6F7F0] text-[#009B6A] border-none shadow-none h-5 sm:h-6 
                            flex items-center justify-center min-w-[20px]"
                          variant="secondary"
                        >
                          {tab.badge}
                        </Badge>
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          {/* Tab Content with loading states */}
          <div className="min-h-[400px] bg-[#F4F4F5] -mt-3">
            {tabData.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="mt-0 focus-visible:outline-none"
              >
                <div className="animate-in fade-in-50 duration-200">
                  {renderTabContent(tab.value)}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { 
          display: none; 
        }
        .scrollbar-hide { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
        
        /* Smooth scrolling for tab navigation */
        .scrollbar-hide {
          scroll-behavior: smooth;
        }
        
        /* Custom focus styles for better accessibility */
        .scrollbar-hide:focus-within {
          outline: none;
        }
        
        /* Ensure tabs are always accessible */
        .scrollbar-hide::-webkit-scrollbar-track {
          background: transparent;
        }
        
        /* Improve touch scrolling on mobile */
        @media (max-width: 640px) {
          .scrollbar-hide {
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
          }
          
          .scrollbar-hide > * {
            scroll-snap-align: start;
          }
        }
      `}</style>
    </div>
  );
}
