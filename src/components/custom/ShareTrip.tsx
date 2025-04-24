import React, { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button"; // adjust path if needed
import { API_URL } from "@/config/api";
function ShareTrip({ tripId }: { tripId: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [permission, setPermission] = useState("view");
  const handleShare = async () => {
    if (!email.trim()) return;
    try {
      const res = await fetch(`${API_URL}/trips/${tripId}/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, permission }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to share trip");

      setStatus("Trip shared successfully!");
      setEmail("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatus(err.message);
      } else {
        setStatus("An unexpected error occurred");
      }
    }
  };
  return (
    <section className="max-w-4xl mx-auto px-6 ">
      <div className="bg-white rounded-xl  ">
        <h3 className="text-xl font-bold flex items-center mb-4 text-gray-800">
          <Share2 className="mr-2 text-primary hidden sm:inline" size={20} />
          Share this trip with a friend
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full sm:w-auto flex-1"
          />
          <select
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
          >
            <option value="view">View Only</option>
            <option value="edit">Allowed to Edit</option>
          </select>
          <Button
            onClick={handleShare}
            className="bg-primary text-white hover:bg-primary-dark"
          >
            Share
          </Button>
        </div>
        {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
      </div>
    </section>
  );
}

export default ShareTrip;
