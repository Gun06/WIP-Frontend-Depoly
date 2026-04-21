"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getMockRouteLatLngs } from "../lib/mockRoute";

const TILE_ATTRIB =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>';
const TILE_DARK =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_LIGHT =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

function getThemeTileUrl() {
  const mode = document.documentElement.dataset.theme;
  return mode === "light" ? TILE_LIGHT : TILE_DARK;
}

export function RunMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tileRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const route = getMockRouteLatLngs();
    const map = L.map(el, {
      zoomControl: false,
      attributionControl: true,
    });

    const tile = L.tileLayer(getThemeTileUrl(), {
      attribution: TILE_ATTRIB,
      maxZoom: 19,
    }).addTo(map);
    tileRef.current = tile;

    map.fitBounds(L.latLngBounds(route), { padding: [48, 48] });

    L.polyline(route, {
      color: "#dfff4f",
      weight: 5,
      opacity: 0.95,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(map);

    return () => {
      tileRef.current = null;
      map.remove();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      const tile = tileRef.current;
      if (!tile) return;
      tile.setUrl(getThemeTileUrl());
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 min-h-[100dvh] w-full"
      aria-label="러닝 코스 지도"
    />
  );
}
