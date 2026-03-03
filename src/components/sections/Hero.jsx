import { useState, useRef, useCallback } from 'react';
import heroBg from "../../assets/img/background-1.png";
import heroVideo from "../../assets/img/messina.mp4";

const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Hero = () => {
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef(null);

    // Seamless loop: restart video slightly before it ends to avoid the stutter
    const handleTimeUpdate = useCallback(() => {
        const video = videoRef.current;
        if (video && video.duration && video.currentTime > video.duration - 0.3) {
            video.currentTime = 0;
            video.play();
        }
    }, []);

    return (
        <section id="inicio" className="hero">
            <div className="hero__bg">
                {/* Fallback image — same positioning as video, hidden once video plays */}
                {!videoReady && <img src={heroBg} alt="" />}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    src={heroVideo}
                    onPlaying={() => setVideoReady(true)}
                    onTimeUpdate={handleTimeUpdate}
                />
            </div>

            <div className="hero__content">
                <p className="hero__badge">+1000 clientes satisfechos</p>

                <h1 className="hero__title">
                    <span className="hero__title--orange">Soluciones<br />metálicas</span>
                    {' '}que<br />perduran en el<br />tiempo
                </h1>

                <p className="hero__subtitle">
                    Tres generaciones uniendo tradición y tecnología en el trabajo del hierro.<br />
                    Estructuras, maquinaria y oleohidráulica con precisión garantizada.
                </p>

                <div className="hero__actions">
                    <a style={{ textTransform: "none" }} href="https://wa.me/5492345689621" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                        Solicitar presupuesto <ArrowIcon />
                    </a>
                    <a href="#servicios" className="btn btn--outline">
                        Ver todos nuestros servicios
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
