import React, { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.codewithsas.solarvast&pcampaignid=web_share'

const APP_STORE_URL = 'https://apps.apple.com/sb/app/solarvast/id6756503498'

const QR_OPTIONS = {
  width: 200,
  margin: 2,
  color: {
    dark: '#1a1a2e',
    light: '#ffffff',
  },
}

function QrItem({ url, label, icon, buttonLabel, buttonClass }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, QR_OPTIONS, (err) => {
        if (err) console.error(err)
      })
    }
  }, [url])

  return (
    <div
      className="card shadow-sm border-0 p-4 text-center"
      style={{ width: 260 }}
    >
      <h6 className="mb-1 fw-semibold">Download SolarVast</h6>
      <p className="text-muted small mb-3">{label}</p>

      <div className="d-flex justify-content-center mb-3">
        <canvas ref={canvasRef} style={{ borderRadius: 10 }} />
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn-sm d-flex align-items-center justify-content-center gap-2 ${buttonClass}`}
      >
        {icon}
        {buttonLabel}
      </a>
    </div>
  )
}

const AndroidIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.18 23.76a2 2 0 0 0 2.76.74l12.44-7.18-2.88-2.88-12.32 9.32zM20.75 10.5l-3.13-1.8-3.22 3.22 3.22 3.22 3.16-1.83a2 2 0 0 0 0-2.81zM1.5 1.12A2 2 0 0 0 1 2.5v19a2 2 0 0 0 .5 1.38l.07.07 10.64-10.64v-.25L1.57 1.05l-.07.07zM15.38 7.12L2.94.74A2 2 0 0 0 .18.48l12.32 12.32 2.88-2.88z" />
  </svg>
)

const AppleIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
)

function Qrcode() {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-4 py-5">
      <QrItem
        url={PLAY_STORE_URL}
        label="Scan to open on Google Play"
        icon={AndroidIcon}
        buttonLabel="Google Play"
        buttonClass="btn-dark"
      />
      <QrItem
        url={APP_STORE_URL}
        label="Scan to open on App Store"
        icon={AppleIcon}
        buttonLabel="App Store"
        buttonClass="btn-secondary"
      />
    </div>
  )
}

export default Qrcode