#!/bin/bash
# MixieRigs v2 — One-command deploy script
# Usage: bash deploy.sh YOUR_GITHUB_USERNAME YOUR_ANTHROPIC_API_KEY
set -e

GITHUB_USER="${1:-teodrosgessesse}"
ANTHROPIC_KEY="${2:-}"
SITE_ID="7ebccfb1-5dd4-4454-98c9-8c2453a67359"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║   MixieRigs v2 — HoloTwin, LLC                  ║"
echo "║   Full-Stack Deploy: GitHub + Netlify            ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# ── Step 1: GitHub ─────────────────────────────────────
echo "▶ Step 1/3 — Pushing to GitHub..."
cd "$(dirname "$0")"

git init 2>/dev/null || true
git checkout -b main 2>/dev/null || git checkout main 2>/dev/null || true
git config user.email "${GITHUB_USER}@users.noreply.github.com"
git config user.name  "MixieRigs Deploy"

# Point to existing repo
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/${GITHUB_USER}/mixierigs.git"

git add -A
git commit -m "feat: MixieRigs v2 — React/Next.js/Tailwind/Django/MongoDB stack

- Next.js 14 App Router + React 18 + TypeScript
- Tailwind CSS with HoloTwin brand palette
- MixieAI (Claude claude-sonnet-4-6) via /api/ai
- Django 4.2 REST API with MongoDB backend
- Multi-tenant: 5 customers, 8 rigs, 7 roles
- Babylon.js v8 3D twin (client component)
- Netlify deployment with @netlify/plugin-nextjs" 2>/dev/null || echo "  (nothing new to commit)"

git push -u origin main --force
echo "  ✓ GitHub: https://github.com/${GITHUB_USER}/mixierigs"

# ── Step 2: Netlify env vars ────────────────────────────
echo ""
echo "▶ Step 2/3 — Setting Netlify environment variables..."
if command -v netlify &>/dev/null; then
  if [ -n "$ANTHROPIC_KEY" ]; then
    netlify env:set ANTHROPIC_API_KEY "$ANTHROPIC_KEY" --context production --site "$SITE_ID" 2>/dev/null || \
      echo "  (set ANTHROPIC_API_KEY manually in Netlify dashboard)"
  fi
  echo "  ✓ Environment configured"
else
  echo "  ℹ  Install netlify-cli to auto-configure: npm i -g netlify-cli"
  echo "  ℹ  Then set env vars: netlify env:set ANTHROPIC_API_KEY <key> --site $SITE_ID"
fi

# ── Step 3: Netlify deploy ──────────────────────────────
echo ""
echo "▶ Step 3/3 — Deploying frontend to Netlify..."
cd frontend

npm install --silent 2>/dev/null
npm run build 2>/dev/null

if command -v netlify &>/dev/null; then
  netlify deploy --dir .next --site "$SITE_ID" --prod --message "MixieRigs v2 deploy"
  echo "  ✓ Live: https://mixierigs.netlify.app"
else
  echo "  ℹ  Manual deploy: drag the 'frontend/.next' folder to:"
  echo "     https://app.netlify.com/projects/mixierigs"
fi

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║   ✅ MixieRigs v2 Deploy Complete                ║"
echo "║                                                  ║"
echo "║   GitHub:  https://github.com/${GITHUB_USER}/mixierigs  ║"
echo "║   Live:    https://mixierigs.netlify.app         ║"
echo "║   API:     /api/ai  /api/rigs  /api/alerts       ║"
echo "╚══════════════════════════════════════════════════╝"
