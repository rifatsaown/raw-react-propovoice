import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { NoteItem } from '@/interfaces';
import { Edit2, File, Maximize2, MoreHorizontal, Trash2 } from 'lucide-react';
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
              <span className="text-xs">🏳️</span>
              <span className="text-[10px] leading-none px-1.5 py-0.5 rounded bg-[#E6F7F0] text-[#0EA5E9]">
                H
              </span>
            </div>

            <p className="mt-1 text-sm leading-6 text-[#3F3F46]">
              {displayText.split(/(@[A-Za-z0-9_]+)/g).map((chunk, i) =>
                chunk.startsWith('@') ? (
                  <span key={i} className="text-[#0EA5E9] font-medium">
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
                    {att.kind === 'image' ? (
                      <div className="group relative w-[130px] h-[130px] rounded-2xl overflow-hidden border border-[#E4E4E7] bg-white shadow-sm">
                        <img
                          src={att.src}
                          alt={att.name}
                          className="h-full w-full object-cover"
                        />

                        <button className="absolute right-2 top-2 inline-flex items-center justify-center size-8 rounded-xl bg-white/90 border border-[#E4E4E7] shadow-sm text-[#18181B] hover:bg-white">
                          <MoreHorizontal className="size-4" />
                        </button>

                        <button className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:inline-flex items-center justify-center size-8 rounded-xl bg-white/90 border border-[#E4E4E7] shadow-sm text-[#18181B] hover:bg-white">
                          <Maximize2 className="size-4" />
                        </button>

                        <div className="absolute inset-x-0 bottom-0">
                          <div className="mx-2 mb-2 rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-xs text-[#3F3F46] shadow-sm truncate">
                            {formatFilename(att.name)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-[130px] h-[130px] rounded-2xl overflow-hidden border border-[#E4E4E7] bg-[#EEF2F5] shadow-sm">
                        <button className="absolute right-2 top-2 inline-flex items-center justify-center size-8 rounded-xl bg-white/90 border border-[#E4E4E7] shadow-sm text-[#18181B] hover:bg-white">
                          <MoreHorizontal className="size-4" />
                        </button>
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="flex items-center justify-center size-12 rounded-full bg-white border border-[#E4E4E7]">
                            <File className="size-6 text-[#3F3F46]" />
                          </div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0">
                          <div className="mx-2 mb-2 rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-xs text-[#3F3F46] shadow-sm truncate">
                            {formatFilename(att.name)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-[#71717A]">
            <button className="hover:text-[#18181B]">
              <Edit2 className="size-4" />
            </button>
            <button className="hover:text-[#DC2626]">
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
