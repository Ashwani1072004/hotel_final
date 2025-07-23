import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

// Ensure axios uses correct backend base URL
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
axios.defaults.baseURL = backendURL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [rooms, setRooms] = useState([]);

  // ✅ Fetch All Rooms
  const fetchRooms = async () => {
    try {
      console.log("👉 Fetching rooms from:", backendURL + "/api/rooms");
      const { data } = await axios.get("/api/rooms");

      if (data.success) {
        setRooms(data.rooms);
        console.log("✅ Rooms fetched:", data.rooms);
      } else {
        toast.error(data.message || "Failed to fetch rooms");
      }
    } catch (error) {
      toast.error("Error fetching rooms");
      console.error("❌ Axios error (rooms):", error);
    }
  };

  // ✅ Fetch Authenticated User Details
  const fetchUser = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setIsOwner(data.role === "hotelOwner");
        setSearchedCities(data.recentSearchedCities || []);
        console.log("✅ User data fetched");
      } else {
        console.warn("⚠️ Retrying fetchUser in 5s...");
        setTimeout(fetchUser, 5000);
      }
    } catch (error) {
      toast.error("Error fetching user");
      console.error("❌ Axios error (user):", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios,
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedCities,
    rooms,
    setRooms,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
