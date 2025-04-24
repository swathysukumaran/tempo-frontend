import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Mock submission logic:
    toast("Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            rows={4}
            required
          />
        </div>
        <Button type="submit" className="bg-primary text-white">
          Send Message
        </Button>
      </form>
    </div>
  );
}

export default Contact;
