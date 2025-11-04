// src/contexts/CitiesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);

  // ✅ Fetch all cities on mount
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.from("cities").select("*");
        if (error) throw error;
        setCities(data || []);
      } catch (error) {
        console.error("Error loading cities:", error.message);
        alert("There was an error loading cities.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  // ✅ Get a single city by ID
  async function getCity(id) {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("cities")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setCurrentCity(data);
    } catch (error) {
      console.error("Error loading city:", error.message);
      alert("Could not load city details.");
    } finally {
      setIsLoading(false);
    }
  }

  // ✅ Create a new city (Supabase auto-generates the ID)
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      // No need to include `id` — Supabase will generate it
      const { data, error } = await supabase
        .from("cities")
        .insert([newCity])
        .select();

      if (error) throw error;
      setCities((prev) => [...prev, data[0]]);
    } catch (error) {
      console.error("Error creating city:", error.message);
      alert("Error creating city. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // ✅ Delete a city
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      const { error } = await supabase.from("cities").delete().eq("id", id);
      if (error) throw error;
      setCities((prev) => prev.filter((city) => city.id !== id));
    } catch (error) {
      console.error("Error deleting city:", error.message);
      alert("Error deleting city.");
    } finally {
      setIsLoading(false);
    }
  }

  // ✅ Helper to display flag images
  function getFlag(flag) {
    if (!flag) return null;

    const countryCode = Array.from(flag, (codeUnit) =>
      String.fromCharCode(codeUnit.codePointAt(0) - 127397)
    )
      .join("")
      .toLowerCase();

    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt="flag"
        width="24"
        height="18"
      />
    );
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        getFlag,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("useCities must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
