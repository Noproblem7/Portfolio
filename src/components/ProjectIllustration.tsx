import React, { useState, useEffect } from 'react';

interface IllustrationProps {
  type: string;
}

export default function ProjectIllustration({ type }: IllustrationProps) {
  const [active, setActive] = useState(false);
  const [sensorVal, setSensorVal] = useState(45);
  const [radarAngle, setRadarAngle] = useState(0);

  // Animation ticks for simulated real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => !prev);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let animationId: number;
    if (type === 'range_sensor') {
      const updateRadar = () => {
        setRadarAngle(prev => (prev + 2) % 360);
        setSensorVal(() => Math.floor(20 + Math.random() * 60));
        animationId = requestAnimationFrame(updateRadar);
      };
      animationId = requestAnimationFrame(updateRadar);
    }
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [type]);

  if (type === 'line_follower') {
    return (
      <div className="relative w-full h-48 bg-slate-950/80 rounded-xl overflow-hidden border border-slate-900 group flex items-center justify-center p-4">
        {/* Futuristic background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#0891b2_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        
        <svg className="w-full h-full max-w-[280px]" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          {/* Black Line Track */}
          <path 
            d="M 20,80 C 60,80 60,40 100,40 C 140,40 140,80 180,80" 
            fill="none" 
            stroke="#020617" 
            strokeWidth="12" 
            strokeLinecap="round" 
          />
          <path 
            d="M 20,80 C 60,80 60,40 100,40 C 140,40 140,80 180,80" 
            fill="none" 
            stroke="#22d3ee" 
            strokeWidth="2" 
            strokeDasharray="4 4"
            className="animate-[dash_2s_linear_infinite]" 
          />

          {/* Robot chassis representation outline */}
          <g transform={`translate(${active ? 102 : 98}, ${active ? 42 : 44}) scale(0.85)`}>
            {/* Robot Base */}
            <rect x="-35" y="-20" width="70" height="40" rx="8" fill="#0f172a" stroke="#0891b2" strokeWidth="2" />
            
            {/* Left Wheel */}
            <rect x="-25" y="-26" width="16" height="8" rx="2" fill="#020617" stroke="#06b6d4" strokeWidth="1.5" />
            {/* Right Wheel */}
            <rect x="-25" y="18" width="16" height="8" rx="2" fill="#020617" stroke="#06b6d4" strokeWidth="1.5" />

            {/* IR Sensors beams */}
            <line x1="28" y1="-10" x2="38" y2="-10" stroke={active ? "#22c55e" : "#ef4444"} strokeWidth="1.5" strokeDasharray="3 1" />
            <line x1="30" y1="0" x2="40" y2="0" stroke={active ? "#22c55e" : "#ef4444"} strokeWidth="1.5" strokeDasharray="3 1" />
            <line x1="28" y1="10" x2="38" y2="10" stroke={active ? "#22c55e" : "#ef4444"} strokeWidth="1.5" strokeDasharray="3 1" />

            {/* Microcontroller core on top representing Arduino */}
            <rect x="-10" y="-12" width="20" height="24" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="0" cy="0" r="4" fill="#10b981" className="animate-pulse" />
          </g>
        </svg>

        {/* HUD Data overlays */}
        <div className="absolute bottom-2 left-3 right-3 flex justify-between font-mono text-[9px] text-cyan-400/80">
          <span>SYS: OK</span>
          <span>PIDERR: ±{active ? '0.04' : '0.12'}</span>
          <span>SPEED: 85cm/s</span>
        </div>
      </div>
    );
  }

  if (type === 'irrigation') {
    return (
      <div className="relative w-full h-48 bg-slate-950/80 rounded-xl overflow-hidden border border-slate-900 group flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        
        <svg className="w-full h-full max-w-[280px]" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          {/* Soil Pot */}
          <rect x="75" y="85" width="50" height="30" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <line x1="75" y1="85" x2="125" y2="85" stroke="#10b981" strokeWidth="2" />

          {/* Plant Stem */}
          <path d="M 100,85 Q 95,65 100,45" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          
          {/* Leaves */}
          <path d="M 100,55 Q 115,50 112,65 Q 100,60 100,55" fill="#10b981" stroke="#047857" strokeWidth="1" />
          <path d="M 98,63 Q 80,68 85,78 Q 98,72 98,63" fill="#10b981" stroke="#047857" strokeWidth="1" />

          {/* Moisture sensor probe inserted into the soil */}
          <g transform="translate(115, 75)">
            <rect x="-3" y="0" width="6" height="20" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
            <line x1="-1" y1="4" x2="-1" y2="16" stroke="#f59e0b" strokeWidth="1" />
            <line x1="1" y1="4" x2="1" y2="16" stroke="#f59e0b" strokeWidth="1" />
            
            {/* Electrical connection wire */}
            <path d="M 0,0 Q 15,-15 15,-30" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
          </g>

          {/* Drop of Water Animation */}
          {active && (
            <path 
              d="M 100,20 Q 100,32 100,38" 
              fill="none" 
              stroke="#38bdf8" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              className="animate-bounce" 
            />
          )}

          {/* Water Pipe nozzle */}
          <rect x="92" y="5" width="16" height="12" rx="2" fill="#334155" stroke="#475569" strokeWidth="1.5" />
          <line x1="100" y1="17" x2="100" y2="20" stroke="#38bdf8" strokeWidth="2" />
        </svg>

        {/* HUD Data overlays */}
        <div className="absolute bottom-2 left-3 right-3 flex justify-between font-mono text-[9px] text-emerald-400/80">
          <span>HUMIDITY: {active ? '68%' : '32%'}</span>
          <span>VALVE: {active ? 'OPEN' : 'CLOSED'}</span>
          <span>IoT: ONLINE</span>
        </div>
      </div>
    );
  }

  if (type === 'range_sensor') {
    return (
      <div className="relative w-full h-48 bg-slate-950/80 rounded-xl overflow-hidden border border-slate-900 group flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(#0891b2_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        
        <svg className="w-full h-full max-w-[280px]" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          {/* Radar Scanning Line */}
          <circle cx="100" cy="110" r="90" fill="none" stroke="rgba(6, 182, 212, 0.05)" strokeWidth="1" />
          <circle cx="100" cy="110" r="60" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" />
          <circle cx="100" cy="110" r="30" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
          
          <line 
            x1="100" 
            y1="110" 
            x2={100 + 85 * Math.cos((radarAngle * Math.PI) / 180)} 
            y2={110 - 85 * Math.sin((radarAngle * Math.PI) / 180)} 
            stroke="rgba(6, 182, 212, 0.6)" 
            strokeWidth="1.5" 
          />

          {/* Distance Sensor Module (HC-SR04 Representation) */}
          <g transform="translate(100, 100)">
            <rect x="-24" y="-8" width="48" height="15" rx="3" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
            {/* Left emitter tube */}
            <circle cx="-13" cy="0" r="7" fill="#334155" stroke="#818cf8" strokeWidth="1.5" />
            <circle cx="-13" cy="0" r="4" fill="#000" />
            {/* Right receiver tube */}
            <circle cx="13" cy="0" r="7" fill="#334155" stroke="#818cf8" strokeWidth="1.5" />
            <circle cx="13" cy="0" r="4" fill="#000" />
            
            {/* Ultrasonic waves emitting representation */}
            <path d="M -13, -7 A 10,10 0 0,1 13,-7" fill="none" stroke="rgba(129, 140, 248, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
          </g>

          {/* Detected Obstacle */}
          <g transform="translate(130, 45)">
            <rect x="-10" y="-10" width="20" height="20" rx="4" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" className="animate-pulse" />
            <circle cx="0" cy="0" r="2" fill="#ef4444" />
          </g>

          {/* Target lock visualizer */}
          <line x1="115" y1="45" x2="145" y2="45" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="130" y1="30" x2="130" y2="60" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
        </svg>

        {/* HUD Data overlays */}
        <div className="absolute bottom-2 left-3 right-3 flex justify-between font-mono text-[9px] text-cyan-400">
          <span>TARGET: LOCK</span>
          <span>DIST: {sensorVal} mm</span>
          <span>FREQ: 40 kHz</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-48 bg-slate-950/80 rounded-xl flex items-center justify-center border border-slate-900">
      <div className="w-12 h-12 rounded-full border border-dashed border-cyan-500 animate-spin"></div>
    </div>
  );
}
