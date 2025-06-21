import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Star, Menu } from 'lucide-react';

interface EventDetailsProps {
  eventId: number;
  onBack: () => void;
  onMenuToggle: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId, onBack, onMenuToggle }) => {
  const [activeTab, setActiveTab] = useState('assign-coordinator');
  const [selectedCoordinator, setSelectedCoordinator] = useState('');

  const tabs = [
    { id: 'event-details', label: 'Event Details' },
    { id: 'assign-coordinator', label: 'Assign Coordinator/Coordinator' },
    { id: 'session-management', label: 'Session Management' },
    { id: 'generate-sow', label: 'Generate SOW' }
  ];

  const meetingRooms = [
    { id: 1, name: 'Meeting Room 1', positions: 12, startDate: '12 Jan, 2023', endDate: '15 Jan, 2023', featured: true },
    { id: 2, name: 'Meeting Room 2', positions: 12, startDate: '12 Jan, 2023', endDate: '15 Jan, 2023' },
    { id: 3, name: 'Meeting Room 3', positions: 12, startDate: '12 Jan, 2023', endDate: '15 Jan, 2023' },
    { id: 4, name: 'Meeting Room 4', positions: 12, startDate: '12 Jan, 2023', endDate: '15 Jan, 2023' },
    { id: 5, name: 'Meeting Room 5', positions: 12, startDate: '12 Jan, 2023', endDate: '15 Jan, 2023' }
  ];

  const positions = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    position: 'Camera 1 (Video)',
    time: '9 am - 7 pm',
    info: 'LP default',
    quantity: 20
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 p-4 lg:p-6">
      <div className="space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4 lg:mb-6">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <button
            onClick={onBack}
            className="p-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg lg:text-2xl font-semibold text-white">
            Event Name <span className="text-gray-400 text-sm lg:text-base">(Venue Details)</span>
          </h1>
        </div>

        {/* Tabs - Horizontal scroll on mobile */}
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content - Single column on mobile, two columns on desktop */}
        <div className="space-y-6 lg:grid lg:grid-cols-12 lg:gap-6 lg:space-y-0">
          {/* Left Column - Coordinator & Contractor Assignment */}
          <div className="lg:col-span-5 space-y-4 lg:space-y-6">
            {/* Assign Coordinator */}
            <div className="bg-gray-900/30 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold text-white mb-4">Assign Coordinator</h3>
              
              <div className="relative mb-4">
                <select
                  value={selectedCoordinator}
                  onChange={(e) => setSelectedCoordinator(e.target.value)}
                  className="w-full bg-gray-800/50 border border-pink-500/20 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50"
                >
                  <option value="">Search Coordinator</option>
                  <option value="coordinator1">John Doe</option>
                  <option value="coordinator2">Jane Smith</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              <button className="text-pink-400 hover:text-pink-300 text-sm transition-colors">
                Add New Coordinator
              </button>
            </div>

            {/* Assign Contractor */}
            <div className="bg-gray-900/30 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold text-white mb-4">Assign Contractor</h3>
              
              <div className="space-y-3">
                {meetingRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`p-3 lg:p-4 rounded-xl border transition-all duration-200 ${
                      room.featured
                        ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-pink-500/30'
                        : 'bg-gray-800/30 border-gray-700/50 hover:border-pink-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white flex items-center gap-2 text-sm lg:text-base">
                        {room.name}
                        {room.featured && <Star className="w-4 h-4 text-pink-400 fill-current" />}
                        <span className="text-pink-400">{room.positions} Positions</span>
                      </h4>
                    </div>
                    <p className="text-xs lg:text-sm text-gray-400">
                      Start from {room.startDate} - Ends at {room.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Event Details & Positions */}
          <div className="lg:col-span-7 space-y-4 lg:space-y-6">
            {/* Event Info */}
            <div className="bg-gray-900/30 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold text-white mb-4">
                Event Name <span className="text-gray-400">(Venue Here)</span>
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 text-sm lg:text-base">
                <div>
                  <span className="text-gray-400">Start: </span>
                  <span className="text-white">12-12-2023</span>
                </div>
                <div>
                  <span className="text-gray-400">Ends: </span>
                  <span className="text-white">15-12-2023</span>
                </div>
              </div>

              <div className="text-gray-400 text-sm lg:text-base">
                <span className="text-white">Venue Address:</span> Some Location 12, Name Here, City, State.
              </div>
            </div>

            {/* Positions Table */}
            <div className="bg-gray-900/30 backdrop-blur-sm border border-pink-500/20 rounded-2xl overflow-hidden">
              <div className="p-4 lg:p-6">
                <h3 className="text-base lg:text-lg font-semibold text-white mb-4">Positions</h3>
                
                {/* Table with horizontal scroll on mobile */}
                <div className="overflow-x-auto">
                  <div className="min-w-[600px]">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400 mb-4">
                      <div className="col-span-3">Position</div>
                      <div className="col-span-2">Time</div>
                      <div className="col-span-2">Info</div>
                      <div className="col-span-5">Quantity & Contractor</div>
                    </div>

                    {/* Table Body */}
                    <div className="space-y-3">
                      {positions.map((position) => (
                        <div key={position.id} className="grid grid-cols-12 gap-4 items-center text-sm">
                          <div className="col-span-3 text-white">{position.position}</div>
                          <div className="col-span-2 text-gray-300">{position.time}</div>
                          <div className="col-span-2 text-gray-300">{position.info}</div>
                          <div className="col-span-5 flex items-center gap-3">
                            <span className="text-white min-w-[20px]">{position.quantity}</span>
                            <div className="relative flex-1">
                              <select className="w-full bg-gray-800/50 border border-pink-500/20 rounded-lg px-3 py-2 text-white text-sm appearance-none focus:outline-none focus:border-pink-500/50">
                                <option>Select Contractor</option>
                                <option>Contractor 1</option>
                                <option>Contractor 2</option>
                              </select>
                              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination dots */}
              <div className="px-4 lg:px-6 py-4 border-t border-pink-500/20 flex justify-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 lg:px-8 py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200 w-full sm:w-auto">
                Save Edits
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;