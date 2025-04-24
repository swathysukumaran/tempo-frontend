export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "🧍", // Single person emoji
    people: 1,
  },
  {
    id: 2,
    title: "Couple",
    desc: "Perfect for two travelers on a shared journey",
    icon: "👫", // Couple emoji
    people: 2,
  },
  {
    id: 3,
    title: "Family",
    desc: "For families enjoying an adventure together",
    icon: "👨‍👩‍👧‍👦", // Family emoji
    people: 4,
  },
  {
    id: 4,
    title: "Friends",
    desc: "A group of friends ready for fun",
    icon: "👯", // Friends emoji
    people: 5,
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Affordable",
    desc: "Great value for your money",
    icon: "💵", // Dollar bills emoji
  },

  {
    id: 2,
    title: "Premium",
    desc: "Luxury and comfort within reach",
    icon: "💳", // Credit card emoji
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Top-tier experiences and comfort",
    icon: "💎", // Gem emoji
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location: {location} for {totalDays} Days for {traveler} with a budget of {budget}, give me hotels options list with hotel name,hotel address,price,hotel image url,geo coordinates, rating,descriptions and suggest itinary with place name,place details, place image url,geo coordinates,ticket pricing,rating,time travel for each of the locations for 3 days with each day plan with best time to visit in json format";
