import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CalendarDays,
  MapPin,
  Users,
  IndianRupee,
  Pencil,
  Trash2,
  Ticket,
  Plus,
} from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;
import GetCurrentUserRole from "../auth/GetCurrentUserRole";

const Events = () => {
  const [events, setEvents] = useState([]);
 const [currentUser, setCurrentUser] = useState({
  userId: "",
  name: "",
  role: ""
});


  const navigate = useNavigate();

  
 useEffect(() => {
  const user = GetCurrentUserRole();
  if (user) setCurrentUser(user);  // ✅ only set if not null
}, []);

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/event/getAllEvent`,
          {
            withCredentials: true
          }
        );

        setEvents(res.data.events);
      } catch (err) {
        console.log("Error fetching events", err);
      }
    };

    fetchEvents();
  }, []);

 
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/event/delete-event/${id}`,
        {
          withCredentials: true,
        }
      );

      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      console.log("Error deleting event", err);
    }
  };

 
  const updateEvent = (id) => {
    navigate(`/event/${id}/edit`);
  };


  const createEvent = () => {
    navigate("/createEvent");
  };

 
  const bookEvent = (id) => {
    navigate(`/event/${id}/booking`);
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white px-6 py-10">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Explore Events
          </h1>

          <p className="text-gray-400 mt-2">
            Discover concerts, tech meetups, workshops and more.
          </p>
        </div>

        {/* ADMIN CREATE BUTTON */}
        {currentUser.role === "admin" && (
          <button
            onClick={createEvent}
            className="
              flex items-center gap-2
              bg-white text-black
              px-5 py-3 rounded-2xl
              font-semibold
              hover:scale-105
              transition-all duration-200
              shadow-lg
            "
          >
            <Plus size={18} />
            Create Event
          </button>
        )}
      </div>

      {/* EVENTS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        
        {events.map((event) => {
          const availableSeats =
            event.totalSeats - event.bookedSeats;

              

          return (
            <div
              key={event._id}
              className="
                bg-[#1a1a1d]
                border border-white/10
                rounded-3xl
                overflow-hidden
                hover:translate-y-[-5px]
                transition-all duration-300
                shadow-xl
              "
            >
              {/* TOP SECTION */}
              <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                
                {/* PRICE BADGE */}
                <div className="absolute top-4 right-4 bg-white text-black px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <IndianRupee size={14} />
                  {event.price}
                </div>

                {/* DATE */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2">
                  <CalendarDays size={16} />
                  <span className="text-sm">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                
                {/* TITLE */}
                <h2 className="text-2xl font-bold mb-3">
                  {event.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
                  {event.description}
                </p>

                {/* LOCATION */}
                <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
                  <MapPin size={16} />
                  {event.location}
                </div>

                {/* SEATS */}
                <div className="flex items-center gap-2 text-gray-300 text-sm mb-6">
                  <Users size={16} />
                  {availableSeats} seats available
                </div>

                {/* BUTTONS */}
                <div className="flex items-center gap-3">
                  
                  {/* ADMIN BUTTONS */}
                  {currentUser.role === "admin" && currentUser.userId===event.createdBy ? (
                    <>
                      <button
                        onClick={() => updateEvent(event._id)}
                        className="
                          flex-1 flex items-center justify-center gap-2
                          bg-blue-500 hover:bg-blue-600
                          px-4 py-3 rounded-xl
                          transition
                        "
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(event._id)}
                        className="
                          flex-1 flex items-center justify-center gap-2
                          bg-red-500 hover:bg-red-600
                          px-4 py-3 rounded-xl
                          transition
                        "
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      {/* NORMAL USER */}
                      <button
                        onClick={() => bookEvent(event._id)}
                        className="
                          w-full flex items-center justify-center gap-2
                          bg-white text-black
                          font-semibold
                          px-4 py-3 rounded-xl
                          hover:bg-gray-200
                          transition
                        "
                      >
                        <Ticket size={18} />
                        Book Now
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {events.length === 0 && (
        <div className="text-center mt-24">
          <h2 className="text-3xl font-bold mb-3">
            No Events Found
          </h2>

          <p className="text-gray-400">
            New events will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Events;
