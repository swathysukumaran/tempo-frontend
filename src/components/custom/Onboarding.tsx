import React, { useEffect, useState } from "react";
import {
  Heart,
  Compass,
  Plane,
  Camera,
  TreePine,
  Music,
  Utensils,
  Clock,
  Moon,
  Sun,
  AlertCircle,
  Coffee,
} from "lucide-react";
import { Card } from "../ui/card";
import { API_URL } from "@/config/api";
import { useNavigate } from "react-router-dom";
function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    pace: "",
    activities: [] as string[],
    startTime: "",
    avoidances: [] as string[],
  });
  const steps = [
    {
      title: "How do you like to travel?",
      description: "Choose your preferred travel pace",
      field: "pace",
      options: [
        {
          id: "relaxed",
          label: "Take it Easy",
          icon: Heart,
          description: "Relaxed pace, plenty of free time",
        },
        {
          id: "balanced",
          label: "Balanced Mix",
          icon: Compass,
          description: "Mix of activities and downtime",
        },
        {
          id: "intense",
          label: "Adventure Packed",
          icon: Plane,
          description: "Full schedule, maximum experiences",
        },
      ],
    },
    {
      title: "What excites you most?",
      description: "Select activities you enjoy (choose multiple)",
      field: "activities",
      multiple: true,
      options: [
        {
          id: "culture",
          label: "Cultural",
          icon: Camera,
          description: "Museums, historical sites",
        },
        {
          id: "nature",
          label: "Nature",
          icon: TreePine,
          description: "Hiking, landscapes, outdoors",
        },
        {
          id: "entertainment",
          label: "Entertainment",
          icon: Music,
          description: "Shows, concerts, nightlife",
        },
        {
          id: "food",
          label: "Food",
          icon: Utensils,
          description: "Local cuisine, food tours",
        },
      ],
    },
    {
      title: "When do you start your day?",
      description: "Choose your preferred start time",
      field: "startTime",
      options: [
        {
          id: "early",
          label: "Early Bird",
          icon: Sun,
          description: "Start before 7 AM",
        },
        {
          id: "mid",
          label: "Mid Morning",
          icon: Coffee,
          description: "Start between 7-9 AM",
        },
        {
          id: "late",
          label: "Late Starter",
          icon: Moon,
          description: "Start after 9 AM",
        },
      ],
    },

    {
      title: "Any preferences to avoid?",
      description: "Select what you'd prefer to avoid (choose multiple)",
      field: "avoidances",
      multiple: true,
      options: [
        {
          id: "crowds",
          label: "Crowds",
          icon: AlertCircle,
          description: "Busy tourist spots",
        },
        {
          id: "early",
          label: "Early Mornings",
          icon: Sun,
          description: "Early morning activities",
        },
        {
          id: "night",
          label: "Late Nights",
          icon: Moon,
          description: "Late night activities",
        },
        {
          id: "walking",
          label: "Long Walks",
          icon: Clock,
          description: "Extended walking tours",
        },
      ],
    },
  ];
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await fetch(`${API_URL}/onboarding/status`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        console.log("Loaded progress:", data);
        if (data?.temporaryPreferences) {
          setPreferences(data.temporaryPreferences);
          if (data.currentStep) {
            setStep(data.currentStep);
          }
        }
      } catch (error) {
        console.error("Error loading progress:", error);
      }
    };

    loadProgress();
  }, []);

  const currentStep = steps[step];

  const handleSelect = async (value: string) => {
    if (currentStep.multiple) {
      // Handle multiple selection for activities
      const newPreferences = {
        ...preferences,
        [currentStep.field]: (
          preferences[currentStep.field as keyof typeof preferences] as string[]
        ).includes(value)
          ? (
              preferences[
                currentStep.field as keyof typeof preferences
              ] as string[]
            ).filter((item: string) => item !== value)
          : [
              ...(preferences[
                currentStep.field as keyof typeof preferences
              ] as string[]),
              value,
            ],
      };
      setPreferences(newPreferences);

      await saveProgress(newPreferences, step);
    } else {
      const newPreferences = {
        ...preferences,
        [currentStep.field]: value,
      };
      setPreferences(newPreferences);

      // Save progress and advance for single selection
      await saveProgress(newPreferences, step);
      // Auto advance for single selection
      if (step < steps.length - 1) {
        setStep((prev) => prev + 1);
      }
    }
  };

  const handleNext = async () => {
    if (step < steps.length - 1) {
      await saveProgress(preferences, step);
      setStep((prev) => prev + 1);
    } else {
      await saveProgress(preferences, step);
      // Handle completion
      console.log("Completed:", preferences);
      navigate("/home");
    }
  };
  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  // Add save progress function
  const saveProgress = async (
    newPreferences: typeof preferences,
    currentStep: number
  ) => {
    try {
      await fetch(`${API_URL}/onboarding/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          preferences: newPreferences,
          completedSteps: [currentStep],
          status:
            currentStep === steps.length - 1 ? "completed" : "in_progress",
        }),
      });
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-h2 font-bold text-gray-700 mb-2">
            Let's personalize your experience
          </h1>
          <p className="text-body text-gray-600">
            Step {step + 1} of {steps.length}
          </p>
        </div>
        <div className="mb-8">
          <div className="flex justify-between relative mb-4">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-1">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Step Indicators */}
            {steps.map((_, index) => (
              <div key={index} className="flex flex-col items-center z-10">
                <div
                  className={`
                w-10 h-10 rounded-full flex items-center justify-center 
                transition-all duration-300 transform
                ${
                  index <= step
                    ? "bg-primary text-white scale-110"
                    : "bg-gray-200 text-gray-500"
                }
              `}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Card className="w-full bg-white shadow-lg relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-h2 font-bold text-gray-700 mb-2 flex items-center">
                <span className="p-2 bg-primary/10 rounded-lg mr-3">
                  {(() => {
                    const StepIcon = currentStep.options[0].icon;
                    return <StepIcon className="w-6 h-6 text-primary" />;
                  })()}
                </span>
                {currentStep.title}
              </h2>
              <p className="text-body text-gray-600 ml-12">
                {currentStep.description}
              </p>
            </div>
            <div className="grid gap-4">
              {currentStep.options.map((option) => {
                const Icon = option.icon;
                const isSelected = currentStep.multiple
                  ? (
                      preferences[
                        currentStep.field as keyof typeof preferences
                      ] as string[]
                    ).includes(option.id)
                  : (preferences[
                      currentStep.field as keyof typeof preferences
                    ] as string) === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      handleSelect(option.id);
                    }}
                    className={`
                    w-full p-6 rounded-xl border-2 transition-all duration-300
                    hover:shadow-lg transform hover:-translate-y-0.5
                    ${
                      isSelected
                        ? "border-primary bg-primary-light/10"
                        : "border-gray-100 hover:border-primary-light"
                    }
                  `}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`
                      p-3 rounded-lg 
                      ${
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-500 group-hover:bg-primary-light/20"
                      }
                    `}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <div
                          className={`
                        font-medium mb-1 transition-colors
                        ${isSelected ? "text-primary" : "text-gray-700"}
                      `}
                        >
                          {option.label}
                        </div>
                        <div className="text-small text-gray-500">
                          {option.description}
                        </div>
                      </div>
                      <div
                        className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      transition-all duration-300
                      ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-gray-300"
                      }
                    `}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Only show Next button for multiple selection */}

            <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-100">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className={`
                px-6 py-2 rounded-lg transition-all duration-300
                  flex items-center gap-2
                ${
                  step === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }
              `}
              >
                ← Back
              </button>
              {(currentStep.multiple || step === steps.length - 1) && (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-secondary hover:bg-secondary-dark 
                           text-white rounded-lg transition-all duration-300
                           hover:shadow-lg transform hover:-translate-y-0.5
                           flex items-center gap-2"
                >
                  {step === steps.length - 1
                    ? "Complete Setup →"
                    : "Continue →"}
                </button>
              )}
            </div>
          </div>
        </Card>
        <p className="text-center text-small text-gray-500 mt-4">
          Your preferences help us create the perfect travel experience for you
        </p>
      </div>
    </div>
  );
}

export default Onboarding;
