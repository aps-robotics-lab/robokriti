# ROBOKRITI — Futuristic Web Application

Vanilla HTML/CSS/JS, GitHub Pages ready, with Firebase Realtime Database/Auth and a 300-frame canvas scroll sequence.

## Existing assets to copy into this project
- `assets/awes-logo.png`
- `assets/frames/frame_0000.webp` through `frame_0299.webp`
- `Images/robo-race.webp`
- `Images/robo-tug.webp`
- `Images/robo-war.webp`
- `Images/robo-soccer.webp`

The ZIP intentionally does not duplicate those existing assets.

## Firebase
Enable Email/Password Authentication. Use one administrator account and give it the custom claim `admin: true`. Deploy `firebase-rules.json` as Realtime Database rules. Fill `messagingSenderId` and `appId` in `js/firebase.js` from your Firebase web app if they are not already known.

## Dates
Competition: 7 September 2026.
Registration deadline: 3 September 2026, 11:59 PM IST.

## GitHub Pages
Upload the project root and enable GitHub Pages. Because header/footer are loaded with `fetch()`, test through GitHub Pages/HTTP rather than opening HTML with `file://`.
