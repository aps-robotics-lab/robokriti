# ROBOKRITI — Futuristic Robotics Web Application

A GitHub-ready, multi-page robotics competition web application for Army Public School, Lal Bahadur Shastri Marg, Lucknow.

## Visual system
- Obsidian black canvas
- White / soft-gray typography
- Cyan + violet + acid-green ambient lighting
- Space Grotesk + Inter + DM Mono
- Glass navigation with hide-on-scroll behaviour
- Organic event cards with real event imagery, glow and particles
- Magnetic controls and pointer-reactive cards on desktop
- Reduced-motion support

## Hero sequence
The home hero uses `assets/frames/frame_0000.webp` through `frame_0299.webp` on an HTML5 canvas. The first frame is enough to unlock the site; remaining frames are progressively cached in the background so a slow device cannot get trapped at the preloader.

## Existing assets expected
- `assets/awes-logo.png`
- `assets/frames/frame_0000.webp` ... `frame_0299.webp`
- `Images/robo-race.webp`
- `Images/robo-tug.webp`
- `Images/robo-war.webp`
- `Images/robo-soccer.webp`

## Deployment
This is plain HTML/CSS/JavaScript and can be deployed to GitHub Pages. Reusable header/footer components are fetched from `includes/`; GitHub Pages provides the required HTTP origin.

For local development, use any local HTTP server instead of opening HTML files directly with `file://`.

## Firebase
Firebase configuration is in `js/firebase.js`. Fill any missing Web App identifiers from the Firebase Console before using authenticated/admin features. Do not publish service-account credentials.

## Event dates
Competition: **7 September 2026**
Registration deadline: **3 September 2026, 11:59 PM IST**
Registration: **Free**, maximum **5 members including the leader**
Classes: **6–12**, sections **A–I**
