import { useEffect, useState } from "react";
import "./App.css";
import Weather from "./weather/Weather";

interface Location { lat: number; lon: number };
function App() {
  const [location, setLocation] = useState<Location | undefined>(undefined);

  async function fetchLocation() {
    const response = await fetch("/api/location");
    if (!response.ok) {
      throw new Error("Failed to fetch location");
    }
    setLocation(await response.json());
  }

  useEffect(() => {
    fetchLocation()
  }, []);

  if (!location) {
    return <div>Loading...</div>;
  }

  // console.log("Location:", location);

  return (
    <Weather lat={location.lat} lon={location.lon} />
  );
}



export default App;
