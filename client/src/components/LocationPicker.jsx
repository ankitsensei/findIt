import { useEffect, useRef, useState } from "react";
import { Search, Locate, MapPin } from "lucide-react";
import MapView from "./MapView";

const NOMINATIM_EMAIL = "";

const reverseGeocode = async (lat, lng) => {
  try {
    const emailParam = NOMINATIM_EMAIL ? `&email=${NOMINATIM_EMAIL}` : "";
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16${emailParam}`,
    );
    const data = await res.json();
    return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch {
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
};

const LocationPicker = ({ value, onChange }) => {
  const [query, setQuery] = useState(value?.location ?? "");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    setQuery(value?.location ?? "");
  }, [value?.location]);

  const hasCoords =
    value &&
    typeof value.latitude === "number" &&
    typeof value.longitude === "number" &&
    Number.isFinite(value.latitude) &&
    Number.isFinite(value.longitude);

  const handlePick = async ({ lat, lng }) => {
    const address = await reverseGeocode(lat, lng);
    setQuery(address);
    onChange({ location: address, latitude: lat, longitude: lng });
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const emailParam = NOMINATIM_EMAIL ? `&email=${NOMINATIM_EMAIL}` : "";
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5${emailParam}`,
        );
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectResult = (r) => {
    const lat = Number(r.lat);
    const lng = Number(r.lon);
    mapRef.current?.setView([lat, lng], 16);
    setResults([]);
    handlePick({ lat, lng });
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        mapRef.current?.setView([lat, lng], 16);
        await handlePick({ lat, lng });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true },
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            strokeWidth={2}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a place, e.g. Central Library"
            className="field pl-11 pr-4"
          />
          {searching && (
            <span className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-edge border-t-blue" />
          )}
        </div>
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={locating}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-edge bg-card px-3.5 py-2.5 text-sm font-medium text-body transition hover:bg-soft-surface hover:text-ink disabled:cursor-wait disabled:opacity-60 cursor-pointer"
        >
          <Locate size={16} strokeWidth={2} />
          {locating ? "Locating..." : "My location"}
        </button>
      </div>

      {results.length > 0 && (
        <ul className="overflow-hidden rounded-card border border-edge bg-card shadow-card">
          {results.map((r) => (
            <li key={r.place_id}>
              <button
                type="button"
                onClick={() => handleSelectResult(r)}
                className="flex w-full items-start gap-2 px-4 py-2.5 text-left text-sm text-body transition hover:bg-soft-surface cursor-pointer"
              >
                <MapPin
                  size={14}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-muted"
                />
                <span className="line-clamp-2">{r.display_name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <MapView
        pickerMode
        center={hasCoords ? [value.latitude, value.longitude] : undefined}
        zoom={hasCoords ? 15 : undefined}
        markers={
          hasCoords
            ? [
                {
                  lat: value.latitude,
                  lng: value.longitude,
                  title: value.location,
                },
              ]
            : []
        }
        onPick={handlePick}
        onMapReady={(map) => {
          mapRef.current = map;
        }}
        className="h-72 w-full rounded-lg border border-edge overflow-hidden z-0"
      />

      <p className="flex items-center gap-1.5 text-xs text-muted">
        <MapPin size={13} strokeWidth={2} className="text-blue" />
        {hasCoords
          ? `Pinned at ${value.latitude.toFixed(5)}, ${value.longitude.toFixed(5)} — click the map to move it`
          : "Click on the map or search for a place to pin the exact location"}
      </p>
    </div>
  );
};

export default LocationPicker;
