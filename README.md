# ROBOKRITI 2026 — GitHub-ready website

This project preserves the Stitch-inspired dark editorial UI while adding shared navigation, motion, responsive pages, Firebase registration/contact workflows and an authenticated control room.

## Existing assets
Do **not** replace your existing GitHub `assets/frames/` directory or `assets/awes-logo.png`. The hero loader references them directly. The project adds only `images/robot-race.png` as an extra decorative image.

### Hero frames
The loader expects `assets/frames/frame_0001.jpg`, `frame_0002.jpg`, etc. If your existing naming is different, add these before `js/hero.js` on the home page:

```html
<script>window.ROBOKRITI_FRAME_PATTERN='assets/frames/YOUR_PATTERN_{n}.webp';window.ROBOKRITI_FRAME_COUNT=240;window.ROBOKRITI_FRAME_PAD=4;</script>
```

The hero uses autoplay plus scroll control. If frames cannot be loaded, the supplied robot image is used as a graceful fallback.

## Firebase
1. Enable **Email/Password** under Firebase Authentication.
2. Apply `database.rules.json` to Realtime Database.
3. Create staff users in Firebase Authentication.
4. For each staff UID, create `/users/<uid>/role` with one of: `admin`, `author`, `agent`.
5. `admin` has full dashboard access; `author` publishes announcements/results; `agent` processes registrations/enquiries.

The public site can create registrations until **03 September 2026 23:59:59 IST**. The Realtime Database rule also checks the deadline server-side.

## GitHub Pages
Upload the project root to a GitHub repository and enable GitHub Pages from the branch/folder containing `index.html`. No build step is required.

## Pages
Home · Events/Arena · Robo Race · Robo Tug of War · Robo War · Robo Soccer · Rules · Registration · Announcements · Results · FAQ · Contact · About · Admin

## Included rulebooks
The project includes the supplied Robo Tug of War and Robo War rulebooks under `rulebooks/`, and the Rules page links to them. The Robo War rulebook specifies, among other items, Classes 6–8/9–12, maximum five participants, 30×30×30 cm robot dimensions, 12 V maximum voltage and a 180 cm arena; the Tug rulebook specifies its own technical and arena requirements.
