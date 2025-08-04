import React, { useState, useEffect } from 'react';
import './InfoModal.css';

const InfoModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Layihə haqqında</h2>
     <p>⚠️ Bu layihə mənim fullstack  layihəmdir.</p>
<p>⚠️ Backend Render-də host olunub. İlk yükləmədə məlumatların gəlməsi 20-30 saniyə çəkə bilər.</p>
<p>⚠️ Vizual dizayn tam hazır deyil, hələ üzərində işlənir.</p>
<p>⚠️ Bütün funksiyalar işləkdir, yoxlaya bilərsiniz!</p>

        <button onClick={handleClose}>Bağla</button>
      </div>
    </div>
  );
};

export default InfoModal;
