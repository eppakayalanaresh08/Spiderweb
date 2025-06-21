import React, { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

interface EventData {
  id: number;
  eventName: string;
  eventStart: string;
  eventEnd: string;
  clientName: string;
  contactInfo: string;
  venue: string;
}

interface EventTableProps {
  onEventClick: (eventId: number) => void;
}

const EventTable: React.FC<EventTableProps> = ({ onEventClick }) => {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const eventData: EventData[] = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    eventName: 'Filled Name',
    eventStart: 'Jan 12, 2024',
    eventEnd: 'Jan 14, 2024',
    clientName: 'Muhammad Asad',
    contactInfo: '+1 234 566 7890',
    venue: 'Lorem Ipsum Dolor Sit Amet'
  }));

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ChevronUp className="w-4 h-4 text-gray-500" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-pink-400" /> : 
      <ChevronDown className="w-4 h-4 text-pink-400" />;
  };

  return (
    <div className="bg-gray-900/30 backdrop-blur-sm border border-pink-500/20 rounded-2xl overflow-hidden">
      {/* Mobile Search Bar */}
      <div className="md:hidden p-4 border-b border-pink-500/20">
        <div className="relative">
          <input
            type="text"
            placeholder="Search here"
            className="w-full pl-4 pr-4 py-3 bg-gray-800/50 border border-pink-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50"
          />
        </div>
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="overflow-x-auto">
        {/* Table Header - Fixed width for mobile */}
        <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 px-4 lg:px-6 py-4 min-w-[800px]">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-white">
            <div className="col-span-2 flex items-center gap-2 cursor-pointer" onClick={() => handleSort('eventName')}>
              Event Name
              <SortIcon field="eventName" />
            </div>
            <div className="col-span-2 flex items-center gap-2 cursor-pointer" onClick={() => handleSort('eventStart')}>
              Event Start
            </div>
            <div className="col-span-2 flex items-center gap-2 cursor-pointer" onClick={() => handleSort('eventEnd')}>
              Event End
              <SortIcon field="eventEnd" />
            </div>
            <div className="col-span-2 flex items-center gap-2 cursor-pointer" onClick={() => handleSort('clientName')}>
              Client Name
              <SortIcon field="clientName" />
            </div>
            <div className="col-span-2">Contact Info</div>
            <div className="col-span-2">Venue</div>
          </div>
        </div>

        {/* Table Body - Fixed width for mobile */}
        <div className="divide-y divide-pink-500/10 min-w-[800px]">
          {eventData.map((event) => (
            <div
              key={event.id}
              className="px-4 lg:px-6 py-4 hover:bg-pink-500/5 transition-colors cursor-pointer"
              onClick={() => onEventClick(event.id)}
            >
              <div className="grid grid-cols-12 gap-4 items-center text-sm">
                <div className="col-span-2 flex items-center gap-3">
                  <Eye className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-white truncate">{event.eventName}</span>
                </div>
                <div className="col-span-2 text-gray-300">{event.eventStart}</div>
                <div className="col-span-2 text-gray-300">{event.eventEnd}</div>
                <div className="col-span-2 text-gray-300 truncate">{event.clientName}</div>
                <div className="col-span-2 text-gray-300">{event.contactInfo}</div>
                <div className="col-span-2 text-gray-300 truncate">{event.venue}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="px-4 lg:px-6 py-4 border-t border-pink-500/20">
        <div className="flex items-center justify-between">
          <div className="w-32 lg:w-64 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex gap-1 lg:gap-2">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-6 h-6 lg:w-8 lg:h-8 rounded-lg transition-all duration-200 text-sm ${
                    currentPage === page
                      ? 'bg-pink-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTable;