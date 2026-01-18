import React from 'react'

const ParticlesBackground = () => {
    const canvasref = React.useRef(null);

    React.useEffect(() => {
        const canvas = canvasref.current;
        const ctx = canvas.getContext('2d');

        let particlesArray = [];
        const particleCount = 50;
        const colors = ["rgba(255,255,255,0.7)"];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedX = (Math.random() - 0.5) * 1;
                this.speedY = (Math.random() - 0.5) * 1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fill();
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
                if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

                this.draw();
            }
        }

        function CreateParticles() {
            particlesArray = [];
            for (let i = 0; i < particleCount; i++) {
                particlesArray.push(new Particle());
            }
        }

        function HandleResize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            CreateParticles();
        }

        HandleResize();
        window.addEventListener('resize', HandleResize);

        let animationId;
        function Animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(particle => particle.update());
            animationId = requestAnimationFrame(Animate);
        }

        Animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', HandleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasref}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        ></canvas>
    );
}

export default ParticlesBackground
