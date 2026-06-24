import React, { useEffect, useRef } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  color: string;
  size: number;
}

export const ThreeDBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseRef.current.targetX = x * 0.05;
      mouseRef.current.targetY = y * 0.05;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Create 3D Nodes representing a network/globe structure
    const nodes: Node3D[] = [];
    const nodeCount = 50;
    const colors = [
      "rgba(16, 185, 129, 0.4)", // emerald
      "rgba(20, 184, 166, 0.4)", // teal
      "rgba(14, 165, 233, 0.4)", // sky blue
    ];

    for (let i = 0; i < nodeCount; i++) {
      // Distribute points spherically or randomly in a box
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 150 + Math.random() * 120; // sphere shell thickness

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      nodes.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        color: colors[i % colors.length],
        size: 1.5 + Math.random() * 2,
      });
    }

    // Camera settings
    const focalLength = 300;
    let angleY = 0.002; // slow constant rotation
    let angleX = 0.001;

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Add a small rotation based on mouse or constant
      const cosY = Math.cos(angleY + mouseRef.current.x * 0.001);
      const sinY = Math.sin(angleY + mouseRef.current.x * 0.001);
      const cosX = Math.cos(angleX + mouseRef.current.y * 0.001);
      const sinX = Math.sin(angleX + mouseRef.current.y * 0.001);

      // Project and draw lines
      const projected: { sx: number; sy: number; sz: number; depthScale: number; node: Node3D }[] = [];

      nodes.forEach((node) => {
        // Rotate around Y axis
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        // Rotate around X axis
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        // Store back updated 3D coords for next frame
        node.x = x1;
        node.y = y2;
        node.z = z2;

        // Shift depth so everything is in front of the camera
        const depth = z2 + 400;

        if (depth > 0) {
          const depthScale = focalLength / depth;
          const sx = x1 * depthScale + width / 2;
          const sy = y2 * depthScale + height / 2;

          projected.push({ sx, sy, sz: z2, depthScale, node });
        }
      });

      // Draw connection lines first (so they sit underneath nodes)
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          // Calculate 3D distance
          const dx = p1.node.x - p2.node.x;
          const dy = p1.node.y - p2.node.y;
          const dz = p1.node.z - p2.node.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Only draw lines for close-by nodes
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12 * (p1.depthScale * p2.depthScale);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projected.forEach((p) => {
        const radius = p.node.size * p.depthScale;
        if (radius > 0) {
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2);
          // Set opacity based on depth
          ctx.fillStyle = p.node.color;
          ctx.fill();

          // Highlight glow for front nodes
          if (p.sz < 0) {
            ctx.shadowColor = "rgba(16, 185, 129, 0.4)";
            ctx.shadowBlur = 4;
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-multiply"
      id="three-d-animated-canvas"
    />
  );
};
