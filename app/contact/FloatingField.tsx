import React, { useEffect, useRef } from 'react'
import { countries } from '../assets/lib/countries';
import { FormData } from './ContactForm';
import gsap from "gsap";

type InputChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

type FloatingFieldProps = {
  id: keyof FormData;
  label: string;
  type: "text" | "email" | "tel" | "select";
  value: string;
  onChange: (e: InputChangeEvent) => void;
};


const FloatingField = ({
  id,
  label,
  type,
  value,
  onChange,
}: FloatingFieldProps) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  const floatUp = () => {
    if (!labelRef.current || !lineRef.current) return;

    gsap.to(labelRef.current, {
      y: -22,
      scale: 0.78,
      color: "#22d3ee",
      transformOrigin: "left center",
      duration: 0.35,
    });

    gsap.to(lineRef.current, {
      scaleX: 1,
      duration: 0.4,
    });
  };

  const floatDown = () => {
    if (!inputRef.current || inputRef.current.value) return;

    if (labelRef.current && lineRef.current) {
      gsap.to(labelRef.current, {
        y: 0,
        scale: 1,
        color: "#71717a",
        duration: 0.3,
      });

      gsap.to(lineRef.current, {
        scaleX: 0,
        duration: 0.3,
      });
    }
  };

  useEffect(() => {
    if (labelRef.current && lineRef.current) {
      gsap.set(labelRef.current, { y: 0, scale: 1 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    }
  }, []);

  if (type === "select") {
    return (
      <div className="relative pt-5">
        <label className="absolute top-0 left-0 text-xs text-gray-400">
          {/* {label} */}
        </label>

        <select
          ref={inputRef as React.RefObject<HTMLSelectElement>}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full border-b bg-transparent text-gray-400 pb-2 pt-2 text-sm outline-none"
        >
          {countries.map((country) => (
            <option key={country.code} value={country.dial_code}>
              {country.flag} {country.dial_code} ({country.code})
            </option>
          ))}
        </select>

        <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-cyan-400" />
      </div>
    );
  }

  return (
    <div className="relative pt-5">
      <label
        ref={labelRef}
        htmlFor={id}
        className="absolute top-5 left-0 text-sm text-gray-400 pointer-events-none"
      >
        {label}
      </label>

      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={floatUp}
        onBlur={floatDown}
        className="w-full border-0 border-b text-gray-400 outline-none pb-2 pt-1 text-sm bg-transparent"
      />

      <span
        ref={lineRef}
        className="absolute bottom-0 left-0 h-[1.5px] w-full bg-cyan-400"
      />
    </div>
  );
};

export default FloatingField