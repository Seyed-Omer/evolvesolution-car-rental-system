import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Car data for the chatbot to reference
const cars = [
  { id: 1, name: "Tesla Model 3", offerPricePerDay: 7500, seats: 5, fuel: "Electric", transmission: "Auto", category: "Electric" },
  { id: 2, name: "BMW 5 Series", offerPricePerDay: 10200, seats: 5, fuel: "Petrol", transmission: "Auto", category: "Luxury" },
  { id: 3, name: "Mercedes C-Class", offerPricePerDay: 9400, seats: 5, fuel: "Diesel", transmission: "Auto", category: "Luxury" },
  { id: 4, name: "Toyota Camry", offerPricePerDay: 5500, seats: 5, fuel: "Hybrid", transmission: "Auto", category: "Sedan" },
  { id: 5, name: "Ford Mustang", offerPricePerDay: 12800, seats: 4, fuel: "Petrol", transmission: "Manual", category: "Sports" },
  { id: 6, name: "Jeep Wrangler", offerPricePerDay: 8200, seats: 5, fuel: "Petrol", transmission: "Auto", category: "SUV" },
  { id: 7, name: "Audi A4", offerPricePerDay: 8900, seats: 5, fuel: "Petrol", transmission: "Auto", category: "Luxury" },
  { id: 8, name: "Honda Civic", offerPricePerDay: 4800, seats: 5, fuel: "Petrol", transmission: "Auto", category: "Sedan" }
];

const formatINR = (amount: number): string => '₹' + amount.toLocaleString('en-IN');

const systemPrompt = `You are DriveEase's friendly and professional 24/7 AI customer support assistant. You help customers with car rental inquiries.

## Your Role:
- Answer questions about car availability, pricing, and features
- Help customers understand the booking process
- Answer frequently asked questions
- Provide general customer support

## Available Cars (All prices in INR per day):
${cars.map(car => `- ${car.name}: ${formatINR(car.offerPricePerDay)}/day | ${car.seats} seats | ${car.fuel} | ${car.transmission} | Category: ${car.category}`).join('\n')}

## Pricing & Policies:
- All prices shown are offer prices (discounted)
- Fuel is NOT included - cars are provided with full tank, return with full tank
- Free cancellation up to 48 hours before pickup
- Price includes: rental charges, basic insurance, taxes
- Additional charges for: GPS, child seats, additional drivers
- Minimum rental age: 21 years (young driver surcharge for 21-24)
- Required documents: Valid driving license, Government ID (Aadhaar/PAN/Passport), Credit/Debit card

## Pickup Locations:
- Downtown Office
- Airport Terminal
- City Mall
- Central Station

## Booking Process:
1. Browse our car selection on the Cars section
2. Click "Book Now" on your preferred car
3. Fill in your details (name, email, phone, license)
4. Select pickup and drop-off dates
5. Choose pickup location
6. Review pricing and confirm booking

## Guidelines:
- Keep responses friendly, helpful, and concise (2-3 sentences when possible)
- Use ₹ symbol for Indian Rupee prices
- If asked about something outside car rental, politely redirect to car rental topics
- If you don't know something specific, suggest contacting support at info@driveease.com or +1 (555) 123-4567
- Always be helpful and professional

Remember: You represent DriveEase - a premium car rental service committed to customer satisfaction!`;

serve(async (req) => {
  console.log("Chat function called with method:", req.method);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    console.log("Received messages:", JSON.stringify(messages).slice(0, 200));

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Calling Lovable AI Gateway...");
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    console.log("AI Gateway response status:", response.status);

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Streaming response back to client");
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
