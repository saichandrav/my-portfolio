import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      // smooth trailing
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x - 18}px, ${pos.current.y - 18}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    animate();

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-9999"
    >
      <div
        className="
          w-15 h-15 rounded-full
          bg-linear-to-r from-green-500 to-blue-500
          blur-xl opacity-80
        "
      />
    </div>
  );
};

export default CustomCursor;
