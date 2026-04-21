"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getMockRouteLatLngs } from "@/main/features/run-track/lib/mockRoute";

const TILE_ATTRIB =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>';
const MIN_ZOOM = 9;
const MAX_ZOOM = 17;
const TILE_DARK =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_LIGHT =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

function getThemeTileUrl() {
  const mode = document.documentElement.dataset.theme;
  return mode === "light" ? TILE_LIGHT : TILE_DARK;
}

export function HomeFullscreenMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileRef = useRef<L.TileLayer | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [zoom, setZoom] = useState(13);

  const applyZoom = useCallback((next: number) => {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, next));
    setZoom(clamped);
    mapRef.current?.setZoom(clamped);
  }, []);

  const zoomFromClientY = useCallback((clientY: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    const next = Math.round(MAX_ZOOM - ratio * (MAX_ZOOM - MIN_ZOOM));
    applyZoom(next);
  }, [applyZoom]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const route = getMockRouteLatLngs();
    const map = L.map(el, {
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: false,
      touchZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      dragging: true,
    });
    mapRef.current = map;

    const tile = L.tileLayer(getThemeTileUrl(), {
      attribution: TILE_ATTRIB,
      maxZoom: 19,
    }).addTo(map);
    tileRef.current = tile;

    map.fitBounds(L.latLngBounds(route), {
      padding: [120, 120],
      maxZoom: 13,
    });
    setZoom(Math.round(map.getZoom()));

    map.on("zoomend", () => {
      setZoom(Math.round(map.getZoom()));
    });

    L.polyline(route, {
      color: "#dfff4f",
      weight: 4,
      opacity: 0.88,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(map);

    return () => {
      mapRef.current = null;
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

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      zoomFromClientY(e.clientY);
    };
    const endDrag = () => {
      draggingRef.current = false;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [zoomFromClientY]);

  const thumbTopPercent = useMemo(() => {
    return ((MAX_ZOOM - zoom) / (MAX_ZOOM - MIN_ZOOM)) * 100;
  }, [zoom]);

  return (
    <>
      <div
        ref={containerRef}
        className="home-fullscreen-map absolute inset-0 z-0 h-full w-full bg-run-bg"
        aria-hidden
      />
      <div className="home-map-zoom-rail pointer-events-auto">
        <button
          type="button"
          className="home-map-zoom-btn"
          onClick={() => applyZoom(zoom + 1)}
          aria-label="지도 확대"
        >
          +
        </button>
        <div
          ref={trackRef}
          className="home-map-zoom-track"
          role="slider"
          aria-label="지도 확대 축소"
          aria-valuemin={MIN_ZOOM}
          aria-valuemax={MAX_ZOOM}
          aria-valuenow={zoom}
          tabIndex={0}
          onPointerDown={(e) => {
            draggingRef.current = true;
            zoomFromClientY(e.clientY);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") applyZoom(zoom + 1);
            if (e.key === "ArrowDown") applyZoom(zoom - 1);
          }}
        >
          <span className="home-map-zoom-line" />
          <span
            className="home-map-zoom-thumb"
            style={{ top: `${thumbTopPercent}%` }}
            onPointerDown={(e) => {
              e.stopPropagation();
              draggingRef.current = true;
            }}
          />
        </div>
        <button
          type="button"
          className="home-map-zoom-btn"
          onClick={() => applyZoom(zoom - 1)}
          aria-label="지도 축소"
        >
          −
        </button>
      </div>
    </>
  );
}
