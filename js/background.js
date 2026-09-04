/**
 * CYBER NETWORK PARTICLE CANVAS
 * Subtle defensive topology background mesh
 * Mohamed ElAzab Portfolio - Strict Technical Theme
 */

(function () {
  'use strict';

  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };
  let animationFrameId;

  // Particle configuration - subtle, calm, non-distracting
  const config = {
    particleCount: window.innerWidth < 768 ? 35 : 70,
    maxDistance: 130,
    nodeColor: 'rgba(34, 197, 94, 0.28)',
    alertNodeColor: 'rgba(56, 189, 248, 0.28)',
    edgeColor: 'rgba(148, 163, 184, 0.08)',
    activeEdgeColor: 'rgba(34, 197, 94, 0.16)',
    speed: 0.35
  };

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * config.speed;
      this.vy = (Math.random() - 0.5) * config.speed;
      this.radius = Math.random() * 1.5 + 1;
      this.isAlert = Math.random() < 0.15;
      this.baseRadius = this.radius;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off screen boundaries
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.8;
          this.y -= Math.sin(angle) * force * 1.8;
          this.radius = this.baseRadius * 1.4;
        } else {
          this.radius = this.baseRadius;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.isAlert ? config.alertNodeColor : config.nodeColor;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.maxDistance) {
          const alpha = 1 - dist / config.maxDistance;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);

          if (particles[i].isAlert || particles[j].isAlert) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.14})`;
          } else {
            ctx.strokeStyle = `rgba(34, 197, 94, ${alpha * 0.12})`;
          }

          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    drawConnections();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    config.particleCount = window.innerWidth < 768 ? 35 : 70;
    init();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Pause when page is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });

  init();
  animate();
})();
