import { Baby } from "lucide-react";

export const ChristmasTree = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-tree-pine"
  >
    <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" />
    <path d="M12 22v-3" />
  </svg>
);

export const Reindeer = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
    <path d="M12 6v2" />
    <path d="M12 16v2" />
    <path d="M6 12h2" />
    <path d="M16 12h2" />
    <path d="M8 8l1.5 1.5" />
    <path d="M14.5 14.5L16 16" />
    <path d="M8 16l1.5-1.5" />
    <path d="M14.5 9.5L16 8" />
  </svg>
);

export const ChristmasElf = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-users"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const Letters = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-open"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
);

export const ChristmasSnowflake = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2v20" />
    <path d="M2 12h20" />
    <path d="M4.93 4.93l14.14 14.14" />
    <path d="M4.93 19.07l14.14-14.14" />
  </svg>
);

export const ChristmasLogout = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
  </svg>
);

export const ChristmasSantaSleight = (props) => (
  <img
    src="src/assets/santasleigh.png"
    alt="Santa's Sleigh"
    className="w-64"
    {...props}
  />
);

export const ChristmasSanta = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 120"
    fill="none"
    {...props}
  >
    {/* Tree trunk */}
    <rect x="45" y="100" width="10" height="20" fill="#8B4513" />

    {/* Tree layers */}
    <path d="M50 10 L80 50 H20 Z" fill="#228B22" />
    <path d="M50 30 L85 80 H15 Z" fill="#228B22" />
    <path d="M50 50 L90 110 H10 Z" fill="#228B22" />

    {/* Star */}
    <path
      d="M50 0 L53 9 L62 9 L55 14 L58 23 L50 18 L42 23 L45 14 L38 9 L47 9 Z"
      fill="#FFD700"
    />

    {/* Ornaments */}
    <circle cx="35" cy="45" r="3" fill="#FF0000" />
    <circle cx="65" cy="45" r="3" fill="#0000FF" />
    <circle cx="50" cy="60" r="3" fill="#FF69B4" />
    <circle cx="30" cy="75" r="3" fill="#FFD700" />
    <circle cx="70" cy="75" r="3" fill="#FF4500" />
    <circle cx="45" cy="90" r="3" fill="#00CED1" />
    <circle cx="55" cy="90" r="3" fill="#FF1493" />

    {/* Garland */}
    <path
      d="M30 40 Q50 30 70 40"
      stroke="#FFD700"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M25 65 Q50 55 75 65"
      stroke="#FFD700"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M20 90 Q50 80 80 90"
      stroke="#FFD700"
      strokeWidth="2"
      fill="none"
    />

    {/* Snow */}
    {[...Array(20)].map((_, i) => (
      <circle
        key={i}
        cx={Math.random() * 100}
        cy={Math.random() * 120}
        r={Math.random() * 1.5 + 0.5}
        fill="#FFFFFF"
      />
    ))}
  </svg>
);

export const Route = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-route"
  >
    <circle cx="6" cy="19" r="3" />
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
    <circle cx="18" cy="5" r="3" />
  </svg>
);

export const ChildrenIcon = (props) => {
  return <Baby />;
}
