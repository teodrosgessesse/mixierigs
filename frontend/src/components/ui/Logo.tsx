interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  dark?: boolean
  className?: string
}

const sizes = { sm: { w: 100, h: 28 }, md: { w: 140, h: 40 }, lg: { w: 200, h: 56 } }

export function HoloTwinLogo({ size = 'md', dark = false, className = '' }: LogoProps) {
  const { w, h } = sizes[size]
  const textColor = dark ? '#FFFFFF' : '#0F1C2E'
  const subColor  = dark ? '#60C8F0' : '#1098D0'
  const fs = size === 'sm' ? 12 : size === 'md' ? 16 : 22
  const sub = size === 'sm' ? 4.5 : size === 'md' ? 5.5 : 7.5
  const cx = h * 0.38   // crystal mark x extent
  const cy = h * 0.88   // crystal mark height
  const tx = cx + (size === 'sm' ? 6 : 8)  // text x start

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w} height={h}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="HoloTwin"
    >
      {/* Crystal facets */}
      <polygon points={`${cx*0.28},${cy} ${cx*0.75},${h*0.12} ${cx},${cy}`}            fill="#1098D0" opacity="0.25"/>
      <polygon points={`${cx*0.28},${cy} ${cx*0.75},${h*0.12} ${cx*0.85},${h*0.45}`}   fill="#1098D0" opacity="0.60"/>
      <polygon points={`${cx*0.75},${h*0.12} ${cx},${cy} ${cx*0.85},${h*0.45}`}        fill="#1098D0"/>
      <polygon points={`${cx*0.05},${cy*0.82} ${cx*0.75},${h*0.12} ${cx*0.28},${cy}`} fill="#1098D0" opacity="0.45"/>
      {/* Wordmark */}
      <text
        x={tx} y={h * 0.64}
        fontFamily="Barlow Condensed, Arial, sans-serif"
        fontSize={fs} fontWeight="300"
        fill={textColor} letterSpacing="-0.3"
      >
        {'Holo'}
        <tspan fontWeight="700">{'Twin'}</tspan>
      </text>
      {/* Sub-label */}
      <text
        x={tx} y={h * 0.88}
        fontFamily="Barlow Condensed, Arial, sans-serif"
        fontSize={sub} fontWeight="400"
        fill={subColor} letterSpacing="2"
      >
        {'OIL & GAS · LLC'}
      </text>
    </svg>
  )
}

export function HoloTwinMark({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 30" width={size} height={size * 1.25}
      xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <polygon points="6,26 13,4 20,26"          fill="#1098D0" opacity="0.25"/>
      <polygon points="6,26 13,4 16,14"           fill="#1098D0" opacity="0.60"/>
      <polygon points="13,4 20,26 16,14"          fill="#1098D0"/>
      <polygon points="3,20 13,4 6,26"            fill="#1098D0" opacity="0.45"/>
    </svg>
  )
}
