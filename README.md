BoredAndBeyond

An open-world exploration game set in Bangladesh. Two friends are bored during semester break, so they travel across all 7 divisions, finish missions, and unlock the next one.

Explore Bangladesh... Your Way!

About

Start in Dhaka, complete the main mission, and unlock the next division. Explore city streets, beaches, rivers, forests, tea gardens and heritage sites.

Features

Status: work in progress. Checked items are done.

[ ] Main menu (Start Adventure, Character Select, Settings, Quit)
[ ] Character select (boy and girl)
[ ] Player movement (walk, run) with keyboard and touch joystick
[ ] HUD: money, stars, minimap, mission box
[ ] Division select screen with locked and unlocked divisions
[ ] Missions with progress (e.g. 0 / 1)
[ ] Save progress in the browser (localStorage)
Divisions
#	Division	Theme	Main mission
1	Dhaka	City Adventure	Explore Old Dhaka and find the hidden tag
2	Chattogram	Coastal Adventure	Take a beach photo
3	Rajshahi	River Adventure	Coming soon
4	Khulna	Forest Adventure	Coming soon
5	Barishal	River Life Adventure	Coming soon
6	Sylhet	Nature Adventure	Visit Jaflong
7	Rangpur	Heritage Adventure	Coming soon
Controls
Action	Desktop	Mobile
Move	WASD / Arrow keys	On-screen joystick
Run	Shift	Run button
Interact	E	Interact button
Action	Space	Action button
Tech stack
React
Vite
JavaScript
Getting started

Requirements: Node.js 18 or newer.

bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev

Then open the local URL shown in the terminal (usually http://localhost:5173).

Build for production:

bash
npm run build
npm run preview
Project structure
src/
  components/   UI (menu, HUD, division select)
  game/         game logic (movement, missions, save)
  assets/       images, maps, audio
  App.jsx
  main.jsx

Adjust this to match your actual folders.

Roadmap
Main menu and character select
Dhaka map and player movement
HUD and first mission
Division unlock and save system
Remaining 6 divisions
Mobile controls, sound and polish
