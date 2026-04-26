'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: 'meeting' | 'task' | 'deadline';
  mentor?: string;
  color: string;
}

const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Growth Strategy Review',
    date: '2026-04-26',
    time: '11:00 AM',
    duration: '45 min',
    type: 'meeting',
    mentor: 'David Thompson',
    color: 'bg-blue-500',
  },
  {
    id: '2',
    title: 'Product Roadmap Sync',
    date: '2026-04-27',
    time: '02:30 PM',
    duration: '30 min',
    type: 'meeting',
    mentor: 'Sarah Wilson',
    color: 'bg-purple-500',
  },
  {
    id: '3',
    title: 'TaskFlow v1.0 Launch',
    date: '2026-05-05',
    time: '09:00 AM',
    duration: 'All day',
    type: 'deadline',
    color: 'bg-green-500',
  },
  {
    id: '4',
    title: 'Fundraising Prep',
    date: '2026-04-29',
    time: '03:00 PM',
    duration: '60 min',
    type: 'task',
    color: 'bg-orange-500',
  },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 26));
  const [selectedDate, setSelectedDate] = useState(
    new Date(2026, 3, 26).toISOString().split('T')[0]
  );

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [currentDate]);

  const eventsForSelectedDate = useMemo(() => {
    return CALENDAR_EVENTS.filter((event) => event.date === selectedDate);
  }, [selectedDate]);

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateClick = (day: number | null) => {
    if (day) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      setSelectedDate(date.toISOString().split('T')[0]);
    }
  };

  const monthName = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">
              Calendar
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {/* Month Header */}
                  <div className="p-4 lg:p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg lg:text-xl font-bold">
                        {monthName}
                      </h2>
                      <div className="flex gap-2">
                        <button
                          onClick={previousMonth}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="Previous month"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextMonth}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="Next month"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                        (day) => (
                          <div
                            key={day}
                            className="text-center text-xs lg:text-sm font-semibold text-gray-600 py-2"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="p-4 lg:p-6">
                    <div className="grid grid-cols-7 gap-2">
                      {monthDays.map((day, index) => {
                        const dateStr =
                          day &&
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            day
                          )
                            .toISOString()
                            .split('T')[0];

                        const hasEvents =
                          day &&
                          CALENDAR_EVENTS.some((e) => e.date === dateStr);
                        const isSelected = dateStr === selectedDate;

                        return (
                          <button
                            key={index}
                            onClick={() => handleDateClick(day)}
                            className={`aspect-square rounded-lg flex items-center justify-center text-sm lg:text-base font-medium transition-colors relative ${
                              day
                                ? isSelected
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                                : 'text-gray-300'
                            }`}
                          >
                            {day}
                            {hasEvents && (
                              <span className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Events List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
                <h3 className="font-bold text-lg mb-4">Events</h3>

                {eventsForSelectedDate.length > 0 ? (
                  <div className="space-y-3">
                    {eventsForSelectedDate.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 border-l-4 rounded bg-gray-50"
                        style={{ borderLeftColor: getColorValue(event.color) }}
                      >
                        <p className="font-semibold text-sm mb-1">
                          {event.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                          <Clock size={14} />
                          <span>
                            {event.time} • {event.duration}
                          </span>
                        </div>
                        {event.mentor && (
                          <p className="text-xs text-gray-500">
                            with {event.mentor}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No events scheduled</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getColorValue(color: string): string {
  const colorMap: { [key: string]: string } = {
    'bg-blue-500': '#3b82f6',
    'bg-purple-500': '#a855f7',
    'bg-green-500': '#22c55e',
    'bg-orange-500': '#f97316',
  };
  return colorMap[color] || '#3b82f6';
}
