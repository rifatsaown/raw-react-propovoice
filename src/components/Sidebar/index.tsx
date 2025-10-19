import { logo } from '@/assets';
import {
  AgreementIcon,
  AnalyticsIcon,
  DataflowIcon,
  FolderPlusIcon,
  FolderShieldIcon,
  InboxIcon,
  InvoicesIcon,
  MyTaskIcon,
  OrdersIcon,
  ProposalIcon,
  SalesPipelineIcon,
  ServicePackagesIcon,
  UserClientIcon,
} from '@/components/Icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileInput,
  PanelLeftOpen,
  PanelRightOpen,
  Settings,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleCollapse as toggleCollapseAction } from '../../store/sidebarSlice';

// Custom hook to safely use location
const useSafeLocation = () => {
  try {
    return useLocation();
  } catch (error) {
    console.error(error);
    // Return a default location object if useLocation fails
    return { pathname: '/' };
  }
};

interface MenuSection {
  label: string;
  items: MenuItem[];
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge?: number;
  path?: string;
  active?: boolean;
  items?: MenuItem[];
}

const menu: MenuSection[] = [
  {
    label: '',
    items: [
      { icon: MyTaskIcon, title: 'My Task', badge: 10, path: '/main' },
      { icon: InboxIcon, title: 'Inbox', badge: 10 },
      { icon: AnalyticsIcon, title: 'Analytics' },
    ],
  },
  {
    label: 'SALES',
    items: [
      {
        icon: SalesPipelineIcon,
        title: 'Sales Pipeline',
        path: '/main/sales-pipeline',
      },
      { icon: ProposalIcon, title: 'Proposal' },
      { icon: AgreementIcon, title: 'Agreements' },
      { icon: ServicePackagesIcon, title: 'Service Packages' },
    ],
  },
  {
    label: 'FULFILMENT',
    items: [
      { icon: InvoicesIcon, title: 'Invoices' },
      { icon: OrdersIcon, title: 'Orders' },
      { icon: FolderPlusIcon, title: 'Request', badge: 10 },
      {
        icon: FolderShieldIcon,
        title: 'Project',
        items: [
          { icon: FileInput, title: 'Request', badge: 10 },
          { icon: FileInput, title: 'Request', badge: 10 },
        ],
      },
    ],
  },
  {
    label: 'ENGAGEMENT',
    items: [
      { icon: UserClientIcon, title: 'Client Portal' },
      {
        icon: BookOpen,
        title: 'Contact Book',
        path: '/main/contact-book',
      },
    ],
  },
  {
    label: 'CUSTOMIZATION',
    items: [
      { icon: DataflowIcon, title: 'Automation' },
      { icon: Settings, title: 'Settings' },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  // Use the safe location hook
  const location = useSafeLocation();
  // TODO: Based on path the url will act active
  const currentPath = location.pathname;
  console.log(currentPath);

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    // Initialize with any items that should be expanded by default
  });

  // Use Redux for sidebar state
  const isCollapsed = useAppSelector((state) => state.sidebar.isCollapsed);
  const dispatch = useAppDispatch();

  const toggleCollapse = () => {
    dispatch(toggleCollapseAction());
  };

  // Function to check if a menu item is active based on current path
  const isItemActive = (item: MenuItem) => {
    if (item.path) {
      // Exact match
      if (currentPath === item.path) {
        return true;
      }
      // Check if current path is a sub-path of the item path
      // Only match if the next character after the item path is a '/'
      if (currentPath.startsWith(item.path + '/')) {
        return false; // TODO: Navigation to sub-pages should not be active
      }
      return false;
    }
    return false;
  };

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Only prevent body scroll on mobile devices
      if (window.innerWidth < 1024) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '0px'; // Prevent layout shift
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, onToggle]);

  const toggleExpand = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isExpanded = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    return expandedItems[key] || false;
  };

  // Function to determine badge color based on item title
  const getBadgeColorClass = (title: string) => {
    switch (title.toLowerCase()) {
      case 'inbox':
        return 'border-[#009B6A] bg-[#EBFEF5] text-[#067647]';
      case 'request':
        return 'border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815]';
      default:
        return 'border-[#E4E4E7] bg-[#F8FAFC] text-[#18181B]';
    }
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile when clicking a link
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          h-screen border-r border-[#E4E4E7] bg-white font-['Inter']
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'w-16' : 'w-64'}
          lg:relative lg:transform-none
          shadow-lg lg:shadow-none
          overflow-hidden
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header with mobile close + collapse/expand control */}
        <div
          className={`flex flex-col flex-shrink-0 transition-all duration-300 ${
            isCollapsed ? 'px-2 py-3' : 'px-4 py-3'
          }`}
        >
          {!isCollapsed && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-8 h-8 flex-shrink-0" />
                <div className="p-4 text-xl font-bold">Kidency</div>
              </div>
              {/* Collapse/Expand control - desktop only */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex h-8 w-8"
                onClick={toggleCollapse}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <PanelRightOpen className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          )}
          {isCollapsed && (
            <div className="flex flex-col items-center space-y-2">
              <img
                src={logo}
                alt="Logo"
                className="w-8 h-8 flex-shrink-0 object-contain"
              />
              {/* Collapse/Expand control - desktop only */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex h-8 w-8"
                onClick={toggleCollapse}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <PanelLeftOpen className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          )}
        </div>

        <ScrollArea
          className={`overflow-hidden transition-all duration-300 ${
            isCollapsed ? 'h-[calc(100vh-120px)]' : 'h-[calc(100vh-80px)]'
          }`}
        >
          <nav
            className={`flex flex-col transition-all duration-300 ${
              isCollapsed ? 'px-1 py-6 space-y-3' : 'px-2 py-4'
            }`}
          >
            {menu.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className={isCollapsed ? 'space-y-3' : 'space-y-[2px]'}
              >
                {section.label && !isCollapsed && (
                  <div className="text-xs font-medium text-[#00000066] px-3 pt-3 pb-1">
                    {section.label}
                  </div>
                )}
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-col relative">
                    {item.path ? (
                      <Link
                        to={item.path}
                        onClick={handleLinkClick}
                        className={`flex items-center rounded-md cursor-pointer transition-all duration-300 hover:bg-muted text-[#09090B] ${
                          isCollapsed
                            ? 'justify-center px-2 h-[28px]'
                            : 'gap-3 px-3 h-[28px] text-sm'
                        } ${
                          isItemActive(item)
                            ? 'bg-gray-100 font-semibold'
                            : 'font-medium'
                        }`}
                        aria-current={isItemActive(item) ? 'page' : undefined}
                        title={isCollapsed ? item.title : undefined}
                      >
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 truncate">
                              {item.title}
                            </span>
                            {item.badge && (
                              <Badge
                                variant="outline"
                                className={`text-xs px-2 py-0.5 ${
                                  item.active
                                    ? 'border-black'
                                    : getBadgeColorClass(item.title)
                                }`}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Link>
                    ) : (
                      <button
                        onClick={() =>
                          item.items &&
                          !isCollapsed &&
                          toggleExpand(sectionIndex, itemIndex)
                        }
                        className={`flex items-center rounded-md cursor-pointer transition-all duration-300 hover:bg-muted text-[#09090B] w-full text-left ${
                          isCollapsed
                            ? 'justify-center px-2 h-[28px]'
                            : 'gap-3 px-3 h-[28px] text-sm'
                        } ${
                          isItemActive(item)
                            ? 'bg-gray-100 font-bold'
                            : 'font-medium'
                        }`}
                        aria-expanded={
                          item.items && !isCollapsed
                            ? isExpanded(sectionIndex, itemIndex)
                            : undefined
                        }
                        title={isCollapsed ? item.title : undefined}
                      >
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 truncate">
                              {item.title}
                            </span>
                            {item.badge && (
                              <Badge
                                variant="outline"
                                className={`text-xs px-2 py-0.5 ${
                                  item.active
                                    ? 'border-black'
                                    : getBadgeColorClass(item.title)
                                }`}
                              >
                                {item.badge}
                              </Badge>
                            )}
                            {item.items &&
                              (isExpanded(sectionIndex, itemIndex) ? (
                                <ChevronUp className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              ))}
                          </>
                        )}
                      </button>
                    )}
                    {item.items &&
                      isExpanded(sectionIndex, itemIndex) &&
                      !isCollapsed && (
                        <div className="ml-6 mt-1 space-y-[2px]">
                          {item.items.map((subItem, subIndex) =>
                            subItem.path ? (
                              <Link
                                key={subIndex}
                                to={subItem.path}
                                onClick={handleLinkClick}
                                className={`flex items-center gap-3 px-3 h-[28px] text-sm rounded-md cursor-pointer transition-colors hover:bg-muted text-[#09090B] ${
                                  isItemActive(subItem)
                                    ? 'bg-gray-100 font-bold'
                                    : 'font-medium'
                                }`}
                                aria-current={
                                  isItemActive(subItem) ? 'page' : undefined
                                }
                              >
                                <subItem.icon className="w-4 h-4 text-muted-foreground" />
                                <span className="flex-1 truncate">
                                  {subItem.title}
                                </span>
                                {subItem.badge && (
                                  <Badge
                                    variant="outline"
                                    className={`text-xs px-1.5 py-0.5 ${
                                      subItem.active
                                        ? 'border-black'
                                        : getBadgeColorClass(subItem.title)
                                    }`}
                                  >
                                    {subItem.badge}
                                  </Badge>
                                )}
                              </Link>
                            ) : (
                              <div
                                key={subIndex}
                                className={`flex items-center gap-3 px-3 h-[28px] text-sm rounded-md cursor-pointer transition-colors hover:bg-muted text-[#09090B] ${
                                  isItemActive(subItem)
                                    ? 'bg-gray-100 font-bold'
                                    : 'font-medium'
                                }`}
                              >
                                <subItem.icon className="w-4 h-4 text-muted-foreground" />
                                <span className="flex-1 truncate">
                                  {subItem.title}
                                </span>
                                {subItem.badge && (
                                  <Badge
                                    variant="outline"
                                    className={`text-xs px-1.5 py-0.5 ${
                                      subItem.active
                                        ? 'border-black'
                                        : getBadgeColorClass(subItem.title)
                                    }`}
                                  >
                                    {subItem.badge}
                                  </Badge>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}

export default Sidebar;
