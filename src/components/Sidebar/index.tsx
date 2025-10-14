import { logo } from "@/assets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileInput,
  Settings,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "../Icons";

// Custom hook to safely use location
const useSafeLocation = () => {
  try {
    return useLocation();
  } catch (error) {
    console.error(error);
    // Return a default location object if useLocation fails
    return { pathname: "/" };
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
    label: "",
    items: [
      { icon: MyTaskIcon, title: "My Task", badge: 10, path: "/main" },
      { icon: InboxIcon, title: "Inbox", badge: 10 },
      { icon: AnalyticsIcon, title: "Analytics" },
    ],
  },
  {
    label: "SALES",
    items: [
      { icon: SalesPipelineIcon, title: "Sales Pipeline" },
      { icon: ProposalIcon, title: "Proposal" },
      { icon: AgreementIcon, title: "Agreements" },
      { icon: ServicePackagesIcon, title: "Service Packages" },
    ],
  },
  {
    label: "FULFILMENT",
    items: [
      { icon: InvoicesIcon, title: "Invoices" },
      { icon: OrdersIcon, title: "Orders" },
      { icon: FolderPlusIcon, title: "Request", badge: 10 },
      {
        icon: FolderShieldIcon,
        title: "Project",
        items: [
          { icon: FileInput, title: "Request", badge: 10 },
          { icon: FileInput, title: "Request", badge: 10 },
        ],
      },
    ],
  },
  {
    label: "ENGAGEMENT",
    items: [
      { icon: UserClientIcon, title: "Client Portal" },
      {
        icon: BookOpen,
        title: "Contact Book",
        active: true,
        path: "/main/contact-book",
      }, // TODO: Remove Active
    ],
  },
  {
    label: "CUSTOMIZATION",
    items: [
      { icon: DataflowIcon, title: "Automation" },
      { icon: Settings, title: "Settings" },
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

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Only prevent body scroll on mobile devices
      if (window.innerWidth < 1024) {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "0px"; // Prevent layout shift
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
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
      case "inbox":
        return "border-[#009B6A] bg-[#EBFEF5] text-[#067647]";
      case "request":
        return "border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815]";
      default:
        return "border-[#E4E4E7] bg-[#F8FAFC] text-[#18181B]";
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
          w-64 h-screen border-r border-[#E4E4E7] bg-white font-['Inter']
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:relative lg:transform-none
          shadow-lg lg:shadow-none
          overflow-hidden
        `}
        role="navigation"
        aria-label="Main navigation">
        {/* Header with close button for mobile */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-8 h-8" />
            <div className="p-4 text-xl font-bold">Kidency</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8"
            onClick={onToggle}
            aria-label="Close sidebar">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)] overflow-hidden">
          <nav className="flex flex-col px-2 py-4">
            {menu.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-[2px]">
                {section.label && (
                  <div className="text-xs font-medium text-[#00000066] px-3 pt-3 pb-1">
                    {section.label}
                  </div>
                )}
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-col">
                    {item.path ? (
                      <Link
                        to={item.path}
                        onClick={handleLinkClick}
                        className={`flex items-center gap-3 px-3 h-[28px] text-sm rounded-md cursor-pointer transition-colors hover:bg-muted text-[#09090B] font-medium ${
                          item.active ? "bg-muted font-semibold" : ""
                        }`}
                        aria-current={item.active ? "page" : undefined}>
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="flex-1 truncate">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="outline"
                            className={`text-xs px-2 py-0.5 ${
                              item.active
                                ? "border-black"
                                : getBadgeColorClass(item.title)
                            }`}>
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    ) : (
                      <button
                        onClick={() =>
                          item.items && toggleExpand(sectionIndex, itemIndex)
                        }
                        className={`flex items-center gap-3 px-3 h-[28px] text-sm rounded-md cursor-pointer transition-colors hover:bg-muted text-[#09090B] font-medium w-full text-left ${
                          item.active ? "bg-muted font-semibold" : ""
                        }`}
                        aria-expanded={
                          item.items
                            ? isExpanded(sectionIndex, itemIndex)
                            : undefined
                        }>
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="flex-1 truncate">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="outline"
                            className={`text-xs px-2 py-0.5 ${
                              item.active
                                ? "border-black"
                                : getBadgeColorClass(item.title)
                            }`}>
                            {item.badge}
                          </Badge>
                        )}
                        {item.items &&
                          (isExpanded(sectionIndex, itemIndex) ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          ))}
                      </button>
                    )}
                    {item.items && isExpanded(sectionIndex, itemIndex) && (
                      <div className="ml-6 mt-1 space-y-[2px]">
                        {item.items.map((subItem, subIndex) =>
                          subItem.path ? (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              onClick={handleLinkClick}
                              className={`flex items-center gap-3 px-3 h-[28px] text-sm rounded-md cursor-pointer transition-colors hover:bg-muted text-[#09090B] font-medium ${
                                subItem.active ? "bg-muted" : ""
                              }`}
                              aria-current={
                                subItem.active ? "page" : undefined
                              }>
                              <subItem.icon className="w-4 h-4 text-muted-foreground" />
                              <span className="flex-1 truncate">
                                {subItem.title}
                              </span>
                              {subItem.badge && (
                                <Badge
                                  variant="outline"
                                  className={`text-xs px-1.5 py-0.5 ${
                                    subItem.active
                                      ? "border-black"
                                      : getBadgeColorClass(subItem.title)
                                  }`}>
                                  {subItem.badge}
                                </Badge>
                              )}
                            </Link>
                          ) : (
                            <div
                              key={subIndex}
                              className={`flex items-center gap-3 px-3 h-[28px] text-sm rounded-md cursor-pointer transition-colors hover:bg-muted text-[#09090B] font-medium ${
                                subItem.active ? "bg-muted" : ""
                              }`}>
                              <subItem.icon className="w-4 h-4 text-muted-foreground" />
                              <span className="flex-1 truncate">
                                {subItem.title}
                              </span>
                              {subItem.badge && (
                                <Badge
                                  variant="outline"
                                  className={`text-xs px-1.5 py-0.5 ${
                                    subItem.active
                                      ? "border-black"
                                      : getBadgeColorClass(subItem.title)
                                  }`}>
                                  {subItem.badge}
                                </Badge>
                              )}
                            </div>
                          ),
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
