import type { NoteItem } from '@/interfaces';
import { useState } from 'react';
import NoteCard from './NoteCard';
import NoteComposer from './NoteComposer';

const initialNotes: NoteItem[] = [
  {
    id: 'n1',
    author: {
      name: 'Gias Uddin',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    },
    flag: 'H',
    timestamp: '16 May, 6:00 PM',
    text: 'The United States has been the backbone of the industry, accounting for most North American revenue, which has an estimated global share of 40.0%. Improving business conditions has resulted in businesses attaining extra funds to spend on consultants. Emerging markets like Brazil, Russia, India, and China, also known as the BRIC nations, have provided a source of funds to spend on consultants. They are expected to lead the way in the future. These markets are expected to have a significant impact on the global economy in the coming years. They are expected to lead the way in the future. These markets are expected to have a significant impact on the global economy in the coming years. ',
  },
  {
    id: 'n2',
    author: {
      name: 'Gias Uddin',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    },
    
    timestamp: '16 May, 6:00 PM',
    text: '@Abbas Improving business conditions has resulted in businesses attaining extra funds to spend on consultants. Emerging markets like Brazil, Russia, India, and China, also known as the BRIC nations. 😍',
    attachments: [
      {
        id: 'b1',
        kind: 'image',
        src: 'https://randomuser.me/api/portraits/women/11.jpg',
        name: 'preview.jpeg',
      },
      { id: 'b2', kind: 'file', name: 'doc…a.pdf' },
      { id: 'b3', kind: 'file', name: 'doc…a.pdf' },
    ],
  },
  {
    id: 'n3',
    author: {
      name: 'Abbas',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    flag: 'H',
    timestamp: '16 May, 6:00 PM',
    text: 'The United States has been the backbone of the industry, accounting for most North American revenue, which has an estimated global share of 40.0%. Improving business conditions has resulted in businesses attaining extra funds to spend on consultants. Emerging markets like Brazil, Russia, India, and China, also known as the BRIC nations, have provided a source of....',
    tint: 'muted',
  },
];

export default function NotesTab() {
  const [notes] = useState<NoteItem[]>(initialNotes);

  return (
    <>
      <h3 className="text-[22px] leading-7 font-semibold text-[#18181B] mb-4">
        Note
      </h3>
      <div className="rounded-2xl bg-white p-4 sm:p-5 h-[75vh] flex flex-col gap-4">
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {notes.map((n) => (
            <NoteCard key={n.id} note={n} />
          ))}
        </div>

        <div className="mt-auto">
          <NoteComposer />
        </div>
      </div>
    </>
  );
}
