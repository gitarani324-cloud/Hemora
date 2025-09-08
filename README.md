
  # Blood Donation Web App UI/UX

  This is a code bundle for Blood Donation Web App UI/UX. The original project is available at https://www.figma.com/design/K4hcS3WXglxINIqcv3wjA1/Blood-Donation-Web-App-UI-UX.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## Intro Animation
  
  Hemora includes a cinematic intro animation route at `/intro` that supports:
  
  - **3D GLB animations** (preferred): Export from Blender as `hemora_intro.glb`
  - **MP4 video fallback**: High-quality video as `hemora_intro.mp4`  
  - **Static poster**: Fallback image as `hemora_poster.jpg`
  
  ### Testing the Intro
  
  1. Place your animation file in `public/assets/intro/`:
     - `hemora_intro.glb` (3D animated droplet from Blender)
     - `hemora_intro.mp4` (video fallback)
     - `hemora_poster.jpg` (static fallback)
  
  2. Navigate to `/intro` in your browser
  
  3. The intro will auto-detect your asset and play the animation
  
  4. After completion, it transitions smoothly to the main landing page
  
  ### Enable Intro by Default (Demo Mode)
  
  To redirect the homepage to the intro for demonstrations:
  
  1. Open `src/App.tsx`
  2. Change line ~49: `useState<AppState>("homepage")` to `useState<AppState>("intro")`
  3. Or implement URL routing to redirect `/` → `/intro`
  
  See `public/assets/intro/README.md` for detailed Blender export guidelines.
