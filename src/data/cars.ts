// Car data for DriveEase Car Rental

export interface Car {
  id: number;
  name: string;
  originalPricePerDay: number;
  offerPricePerDay: number;
  seats: number;
  fuel: string;
  transmission: string;
  image: string;
  category: string;
}

export interface Provider {
  id: string;
  name: string;
  rating: number;
  ratingText: string;
  metrics: {
    condition: number;
    cleanliness: number;
    service: number;
    pickup: number;
  };
  fromPricePerDay: number;
}

export const cars: Car[] = [
  {
    id: 1,
    name: "Tesla Model 3",
    originalPricePerDay: 9500,
    offerPricePerDay: 7500,
    seats: 5,
    fuel: "Electric",
    transmission: "Auto",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400",
    category: "Electric"
  },
  {
    id: 2,
    name: "BMW 5 Series",
    originalPricePerDay: 12800,
    offerPricePerDay: 10200,
    seats: 5,
    fuel: "Petrol",
    transmission: "Auto",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
    category: "Luxury"
  },
  {
    id: 3,
    name: "Mercedes C-Class",
    originalPricePerDay: 11800,
    offerPricePerDay: 9400,
    seats: 5,
    fuel: "Diesel",
    transmission: "Auto",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400",
    category: "Luxury"
  },
  {
    id: 4,
    name: "Toyota Camry",
    originalPricePerDay: 7000,
    offerPricePerDay: 5500,
    seats: 5,
    fuel: "Hybrid",
    transmission: "Auto",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400",
    category: "Sedan"
  },
  {
    id: 5,
    name: "Ford Mustang",
    originalPricePerDay: 16000,
    offerPricePerDay: 12800,
    seats: 4,
    fuel: "Petrol",
    transmission: "Manual",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=400",
    category: "Sports"
  },
  {
    id: 6,
    name: "Jeep Wrangler",
    originalPricePerDay: 10200,
    offerPricePerDay: 8200,
    seats: 5,
    fuel: "Petrol",
    transmission: "Auto",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400",
    category: "SUV"
  },
  {
    id: 7,
    name: "Audi A4",
    originalPricePerDay: 11200,
    offerPricePerDay: 8900,
    seats: 5,
    fuel: "Petrol",
    transmission: "Auto",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400",
    category: "Luxury"
  },
  {
    id: 8,
    name: "Honda Civic",
    originalPricePerDay: 6000,
    offerPricePerDay: 4800,
    seats: 5,
    fuel: "Petrol",
    transmission: "Auto",
    image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=400",
    category: "Sedan"
  }
];

export const providers: Provider[] = [
  {
    id: 'driveease-rentals',
    name: 'DriveEase Rentals',
    rating: 4.8,
    ratingText: 'Excellent',
    metrics: {
      condition: 94,
      cleanliness: 92,
      service: 95,
      pickup: 90
    },
    fromPricePerDay: 3200
  },
  {
    id: 'cityride',
    name: 'CityRide',
    rating: 4.5,
    ratingText: 'Very good',
    metrics: {
      condition: 90,
      cleanliness: 88,
      service: 89,
      pickup: 87
    },
    fromPricePerDay: 2800
  },
  {
    id: 'urbancars',
    name: 'UrbanCars',
    rating: 4.3,
    ratingText: 'Very good',
    metrics: {
      condition: 88,
      cleanliness: 86,
      service: 84,
      pickup: 85
    },
    fromPricePerDay: 2500
  },
  {
    id: 'premiumdrive',
    name: 'PremiumDrive',
    rating: 4.9,
    ratingText: 'Outstanding',
    metrics: {
      condition: 97,
      cleanliness: 96,
      service: 96,
      pickup: 93
    },
    fromPricePerDay: 5200
  },
  {
    id: 'budgetwheels',
    name: 'BudgetWheels',
    rating: 4.1,
    ratingText: 'Good',
    metrics: {
      condition: 82,
      cleanliness: 80,
      service: 81,
      pickup: 79
    },
    fromPricePerDay: 1800
  }
];

export const faqData = [
  {
    question: "What documents are required for car rental?",
    answer: "You need a valid driving license (Indian or International), a government-issued ID proof (Aadhaar, PAN, or Passport), and a credit or debit card for the security deposit. All documents must be valid and in your name."
  },
  {
    question: "Is fuel included in the rental price?",
    answer: "No, fuel is not included. The car will be provided with a full tank, and you should return it with a full tank. If you return it with less fuel, refueling charges will apply at market rates."
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel your booking free of charge up to 48 hours before the pickup time. Cancellations made within 48 hours may be subject to a cancellation fee. Please check the terms at the time of booking."
  },
  {
    question: "Is the price all-inclusive?",
    answer: "The displayed price includes the rental charges, basic insurance, and taxes. Additional charges may apply for optional add-ons like GPS, child seats, or additional drivers. Fuel, tolls, and parking are not included."
  },
  {
    question: "What is the minimum age to rent a car?",
    answer: "The minimum age to rent a car is 21 years. Drivers between 21-24 years may be subject to a young driver surcharge. You must have held a valid driving license for at least one year."
  },
  {
    question: "Can I add an additional driver?",
    answer: "Yes, you can add an additional driver for a nominal daily fee. The additional driver must meet the same age and license requirements and must be present at the time of pickup with all required documents."
  }
];

export const formatINR = (amount: number): string => {
  return '₹' + Number(amount).toLocaleString('en-IN');
};
