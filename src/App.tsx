import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import EventTable from './components/EventTable';
import EventDetails from './components/EventDetails';

function App() {
  const [activeView, setActiveView] = useState('new-requests');
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleEventClick = (eventId: number) => {
    setSelectedEventId(eventId);
  };

  const handleBackToList = () => {
    setSelectedEventId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className={`
          fixed lg:relative z-50 lg:z-auto
          transform lg:transform-none transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          h-full lg:h-auto
        `}>
          <Sidebar 
            activeView={activeView} 
            onViewChange={setActiveView}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 p-4 lg:p-6">
          {selectedEventId ? (
            <EventDetails 
              eventId={selectedEventId} 
              onBack={handleBackToList}
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            />
          ) : (
            <>
              <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
              <EventTable onEventClick={handleEventClick} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;