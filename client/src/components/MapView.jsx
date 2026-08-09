import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIconRetinaUrl,
  shadowUrl: markerShadowUrl,
});

const DEFAULT_CENTER = [20.5937, 78.9629];
const DEFAULT_ZOOM = 5;

const MapView = ({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markers = [],
  pickerMode = false,
  onPick,
  className = "h-80 w-full",
  onMapReady,
}) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerLayerRef = useRef(null);
  const onPickRef = useRef(onPick);

  useEffect(() => {
    onPickRef.current = onPick;
  }, [onPick]);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    if (pickerMode) {
      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        map.setView([lat, lng], Math.max(map.getZoom(), 15));
        if (onPickRef.current) onPickRef.current({ lat, lng });
      });
    }

    mapRef.current = map;
    markerLayerRef.current = L.layerGroup().addTo(map);

    requestAnimationFrame(() => {
      map.invalidateSize();
    });

    if (onMapReady) onMapReady(map);

    return () => {
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const layer = markerLayerRef.current;
    layer.clearLayers();

    if (markers.length === 0) return;

    const validMarkers = markers.filter(
      (m) =>
        m &&
        typeof m.lat === "number" &&
        typeof m.lng === "number" &&
        Number.isFinite(m.lat) &&
        Number.isFinite(m.lng),
    );

    if (validMarkers.length === 0) return;

    validMarkers.forEach((m) => {
      const marker = L.marker([m.lat, m.lng]);
      if (m.title) marker.bindPopup(`<strong>${m.title}</strong>`);
      if (m.popupHtml) marker.bindPopup(m.popupHtml);
      layer.addLayer(marker);
    });

    const bounds = L.latLngBounds(validMarkers.map((m) => [m.lat, m.lng]));
    if (validMarkers.length === 1) {
      map.setView([validMarkers[0].lat, validMarkers[0].lng], 15);
    } else {
      map.fitBounds(bounds, { padding: [32, 32], maxZoom: 15 });
    }
  }, [markers]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.invalidateSize();
  }, [className]);

  return <div ref={containerRef} className={className} />;
};

export default MapView;
