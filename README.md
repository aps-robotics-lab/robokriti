# ROBOKRITI 2026 — Web Application

A GitHub/Firebase-ready animated robotics competition web application for Army Public School, Lal Bahadur Shastri Marg, Lucknow.

## Final event information
- Competition: 07 September 2026
- Registration closes: 03 September 2026 at 11:59 PM IST
- Registration: Free
- Eligibility: Classes 6–12
- Maximum team size: 5, including leader
- Contact: ayusshh@outlook.in

## Hero frames
The app expects the existing frame sequence exactly here:

`assets/frames/frame_0000.webp` through `assets/frames/frame_0299.webp`

Do not rename the frames. Do not remove `assets/awes-logo.png`.

## Event images
Create this folder and add the supplied images:

```text
Images/
├── robo-race.webp
├── robo-tug.webp
├── robo-war.webp
└── robo-soccer.webp
```

The event cards and event detail pages already reference these paths.

## Firebase
1. Create/verify Firebase Authentication → Email/Password.
2. Create the single admin account `ayusshh@outlook.in`.
3. Deploy the included Realtime Database rules.
4. The admin dashboard is `admin/index.html`.
5. The rules authorize only the single admin email for private data and admin writes.

The Firebase web API key is a client-side identifier; security comes from Authentication + Realtime Database Rules.

## GitHub Pages
The public pages are plain deployable files and work on GitHub Pages. Firebase Realtime Database/Auth provide the dynamic backend.

## Important
This project intentionally does not pretend to have official Robo Race or Robo Soccer technical rules that were not supplied. Update those event pages when the organizers finalize the rules.
