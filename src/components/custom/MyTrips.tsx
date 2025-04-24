import { useEffect, useState } from "react";
import { Wallet, MapPin, Globe } from "lucide-react";
import { API_URL } from "@/config/api";
interface Trip {
  _id: string;
  userId: string;
  tripDetails: {
    budget: "budget" | "moderate" | "luxury";
    location: {
      label?: string; // Making optional as it might be missing
      value?: string;
    };
    timeframe: string;
    preferences: string;
    transportation?: object; // Adding new field
  };
  generatedItinerary: {
    trip_name: string;
    destination: string;
    duration: string;
    travelers: string;
    cover_image_url?: string;
    hotels: {
      hotel_name: string;
      hotel_address: string;
      price: string;
      rating: number;
      description: string;
      hotel_image_url?: string;
    }[];
    itinerary: {
      [day: string]: {
        theme: string;
        best_time_to_visit: string;
        activities: {
          place_name: string;
          place_details: string;
          ticket_pricing: string;
          rating: number;
          travel_time: string;
          place_image_url: string | null; // Updated to allow null
        }[];
      };
    };
  };
  createdAt: string;
  __v: number;
}
function MyTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(`${API_URL}/trips`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch trips");
        const data = await response.json();

        setTrips(data.trips);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load trips");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);
  const handleCreateTrip = () => {
    window.location.href = "/create-trip-new";
  };
  const handleTripClick = (tripId: string) => {
    window.location.href = `/trip-details/${tripId}`;
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg p-6 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Trips
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!trips.length) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <Globe className="mx-auto text-primary mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Trips Found
          </h2>
          <p className="text-gray-600 mb-4">
            Start planning your next adventure!
          </p>
          <button
            onClick={handleCreateTrip}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Create New Trip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Trips</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div
              key={trip._id}
              onClick={() => handleTripClick(trip._id)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {trip.generatedItinerary?.trip_name}
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    {trip.tripDetails.location.label}
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Wallet size={16} className="mr-2" />
                    {trip.tripDetails.budget}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Created: {new Date(trip.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyTrips;
