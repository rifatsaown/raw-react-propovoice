import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AtSign,
  Building2,
  Calendar,
  Edit2,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

function Row({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  action?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-2">
      <span className="text-[#6B7280] mt-0.5">{icon}</span>
      <div className="flex-1 text-[#18181B]">{children}</div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold text-[#18181B] mt-6 mb-1">
      {children}
    </h3>
  );
}

function BasicInfo() {
  return (
    <div className="bg-white rounded-2xl shadow-sm px-9 py-5 border border-[#E5E7EB]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#18181B]">Basic Info</h2>
        <Button
          variant="outline"
          className="h-9 rounded-lg px-3 text-sm border-[#E5E7EB] text-[#18181B] bg-white hover:bg-gray-50"
        >
          + Custom Feild
        </Button>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <SectionTitle>Personal Info</SectionTitle>{' '}
          <button className="text-gray-400 hover:text-gray-600">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-1.5">
          <Row icon={<Phone className="w-4 h-4" />}>+8801760706361</Row>
          <Row icon={<Mail className="w-4 h-4" />}>
            nurencydigital@gmail.com
          </Row>
          <Row icon={<MapPin className="w-4 h-4" />}>320, New York, US</Row>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <SectionTitle>Company</SectionTitle>{' '}
          <button className="text-gray-400 hover:text-gray-600">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-1.5">
          <Row icon={<Building2 className="w-4 h-4" />}>Nurency Digital</Row>
          <Row icon={<Globe className="w-4 h-4" />}>nurency.com</Row>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <SectionTitle>Job Title</SectionTitle>{' '}
          <button className="text-gray-400 hover:text-gray-600">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-1.5">
          <Row icon={<BriefcaseIcon />}>Project Manager</Row>
        </div>
        <SectionTitle>Birt Date</SectionTitle>
        <div className="space-y-1.5">
          <Row icon={<Calendar className="w-4 h-4" />}>20 Dec 2023</Row>
        </div>
        <SectionTitle>Social Media</SectionTitle>
        <div className="flex items-center gap-4 py-2">
          {['facebook', 'linkedin', 'x', 'youtube', 'instagram'].map((k) => (
            <span
              key={k}
              className="size-9 rounded-full bg-[#F4F4F5] flex items-center justify-center text-[#6B7280]"
            >
              <AtSign className="w-4 h-4" />
            </span>
          ))}
          <button className="ml-auto text-gray-400 hover:text-gray-600">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <SectionTitle>Industry</SectionTitle>{' '}
            <button className="text-gray-400 hover:text-gray-600">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1.5">
            <Row icon={<FileText className="w-4 h-4" />}>Web Design</Row>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <SectionTitle>Description</SectionTitle>
        <button className="text-gray-400 hover:text-gray-600">
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-1.5">
        Give your users more reasons to stick around with fast, flexible and
        frictionless payment experiences that boost cash flow.
      </div>
      <SectionTitle>Tag</SectionTitle>
      <div className="flex flex-wrap items-center gap-2 py-2">
        {['webdesign', 'Design', 'Design', 'Aslam', 'Aslam'].map((t, i) => (
          <Badge
            key={t + i}
            variant="secondary"
            className="bg-[#F4F4F5] text-[#18181B] border-none h-7 rounded-lg px-3"
          >
            {t} <span className="ml-1">×</span>
          </Badge>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-lg px-2 border-[#E5E7EB] text-[#18181B] bg-white hover:bg-gray-50"
        >
          + Add
        </Button>
      </div>
      <SectionTitle>Others</SectionTitle>
    </div>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        d="M10 6h4m-8 4h12M7 20h10a3 3 0 0 0 3-3V10a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3Z"
        strokeWidth="1.5"
      />
      <rect x="9" y="3" width="6" height="3" rx="1" strokeWidth="1.5" />
    </svg>
  );
}

export default BasicInfo;
