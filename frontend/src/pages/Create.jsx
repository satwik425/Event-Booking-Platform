import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CalendarDays,
  MapPin,
  Users,
  IndianRupee,
  FileText,
  Type,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;
const InputField = ({ label, icon: Icon, type = "text", value, onChange, placeholder, min }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
      {label}
    </label>
    <div className="flex items-center gap-3 bg-[#1a1a1d] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-white/30 transition-all duration-200">
      <Icon size={18} className="text-gray-500 shrink-0" />
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        className="bg-transparent text-white placeholder-gray-600 text-sm w-full outline-none"
      />
    </div>
  </div>
);

const Create = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    totalSeats: "",
    price: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/event/create-event`, form, {
        withCredentials: true,
      });
      navigate("/Events");
    } catch (err) {
      console.log("Error creating event", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/Events")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6 text-sm"
          >
            <ArrowLeft size={16} />
            Back to Events
          </button>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Sparkles size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Create Event</h1>
              <p className="text-gray-400 mt-1">Fill in the details for your new event.</p>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-[#1a1a1d] border border-white/10 rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <InputField
              label="Event Title"
              icon={Type}
              value={form.title}
              onChange={handleChange("title")}
              placeholder="e.g. React Masterclass Workshop"
            />

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                Description
              </label>
              <div className="flex gap-3 bg-[#0f0f11] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-white/30 transition-all duration-200">
                <FileText size={18} className="text-gray-500 shrink-0 mt-0.5" />
                <textarea
                  value={form.description}
                  onChange={handleChange("description")}
                  placeholder="Describe your event..."
                  rows={4}
                  className="bg-transparent text-white placeholder-gray-600 text-sm w-full outline-none resize-none"
                />
              </div>
            </div>

            <InputField
              label="Date & Time"
              icon={CalendarDays}
              type="datetime-local"
              value={form.date}
              onChange={handleChange("date")}
            />

            <InputField
              label="Location"
              icon={MapPin}
              value={form.location}
              onChange={handleChange("location")}
              placeholder="e.g. Hyderabad Tech Park"
            />

            {/* SEATS & PRICE — side by side */}
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Total Seats"
                icon={Users}
                type="number"
                min="1"
                value={form.totalSeats}
                onChange={handleChange("totalSeats")}
                placeholder="100"
              />
              <InputField
                label="Price (₹)"
                icon={IndianRupee}
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange("price")}
                placeholder="999"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-2 w-full
                bg-white text-black
                font-semibold text-sm
                px-6 py-4 rounded-2xl
                hover:scale-[1.02] active:scale-[0.98]
                transition-all duration-200
                shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading ? "Creating..." : "Create Event"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
