'use client';

import { FormEvent, useMemo, useState } from 'react';
import {
  Calendar,
  Clock,
  Link,
  Plus,
  Video,
  X,
  RotateCcw,
  Ban,
  CheckCircle2,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

type MeetingStatus = 'Upcoming' | 'Past' | 'Cancelled';

interface Meeting {
  id: string;
  title: string;
  mentorName: string;
  mentorRole: string;
  mentorAvatar: string;
  date: string;
  time: string;
  duration: string;
  status: MeetingStatus;
  meetingLink?: string;
}

const INITIAL_MEETINGS: Meeting[] = [
  {
    id: 'm1',
    title: 'Growth Strategy Review',
    mentorName: 'David Thompson',
    mentorRole: 'Growth Mentor',
    mentorAvatar: 'DT',
    date: '2026-04-26',
    time: '11:00 AM',
    duration: '45 min',
    status: 'Upcoming',
    meetingLink: 'https://meet.startuplabs.app/room/growth-review',
  },
  {
    id: 'm2',
    title: 'Product Roadmap Sync',
    mentorName: 'Sarah Wilson',
    mentorRole: 'Product Advisor',
    mentorAvatar: 'SW',
    date: '2026-04-27',
    time: '02:30 PM',
    duration: '30 min',
    status: 'Upcoming',
    meetingLink: 'https://meet.startuplabs.app/room/product-sync',
  },
  {
    id: 'm3',
    title: 'Fundraising Prep Session',
    mentorName: 'Mike Rodriguez',
    mentorRole: 'VC Partner',
    mentorAvatar: 'MR',
    date: '2026-04-20',
    time: '09:30 AM',
    duration: '60 min',
    status: 'Past',
  },
  {
    id: 'm4',
    title: 'Legal Compliance Check',
    mentorName: 'Priya Patel',
    mentorRole: 'Legal Mentor',
    mentorAvatar: 'PP',
    date: '2026-04-18',
    time: '04:00 PM',
    duration: '30 min',
    status: 'Past',
  },
  {
    id: 'm5',
    title: 'Brand Positioning Workshop',
    mentorName: 'Emily Hayes',
    mentorRole: 'Marketing Mentor',
    mentorAvatar: 'EH',
    date: '2026-04-24',
    time: '01:00 PM',
    duration: '45 min',
    status: 'Cancelled',
  },
];

const tabs: MeetingStatus[] = ['Upcoming', 'Past', 'Cancelled'];

export default function MeetingsPage() {
  const now = new Date();
  const [activeTab, setActiveTab] = useState<MeetingStatus>('Upcoming');
  const [meetings, setMeetings] = useState<Meeting[]>(INITIAL_MEETINGS);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(now.getDate());
  const [scheduleForm, setScheduleForm] = useState({
    title: '',
    mentorName: '',
    mentorRole: '',
    date: '',
    time: '',
    duration: '30 min',
  });

  const year = now.getFullYear();
  const monthIndex = now.getMonth();
  const monthLabel = now.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();

  const calendarCells = useMemo(() => {
    const blanks = Array.from({ length: firstWeekday }, (_, idx) => `blank-${idx}`);
    const days = Array.from({ length: daysInMonth }, (_, idx) => idx + 1);
    return [...blanks, ...days];
  }, [daysInMonth, firstWeekday]);

  const filteredMeetings = useMemo(() => {
    return meetings.filter((meeting) => {
      if (meeting.status !== activeTab) return false;

      const meetingDate = new Date(meeting.date);
      const selectedDate = new Date(year, monthIndex, selectedDay);

      return (
        meetingDate.getFullYear() === selectedDate.getFullYear() &&
        meetingDate.getMonth() === selectedDate.getMonth() &&
        meetingDate.getDate() === selectedDate.getDate()
      );
    });
  }, [activeTab, meetings, year, monthIndex, selectedDay]);

  const handleScheduleMeeting = (event: FormEvent) => {
    event.preventDefault();

    if (!scheduleForm.title || !scheduleForm.mentorName || !scheduleForm.date || !scheduleForm.time) {
      return;
    }

    const avatarInitials = scheduleForm.mentorName
      .split(' ')
      .map((part) => part[0]?.toUpperCase() ?? '')
      .slice(0, 2)
      .join('');

    const formattedTime = new Date(`2000-01-01T${scheduleForm.time}`)
      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      .replace(/^0/, '');

    const newMeeting: Meeting = {
      id: `m-${Date.now()}`,
      title: scheduleForm.title,
      mentorName: scheduleForm.mentorName,
      mentorRole: scheduleForm.mentorRole || 'Mentor',
      mentorAvatar: avatarInitials || 'NA',
      date: scheduleForm.date,
      time: formattedTime,
      duration: scheduleForm.duration,
      status: 'Upcoming',
      meetingLink: `https://meet.startuplabs.app/room/${Date.now().toString(36)}`,
    };

    setMeetings((prev) => [newMeeting, ...prev]);
    setScheduleForm({
      title: '',
      mentorName: '',
      mentorRole: '',
      date: '',
      time: '',
      duration: '30 min',
    });
    setActiveTab('Upcoming');
    setSelectedDay(new Date(scheduleForm.date).getDate());
    setIsScheduleOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 bg-white border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Meetings</h1>
            <p className="text-sm text-gray-600">Track your mentor sessions, reschedule quickly, and stay prepared.</p>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <section className="xl:col-span-4 bg-white rounded-lg border border-gray-100 shadow-sm p-4 h-fit">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-gray-900">Mini Calendar</h2>
                  <button
                    onClick={() => setIsScheduleOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={14} />
                    Schedule
                  </button>
                </div>

                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar size={16} className="text-gray-500" />
                  <span>{monthLabel}</span>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dayLabel) => (
                    <div key={dayLabel} className="text-xs text-gray-500 text-center py-1">
                      {dayLabel}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarCells.map((cell) => {
                    if (typeof cell === 'string') {
                      return <div key={cell} className="h-8" />;
                    }

                    const isSelected = cell === selectedDay;
                    return (
                      <button
                        key={cell}
                        onClick={() => setSelectedDay(cell)}
                        className={`h-8 rounded-md text-xs font-medium transition-colors ${
                          isSelected ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {cell}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="xl:col-span-8 bg-white rounded-lg border border-gray-100 shadow-sm">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          activeTab === tab
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-gray-500">
                    Showing {filteredMeetings.length} {filteredMeetings.length === 1 ? 'meeting' : 'meetings'}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {filteredMeetings.length === 0 && (
                    <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <p className="text-sm font-medium text-gray-700 mb-1">No {activeTab.toLowerCase()} meetings on this date</p>
                      <p className="text-xs text-gray-500">Pick another day on the mini calendar or schedule a new meeting.</p>
                    </div>
                  )}

                  {filteredMeetings.map((meeting) => (
                    <article key={meeting.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-purple-600 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                            {meeting.mentorAvatar}
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">{meeting.title}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{meeting.mentorName} · {meeting.mentorRole}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                              <span className="flex items-center gap-1"><Calendar size={12} />{meeting.date}</span>
                              <span className="flex items-center gap-1"><Clock size={12} />{meeting.time}</span>
                              <span>{meeting.duration}</span>
                            </div>
                          </div>
                        </div>

                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          meeting.status === 'Upcoming'
                            ? 'bg-blue-100 text-blue-700'
                            : meeting.status === 'Past'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                        }`}>
                          {meeting.status}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-2 flex-wrap">
                        {meeting.status === 'Upcoming' && (
                          <>
                            <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors flex items-center gap-1.5">
                              <Video size={13} /> Join
                            </button>
                            <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                              <RotateCcw size={13} /> Reschedule
                            </button>
                            <button className="px-3 py-1.5 rounded-lg border border-red-200 text-red-700 text-xs font-medium hover:bg-red-50 transition-colors flex items-center gap-1.5">
                              <Ban size={13} /> Cancel
                            </button>
                          </>
                        )}

                        {meeting.status === 'Past' && (
                          <button className="px-3 py-1.5 rounded-lg border border-green-200 text-green-700 text-xs font-medium hover:bg-green-50 transition-colors flex items-center gap-1.5">
                            <CheckCircle2 size={13} /> View Notes
                          </button>
                        )}

                        {meeting.status === 'Cancelled' && (
                          <button className="px-3 py-1.5 rounded-lg border border-amber-200 text-amber-700 text-xs font-medium hover:bg-amber-50 transition-colors flex items-center gap-1.5">
                            <RotateCcw size={13} /> Rebook
                          </button>
                        )}

                        {meeting.meetingLink && meeting.status === 'Upcoming' && (
                          <a
                            href={meeting.meetingLink}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1.5 ml-auto"
                          >
                            <Link size={12} />
                            Meeting Link
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {isScheduleOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsScheduleOpen(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Schedule Meeting</h2>
              <button
                onClick={() => setIsScheduleOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleScheduleMeeting} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Meeting Title</label>
                <input
                  value={scheduleForm.title}
                  onChange={(e) => setScheduleForm((prev) => ({ ...prev, title: e.target.value }))}
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                  placeholder="Weekly Product Review"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Mentor Name</label>
                  <input
                    value={scheduleForm.mentorName}
                    onChange={(e) => setScheduleForm((prev) => ({ ...prev, mentorName: e.target.value }))}
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                    placeholder="Alex Morgan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Mentor Role</label>
                  <input
                    value={scheduleForm.mentorRole}
                    onChange={(e) => setScheduleForm((prev) => ({ ...prev, mentorRole: e.target.value }))}
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                    placeholder="Growth Mentor"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                  <input
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm((prev) => ({ ...prev, date: e.target.value }))}
                    type="date"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Time</label>
                  <input
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm((prev) => ({ ...prev, time: e.target.value }))}
                    type="time"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
                  <select
                    value={scheduleForm.duration}
                    onChange={(e) => setScheduleForm((prev) => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                    title="Duration"
                  >
                    <option value="30 min">30 min</option>
                    <option value="45 min">45 min</option>
                    <option value="60 min">60 min</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleOpen(false)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Schedule Meeting
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
