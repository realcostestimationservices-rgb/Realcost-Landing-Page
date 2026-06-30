import React, { useRef } from 'react';

const VideoPlayer = ({ videoSrc, posterText = 'Tutorial Video' }) => {
  const containerRef = useRef(null);

  const handlePosterClick = () => {
    const container = containerRef.current;
    if (!container) return;
    const src = container.getAttribute('data-src');
    if (!src) return;
    const iframe = document.createElement('iframe');
    iframe.src = src + (src.indexOf('?') > -1 ? '&' : '?') + 'rel=0&autoplay=1';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.position = 'absolute';
    iframe.style.inset = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.style.borderRadius = '12px';
    container.innerHTML = '';
    container.appendChild(iframe);
  };

  return (
    <div
      className="rc-video"
      data-src={videoSrc}
      ref={containerRef}
      style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E3E8F4', background: '#000' }}
    >
      <button
        className="rc-video-poster"
        type="button"
        onClick={handlePosterClick}
        style={{
          position: 'absolute',
          inset: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '0',
          background: 'none',
          padding: '0',
          cursor: 'pointer',
          color: 'inherit',
          zIndex: 2
        }}
      >
        <svg style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} viewBox="0 0 1280 720">
          <rect width="100%" height="100%" fill="#0f1724" />
          <text x="50%" y="50%" fill="#ffffff" fontSize="48" fontFamily="Arial" dominantBaseline="middle" textAnchor="middle">
            {posterText}
          </text>
        </svg>
        <div style={{ position: 'relative', zIndex: '2', width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,255,255,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(11,15,28,.28)' }}>
          <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 2L24 16L4 30V2Z" fill="#0B0F1C" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default VideoPlayer;
