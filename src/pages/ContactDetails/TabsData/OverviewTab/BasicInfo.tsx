import {
  Building2Icon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailBoxIcon,
  XIcon,
  YoutubeIcon,
} from '@/components/Icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { User } from '@/interfaces';
import { Globe, Map, PenLine, Phone, XIcon as XIconLucide } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

function Row({
  icon = null,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
  action?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 py-0.5">
      {icon && <span className="text-[#71717A] mt-0.5">{icon}</span>}
      <div className="flex-1 text-[#71717A]">{children}</div>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="font-medium text-[#18181B] mt-6 mb-1.5">{children}</h3>;
}

type BasicInfoData = {
  phone?: string;
  email?: string;
  address?: string;
  company?: { name?: string; website?: string };
  jobTitle?: string;
  birthDate?: string;
  social?: Array<{ key: string; url?: string }>;
  industry?: string;
  description?: string;
  tags?: string[];
};

interface BasicInfoProps {
  user: User;
}

function BasicInfo({ user }: BasicInfoProps) {
  const [data, setData] = useState<BasicInfoData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchSeqRef = useRef(0);

  useEffect(() => {
    const fetchBasicInfo = async () => {
      const requestId = ++fetchSeqRef.current;
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API latency
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (requestId !== fetchSeqRef.current) return;
        // Dummy payload shaped like an eventual API response
        const mock: BasicInfoData = {
          phone: '+8801760706361',
          email: user?.email || 'nurencydigital@gmail.com',
          address: '320, New York, US',
          company: { name: 'Nurency Digital', website: 'nurency.com' },
          jobTitle: 'Project Manager',
          birthDate: '20 Dec 2023',
          social: [
            { key: 'facebook', url: '#' },
            { key: 'linkedin', url: '#' },
            { key: 'x', url: '#' },
            { key: 'youtube', url: '#' },
            { key: 'instagram', url: '#' },
          ],
          industry: 'Web Design',
          description:
            'Give your users more reasons to stick around with fast, flexible and frictionless payment experiences that boost cash flow.',
          tags: ['webdesign', 'Design', 'Design', 'Aslam', 'Aslam'],
        };
        setData(mock);
      } catch (e) {
        if (requestId !== fetchSeqRef.current) return;
        setError(e instanceof Error ? e.message : 'Failed to load basic info');
      } finally {
        if (requestId === fetchSeqRef.current) {
          setIsLoading(false);
        }
      }
    };
    if (!user?.id) return;
    fetchBasicInfo();
  }, [user?.id, user?.email]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm px-9 py-5 border border-[#E5E7EB]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#18181B]">Basic Info</h2>
        </div>
        <div className="py-8 text-[#6B7280]">Loading basic info...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm px-9 py-5 border border-[#E5E7EB]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#18181B]">Basic Info</h2>
        </div>
        <div className="py-8 text-red-500">Error: {error}</div>
      </div>
    );
  }

  const phoneNumber = data?.phone || '—';
  const emailAddress = data?.email || '—';
  const address = data?.address || '—';
  const companyName = data?.company?.name || '—';
  const website = data?.company?.website || '—';
  const jobTitle = data?.jobTitle || '—';
  const birthDate = data?.birthDate || '—';
  const social = data?.social || [];
  const industry = data?.industry || '—';
  const description = data?.description || '—';
  const tags = data?.tags || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm px-9 py-5 border border-[#E5E7EB]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-medium text-[#18181B]">Basic Info</h2>
        <button
          className="rounded-sm px-3 py-0.5 text-sm border-[#E4E7EC] text-[#18181B] bg-white hover:bg-gray-50 border"
          type="button"
        >
          <span className="font-medium">+ Custom Feild</span>
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <SectionTitle>Personal Info</SectionTitle>{' '}
          <button className="text-gray-400 hover:text-gray-600">
            <PenLine className="w-4 h-4" />
          </button>
        </div>
        <div className="">
          <Row icon={<Phone className="w-4 h-4" />}>{phoneNumber}</Row>
          <Row icon={<MailBoxIcon className="w-4 h-4" />}>{emailAddress}</Row>
          <Row icon={<Map className="w-4 h-4" />}>{address}</Row>
        </div>
      </div>
      <div className="-mt-2">
        <div className="flex items-center justify-between">
          <SectionTitle>Company</SectionTitle>{' '}
          <button className="text-gray-400 hover:text-gray-600">
            <PenLine className="w-4 h-4" />
          </button>
        </div>
        <div className="">
          <Row icon={<Building2Icon className="w-4 h-4" />}>{companyName}</Row>
          <Row icon={<Globe className="w-4 h-4" />}>{website}</Row>
        </div>
      </div>
      <div className="-mt-2">
        <div className="flex items-center justify-between">
          <SectionTitle>Job Title</SectionTitle>{' '}
          <button className="text-gray-400 hover:text-gray-600">
            <PenLine className="w-4 h-4" />
          </button>
        </div>
        <div className="">
          <Row icon={null}>{jobTitle}</Row>
        </div>
        <div className="-mt-2">
          <div className="flex items-center justify-between">
            <SectionTitle>Birth Date</SectionTitle>
            <button className="text-gray-400 hover:text-gray-600">
              <PenLine className="w-4 h-4" />
            </button>
          </div>
          <div className="">
            <Row icon={null}>{birthDate}</Row>
          </div>
        </div>
        <div className="-mt-2">
          <div className="flex items-center justify-between">
            <SectionTitle>Social Media</SectionTitle>{' '}
            <button className="ml-auto text-gray-400 hover:text-gray-600">
              <PenLine className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            {social.map((s) => (
              <a
                key={s.key}
                href={s.url || '#'}
                target="_blank"
                rel="noreferrer"
                className=""
                aria-label={s.key}
              >
                {s.key === 'facebook' && <FacebookIcon className="w-5 h-5" />}
                {s.key === 'linkedin' && <LinkedinIcon className="w-5 h-5" />}
                {s.key === 'x' && <XIcon className="w-5 h-5" />}
                {s.key === 'youtube' && <YoutubeIcon className="w-5 h-5" />}
                {s.key === 'instagram' && <InstagramIcon className="w-5 h-5" />}
              </a>
            ))}
          </div>
        </div>
        <div className="-mt-2">
          <div className="flex items-center justify-between">
            <SectionTitle>Industry</SectionTitle>{' '}
            <button className="text-gray-400 hover:text-gray-600">
              <PenLine className="w-4 h-4" />
            </button>
          </div>
          <div className="">
            <Row icon={null}>{industry}</Row>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between -mt-2">
        <SectionTitle>Description</SectionTitle>
        <button className="text-gray-400 hover:text-gray-600">
          <PenLine className="w-4 h-4" />
        </button>
      </div>
      <div className="text-[#71717A]">{description}</div>
      <div className="-mt-2">
        <SectionTitle>Tag</SectionTitle>
        <div className="flex flex-wrap items-center gap-1">
          {tags.map((t, i) => (
            <Badge
              key={t + i}
              variant="secondary"
              className="bg-[#F4F4F5] text-[#71717A] border-none py-1 rounded-md px-3"
            >
              {t}{' '}
              <span className="">
                <XIconLucide className="w-3 h-3" />
              </span>
            </Badge>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="h-7 rounded-md px-2 border-[#E4E4E7] text-[#71717A] bg-white hover:bg-gray-50"
          >
            + Add
          </Button>
        </div>
      </div>
      <div className="-mt-2">
        <SectionTitle>Others</SectionTitle>
      </div>
    </div>
  );
}

export default BasicInfo;
