import React from "react";

function SavedTrips() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-h2 font-bold text-gray-700">Your Trips</h2>
        <p className="text-body text-gray-600">Pick up where you left off</p>
      </div>

      {/* Trip Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Trip Cards */}
        {[1, 2, 3, 4, 5].map((trip) => (
          <div
            key={trip}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Card Image */}
            <div className="aspect-[3/2] relative">
              <img
                src={`/trip-${trip}.jpg`}
                alt="Trip"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-700">
                  7 Days
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5">
              <h3 className="font-medium text-gray-800 mb-1">
                Tokyo Adventure
              </h3>
              <p className="text-sm text-gray-500 mb-3">Nov 15 - Nov 22</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 rounded text-xs text-primary">
                  Culture
                </span>
                <span className="px-2 py-1 bg-secondary/10 rounded text-xs text-secondary">
                  Food
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Planning Progress</span>
                  <span>60%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-full w-[60%] bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedTrips;
