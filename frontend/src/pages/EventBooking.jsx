import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  CalendarDays,
  MapPin,
  Users,
  IndianRupee,
  Ticket,
  ArrowLeft,
  Minus,
  Plus,
  CheckCircle2,
} from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;
const EventBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [seatsRequested, setSeatsRequested] = useState(1);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/event/getEventById/${id}`,
          { withCredentials: true }
        );
        setEvent(res.data.event);
      } catch (err) {
        console.log("Error fetching event", err);
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  const availableSeats = event ? event.totalSeats - event.bookedSeats : 0;

  const handleDecrement = () => {
    if (seatsRequested > 1) setSeatsRequested((s) => s - 1);
  };

  const handleIncrement = () => {
    if (seatsRequested < availableSeats) setSeatsRequested((s) => s + 1);
  };

  const handleBooking = async () => {
    setError("");
    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/api/booking/bookingEvent/${id}`,
        { seatsRequested },
        { withCredentials: true }
      );
      setBooked(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ── LOADING STATE ──
  if (fetching) {
    return (
      <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center">
        <div className="text-gray-400 text-sm animate-pulse">Loading event...</div>
      </div>
    );
  }

  // ── SUCCESS STATE ──
  if (booked) {
    return (
      <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <CheckCircle2 size={64} className="text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Booking Confirmed!</h1>
          <p className="text-gray-400 mb-2">
            You've booked <span className="text-white font-semibold">{seatsRequested} seat{seatsRequested > 1 ? "s" : ""}</span> for
          </p>
          <p className="text-white font-bold text-xl mb-8">{event?.title}</p>
          <button
            onClick={() => navigate("/Events")}
            className="bg-white text-black font-semibold px-8 py-3 rounded-2xl hover:scale-105 transition-all duration-200"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

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
              <Ticket size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Book Event</h1>
              <p className="text-gray-400 mt-1">Confirm your seat for this event.</p>
            </div>
          </div>
        </div>

        {/* EVENT DETAILS CARD */}
        <div className="bg-[#1a1a1d] border border-white/10 rounded-3xl overflow-hidden shadow-xl mb-6">

          {/* TOP BANNER */}
          <div className="h-36 bg-gradient-to-br from-gray-800 to-gray-900 relative">
            <div className="absolute top-4 right-4 bg-white text-black px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <IndianRupee size={14} />
              {event?.price}
            </div>
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2">
              <CalendarDays size={16} />
              <span className="text-sm">
                {new Date(event?.date).toLocaleDateString("en-IN", {
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* EVENT INFO */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{event?.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
              {event?.description}
            </p>

            <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
              <MapPin size={16} />
              {event?.location}
            </div>

            <div className="flex items-center gap-2 text-sm mb-1">
              <Users size={16} />
              <span className={availableSeats < 10 ? "text-red-400" : "text-gray-300"}>
                {availableSeats} seats available
              </span>
            </div>
          </div>
        </div>

        {/* BOOKING CARD */}
        <div className="bg-[#1a1a1d] border border-white/10 rounded-3xl p-8 shadow-xl">

          <h3 className="text-lg font-semibold mb-6">Select Seats</h3>

          {/* SEAT COUNTER */}
          <div className="flex items-center justify-between bg-[#0f0f11] border border-white/10 rounded-2xl px-6 py-4 mb-6">
            <span className="text-gray-400 text-sm">Number of Seats</span>
            <div className="flex items-center gap-4">
              <button
                onClick={handleDecrement}
                disabled={seatsRequested <= 1}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <Minus size={16} />
              </button>
              <span className="text-2xl font-bold w-6 text-center">{seatsRequested}</span>
              <button
                onClick={handleIncrement}
                disabled={seatsRequested >= availableSeats}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* PRICE BREAKDOWN */}
          <div className="bg-[#0f0f11] border border-white/10 rounded-2xl px-6 py-4 mb-6 flex flex-col gap-3">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Price per seat</span>
              <span className="flex items-center gap-1">
                <IndianRupee size={13} />
                {event?.price}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Seats</span>
              <span>× {seatsRequested}</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-white">
              <span>Total</span>
              <span className="flex items-center gap-1">
                <IndianRupee size={15} />
                {event?.price * seatsRequested}
              </span>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-2xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {/* BOOK BUTTON */}
          <button
            onClick={handleBooking}
            disabled={loading || availableSeats === 0}
            className="
              w-full
              bg-white text-black
              font-semibold text-sm
              px-6 py-4 rounded-2xl
              hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-200
              shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            "
          >
            <Ticket size={18} />
            {loading ? "Booking..." : availableSeats === 0 ? "Sold Out" : "Confirm Booking"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default EventBooking;