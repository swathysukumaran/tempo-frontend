import React, { useCallback, useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import { SelectBudgetOptions, SelectTravelersList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { API_URL } from "@/config/api";
import { useNavigate } from "react-router-dom";

type Option = {
  label: string;
  value: string;
  description?: string;
};
type FormData = {
  [key: string]: string | number | boolean | Option;
};
type Preferences = {
  pace: string;
  activities: string[];
  startTime: string;
  avoidances: string[];
};
function CreateTrip() {
  const [place, setPlace] = useState<Option | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [savedPreferences, setSavedPreferences] = useState<Preferences>({
    pace: "",
    activities: [],
    startTime: "",
    avoidances: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const loadPreferences = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/preferences`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setSavedPreferences(data.preferences);
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
      toast("Failed to load preferences");
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);
  const PreferencesSection = () => {
    if (isLoading)
      return (
        <div className="border rounded-lg p-4 mb-6 animate-pulse bg-gray-50">
          <div className="flex items-center justify-center">
            Loading preferences...
          </div>
        </div>
      );

    return (
      <div className="border rounded-lg p-4 mb-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
          <h3 className="font-medium">Your Travel Preferences</h3>
          <Button
            variant="ghost"
            className="text-blue-600"
            onClick={async () => {
              navigate("/onboarding");
              // Force a refresh when coming back
              const handleFocus = () => {
                loadPreferences();
                window.removeEventListener("focus", handleFocus);
              };
              window.addEventListener("focus", handleFocus);
            }}
          >
            Update Preferences
          </Button>
        </div>

        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div>
            🚶‍♂️ Pace:{" "}
            <span className="font-medium capitalize">
              {savedPreferences.pace}
            </span>
          </div>

          <div>
            🌅 Start Time:{" "}
            <span className="font-medium capitalize">
              {savedPreferences.startTime}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const handleInputChange = (
    name: string,
    value: string | number | boolean
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const onGenerateTrip = async () => {
    if (
      Number(formData?.noOfDays) > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all details");
      return;
    }
    const tripData = {
      location: formData.location,
      noOfDays: formData.noOfDays,
      budget: formData.budget,
      traveler: formData.traveler,
    };
    console.log(tripData);
    try {
      const response = await fetch(`${API_URL}/ai/create-trip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(tripData),
      });
      if (!response.ok) throw new Error("Failed to generate trip");
      const trip = await response.json();
      console.log(trip);
      navigate(`/trip-details/${trip.tripId}`);
    } catch (error) {
      toast("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>

          <GooglePlacesAutocomplete
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v as Option);
                handleInputChange("location", v ? v.value : "");
              },
              placeholder: "Search for a destination...",
              styles: {
                control: (provided) => ({
                  ...provided,
                  padding: "2px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }),
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"EX.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData.budget === item.title ? "shadow-lg border-black" : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border curosor-pointer rounded-lg hover:shadow-lg $(formData.traveler === item.people &&'shadow-lg border-black')`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 ">
        <PreferencesSection />
        <div className="justify-end flex">
          <Button onClick={onGenerateTrip}>Generate Trip</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
