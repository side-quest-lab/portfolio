<script setup lang="ts">
import gsap from "gsap";
import Draggable from "gsap/Draggable";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: gsap.Context | undefined;
let animationId: number | undefined;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface Shape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  type: "circle" | "rect" | "triangle";
  color: string;
  floatOffset: number;
}

const particles = ref<Particle[]>([]);
const shapes = ref<Shape[]>([]);
const dragX = ref(0);
const dragY = ref(0);

const shapeColors = [
  "rgba(110, 2, 251, 0.15)",
  "rgba(110, 2, 251, 0.1)",
  "rgba(6, 182, 212, 0.1)",
  "rgba(6, 182, 212, 0.08)",
  "rgba(255, 255, 255, 0.05)",
];

function initShapes(width: number, height: number) {
  const types: Shape["type"][] = ["circle", "rect", "triangle"];
  shapes.value = Array.from({ length: 8 }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 20 + Math.random() * 60,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.01,
    opacity: 0.3 + Math.random() * 0.4,
    type: types[i % 3]!,
    color: shapeColors[i % shapeColors.length]!,
    floatOffset: Math.random() * Math.PI * 2,
  }));
}

function spawnParticle(x: number, y: number) {
  for (let i = 0; i < 2; i++) {
    particles.value.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 1,
      maxLife: 30 + Math.random() * 30,
      size: 2 + Math.random() * 4,
    });
  }
  if (particles.value.length > 60) {
    particles.value = particles.value.slice(-60);
  }
}

function drawShape(ctx2d: CanvasRenderingContext2D, shape: Shape, time: number) {
  ctx2d.save();
  const floatY = Math.sin(time * 0.001 + shape.floatOffset) * 15;
  ctx2d.translate(shape.x, shape.y + floatY);
  ctx2d.rotate(shape.rotation);
  ctx2d.globalAlpha = shape.opacity;

  ctx2d.fillStyle = shape.color;
  ctx2d.strokeStyle = shape.color.replace(/[\d.]+\)$/, "0.3)");
  ctx2d.lineWidth = 1;

  if (shape.type === "circle") {
    ctx2d.beginPath();
    ctx2d.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
    ctx2d.fill();
    ctx2d.stroke();
  } else if (shape.type === "rect") {
    const half = shape.size / 2;
    ctx2d.beginPath();
    ctx2d.roundRect(-half, -half, shape.size, shape.size, 8);
    ctx2d.fill();
    ctx2d.stroke();
  } else {
    const half = shape.size / 2;
    ctx2d.beginPath();
    ctx2d.moveTo(0, -half);
    ctx2d.lineTo(half, half);
    ctx2d.lineTo(-half, half);
    ctx2d.closePath();
    ctx2d.fill();
    ctx2d.stroke();
  }

  ctx2d.restore();
}

function drawCentralElement(ctx2d: CanvasRenderingContext2D, time: number) {
  const cx = canvasRef.value!.width / 2 + dragX.value;
  const cy = canvasRef.value!.height / 2 + dragY.value;

  ctx2d.save();
  ctx2d.translate(cx, cy);

  const glow = ctx2d.createRadialGradient(0, 0, 0, 0, 0, 80);
  glow.addColorStop(0, "rgba(110, 2, 251, 0.3)");
  glow.addColorStop(0.5, "rgba(110, 2, 251, 0.1)");
  glow.addColorStop(1, "rgba(110, 2, 251, 0)");
  ctx2d.fillStyle = glow;
  ctx2d.fillRect(-80, -80, 160, 160);

  const w = 50;
  const h = 80;
  const radius = 12;
  ctx2d.beginPath();
  ctx2d.roundRect(-w / 2, -h / 2, w, h, radius);
  ctx2d.fillStyle = "rgba(110, 2, 251, 0.2)";
  ctx2d.fill();
  ctx2d.strokeStyle = "rgba(110, 2, 251, 0.6)";
  ctx2d.lineWidth = 2;
  ctx2d.stroke();

  ctx2d.beginPath();
  ctx2d.roundRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8, radius - 2);
  ctx2d.strokeStyle = "rgba(110, 2, 251, 0.3)";
  ctx2d.lineWidth = 1;
  ctx2d.stroke();

  const pulseScale = 1 + Math.sin(time * 0.003) * 0.05;
  ctx2d.scale(pulseScale, pulseScale);

  ctx2d.restore();
}

function drawParticles(ctx2d: CanvasRenderingContext2D) {
  for (const p of particles.value) {
    ctx2d.save();
    ctx2d.globalAlpha = p.life * 0.8;
    ctx2d.fillStyle = "rgba(110, 2, 251, 0.6)";
    ctx2d.beginPath();
    ctx2d.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx2d.fill();
    ctx2d.restore();
  }
}

function updateParticles() {
  particles.value = particles.value
    .map((p) => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      life: p.life - 1 / p.maxLife,
    }))
    .filter((p) => p.life > 0);
}

function animate(time: number) {
  if (!canvasRef.value) return;
  const ctx2d = canvasRef.value.getContext("2d");
  if (!ctx2d) return;

  ctx2d.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  for (const shape of shapes.value) {
    shape.rotation += shape.rotSpeed;
    drawShape(ctx2d, shape, time);
  }

  drawCentralElement(ctx2d, time);
  drawParticles(ctx2d);
  updateParticles();

  if (Math.abs(dragX.value) > 0.1 || Math.abs(dragY.value) > 0.1) {
    spawnParticle(
      canvasRef.value.width / 2 + dragX.value,
      canvasRef.value.height / 2 + dragY.value,
    );
  }

  animationId = requestAnimationFrame(animate);
}

function resizeCanvas() {
  if (!canvasRef.value) return;
  const parent = canvasRef.value.parentElement;
  if (!parent) return;
  canvasRef.value.width = parent.clientWidth;
  canvasRef.value.height = parent.clientHeight;
  initShapes(canvasRef.value.width, canvasRef.value.height);
}

onMounted(() => {
  if (!canvasRef.value) return;
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  ctx = gsap.context(() => {
    const proxy = document.createElement("div");
    Draggable.create(proxy, {
      type: "x,y",
      onDrag() {
        dragX.value = (this as any).x * 0.3;
        dragY.value = (this as any).y * 0.3;
      },
      onDragEnd() {
        gsap.to(proxy, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        gsap.to(
          { valX: dragX.value, valY: dragY.value },
          {
            valX: 0,
            valY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
            onUpdate() {
              dragX.value = (this as any).targets()[0].valX;
              dragY.value = (this as any).targets()[0].valY;
            },
          },
        );
      },
    });
  });

  animationId = requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  ctx?.revert();
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener("resize", resizeCanvas);
});
</script>

<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
  />
</template>
