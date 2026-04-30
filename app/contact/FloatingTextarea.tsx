import { useRef, useEffect } from "react";
import gsap from "gsap";

type FloatingTextareaProps = {
  value: string;
  onChange: (e: TextareaChangeEvent) => void;
};

type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

const FloatingTextarea = ({ value, onChange }: FloatingTextareaProps) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  const floatUp = () => {
    if (!labelRef.current || !lineRef.current) return;

    gsap.to(labelRef.current, { y: -22, scale: 1, color: "#00FFFF" });
    gsap.to(lineRef.current, { scaleX: 1});
  };

  const floatDown = () => {
    if (!textareaRef.current || textareaRef.current.value) return;

    if (labelRef.current && lineRef.current) {
      gsap.to(labelRef.current, { y: 0, scale: 1, color: "#71717a" });
      gsap.to(lineRef.current, { scaleX: 0 });
    }
  };

  useEffect(() => {
    if (labelRef.current && lineRef.current) {
      gsap.set(labelRef.current, { y: 0, scale: 1 });
      gsap.set(lineRef.current, { scaleX: 0, y: -6.5  });
    }
  }, []);

  return (
    <div className="relative pt-5">
      <label
        ref={labelRef}
        className="absolute top-5 left-0 text-sm text-gray-400"
      >
        Your message
      </label>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        rows={3}
        onFocus={floatUp}
        onBlur={floatDown}
        className="w-full border-b outline-none pb-2 pt-1 text-sm bg-transparent text-gray-400 resize-none"
      />

      <span
        ref={lineRef}
        className="absolute left-0 bottom-0 h-[1.5px] w-full bg-cyan-400"
      />
    </div>
  );
};


export default FloatingTextarea