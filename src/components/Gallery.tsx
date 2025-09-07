import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Parallax, Autoplay, Pagination, Keyboard, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/parallax";
import "swiper/css/pagination";

interface Slide {
  src: string;
  alt: string;
  title?: string;
  fact?: string;
  /** opcional: para alta resolución */
  srcSet?: string; // ej: "/img/01.webp 1920w, /img/01@2x.webp 3840w"
}

interface GalleryProps {
  slides: Slide[];
  delay?: number;
}

function Gallery({ slides, delay = 4500 }: GalleryProps) {
  return (
    <Swiper
      modules={[EffectFade, Parallax, Autoplay, Pagination, Keyboard, A11y]}
      effect="fade"
      loop
      parallax
      speed={900}
      autoplay={{ delay, disableOnInteraction: false }}
      keyboard={{ enabled: true }}
      a11y={{ enabled: true }}
      pagination={{ clickable: true }}
      className="w-screen h-screen"
      aria-label="Galería de arte"
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={slide.src}>
          {/* Full viewport para centrar el marco */}
          <div className="w-screen h-screen flex items-center justify-center bg-black">
            {/* Marco relativo para overlays; NO fija proporción → respeta tamaño natural */}
            <div
              className="relative rounded-2xl ring-1 ring-white/10 bg-black/40 p-2"
              style={{
                // Glow neón suave alrededor del marco
                boxShadow: "0 0 36px rgba(255,26,255,.22)",
              }}
              data-swiper-parallax="25%"
            >
              {/* Imagen: NO forzamos width/height → evita upscaling */}
              <img
                src={slide.src}
                srcSet={slide.srcSet}
                sizes="(min-width: 1280px) 1200px, 92vw"
                alt={slide.alt}
                className="block rounded-xl select-none"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                style={{
                  userSelect: "none",
                  backfaceVisibility: "hidden",
                  transform: "translateZ(0)",
                  // límites para no salirse del viewport ni perder nitidez
                  maxWidth: "min(92vw, 1200px)",
                  maxHeight: "80vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              {/* Badge de título (opcional) */}
              {slide.title && (
                <div className="absolute left-3 top-3 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/55 backdrop-blur ring-1 ring-white/15 text-neon-pink font-display text-sm shadow-[var(--shadow-neon-pink)]">
                    {slide.title}
                  </span>
                </div>
              )}

              {/* Panel de dato curioso (más alto, sin tapar demasiado) */}
              {slide.fact && (
                <div className="absolute left-0 right-0 z-10 px-3 sm:px-4 bottom-6">
                  <div
                    className="mx-auto max-w-[min(92vw,1200px)] bg-black/55 backdrop-blur ring-1 ring-white/10 rounded-xl px-4 py-3 text-white/95"
                    style={{ boxShadow: "0 0 20px rgba(0,234,255,.18)" }}
                  >
                    <p className="text-[0.95rem] sm:text-base leading-relaxed">{slide.fact}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dots */}
          <div className="swiper-pagination !bottom-4" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Gallery;
