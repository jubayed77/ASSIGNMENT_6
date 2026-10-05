🛠️ Technologies Used
Technology	Purpose
Next.js (App Router)	Building the UI and handling page routing
TypeScript	Type safety for workout data and context
Tailwind CSS	Styling and responsive design
DaisyUI	Ready-made UI components (navbar, cards, tabs, stats)
Context API	Shared state for Today's Plan and Saved lists
react-hot-toast	Toast notifications
lucide-react	Icons
Vercel	Deployment



✨ Key Features
Workout Library — All workouts from the API shown as cards in a responsive grid (3 columns on desktop), with a loading animation while data is fetched.
Workout Details Page — Dynamic route (/workout/[id]) with a large image, key specs table, category tags and step-by-step instructions.
Today's Plan & Saved — "Add to today's plan" and "Save for later" buttons update the navbar badge counters instantly and show a toast notification. Plan is capped at 5 lifts, and duplicates are blocked.
My Plan Page — Live metrics (Exercises, Minutes, Calories), Today's Plan / Saved tabs, sort by Duration, Calories or Rating, and a friendly empty state.
Mark as Done & Remove — Finish a workout with one click, or remove it from the plan or saved list, with a toast for every action.
Persistent Data — Plan and Saved lists are stored in localStorage, so they survive a page reload.
Fully Responsive + 404 Page — Works on mobile, tablet and desktop, and unknown routes show a custom 404 page.