import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand:   { blue:'#1098D0', dark:'#0A6FA0', light:'#5BBCE4' },
        surface: { bg:'#F0F4F8', panel:'#FFFFFF', panel2:'#F4F7FB' },
        ink:     { DEFAULT:'#0F1C2E', mid:'#2D4A6B', muted:'#6B8AAA' },
        border:  { DEFAULT:'#D6E0EC', strong:'#B8CCDE' },
        status:  { ok:'#1A8F5A', warn:'#C07000', alarm:'#C8243A', info:'#1098D0' },
        rig:     { floater:'#0878A8', jackup:'#B86000', land:'#1A7A38' },
      },
      fontFamily: {
        sans: ['var(--font-barlow)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        cond: ['var(--font-barlow-condensed)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 2px 10px rgba(15,28,46,0.10)',
        panel: '0 1px 4px rgba(15,28,46,0.07)',
        float: '0 4px 24px rgba(15,28,46,0.13)',
      },
      keyframes: { blink: { '0%,100%': { opacity:'1' }, '50%': { opacity:'0.3' } } },
      animation: { blink: 'blink 1.4s ease-in-out infinite' },
    },
  },
  plugins: [],
}
export default config
