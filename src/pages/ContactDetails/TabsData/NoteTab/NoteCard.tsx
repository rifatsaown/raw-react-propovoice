import AttachmentCard from '@/components/AttachmentCard';
import { MediumFlagIcon } from '@/components/Icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { NoteItem } from '@/interfaces';
import { PenLine, Trash } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function NoteCard({ note }: { note: NoteItem }) {
  const [expanded, setExpanded] = useState(false);
  const maxChars = 320;
  const needsTrim = note.text.length > maxChars;
  const displayText =
    expanded || !needsTrim ? note.text : note.text.slice(0, maxChars) + '…';

  const formatFilename = useMemo(() => {
    const middleEllipsis = (name: string, max = 12) => {
      if (name.length <= max) return name;
      const dotIndex = name.lastIndexOf('.');
      const base = dotIndex > 0 ? name.slice(0, dotIndex) : name;
      const ext = dotIndex > 0 ? name.slice(dotIndex) : '';
      const keep = Math.max(2, Math.floor((max - ext.length - 3) / 2));
      const start = base.slice(0, keep);
      const end = base.slice(-keep);
      return `${start}...${end}${ext}`;
    };
    return (name: string) => middleEllipsis(name, 12);
  }, []);

  return (
    <div
      className={
        'relative rounded-xl ' +
        (note.tint === 'muted' ? 'bg-[#F4F4F5]' : 'bg-white')
      }
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Avatar className="size-9">
            <AvatarImage src={note.author.avatar} alt={note.author.name} />
            <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-[#18181B] truncate">
                {note.author.name}
              </p>
              <span className="text-xs text-[#71717A]">{note.timestamp}</span>
              <div className="flex items-center ">
                {note.flag === 'H' && (
                  <>
                    <MediumFlagIcon className="w-4" />{' '}
                    <span className="text-xs font-medium">H</span>
                  </>
                )}
              </div>
            </div>

            <p className="mt-1 text-sm leading-6 text-[#3F3F46]">
              {displayText.split(/(@[A-Za-z0-9_]+)/g).map((chunk, i) =>
                chunk.startsWith('@') ? (
                  <span key={i} className="text-[#009B6A] font-medium">
                    {chunk}
                  </span>
                ) : (
                  <span key={i}>{chunk}</span>
                )
              )}
              {!expanded && needsTrim && (
                <button
                  className="ml-1 text-[#10B981] font-medium hover:underline"
                  onClick={() => setExpanded(true)}
                >
                  Show More
                </button>
              )}
            </p>

            {note.attachments && note.attachments.length > 0 && (
              <div className="mt-3 flex gap-3">
                {note.attachments.map((att) => (
                  <div key={att.id} className="shrink-0">
                    <AttachmentCard
                      attachment={att}
                      formatFilename={formatFilename}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-8 text-[#71717A]">
            <button className="hover:text-[#18181B]">
              <PenLine className="size-4" />
            </button>
            <button className="hover:text-[#DC2626]">
              <Trash className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
