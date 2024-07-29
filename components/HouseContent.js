import Link from "next/link";
import ReactMarkdown from "react-markdown";

// UI component for main house detail
export default function HouseContent({ house }) {
  return (
    <div className="card">
      <h1>{house.name}</h1>
      <span className="text-sm">
        <p>Colors: {house.houseColours}</p>
        <p>Founder: {house.founder}</p>
        <p>Animal: {house.animal}</p>
        <p>Element: {house.element}</p>
        <p>Ghost: {house.ghost}</p>
        <p>Common Room: {house.commonRoom}</p>
      </span>
      <h2>Heads of House</h2>
      <ul>
        {house.heads.map((head) => (
          <li key={head.id}>
            {head.firstName} {head.lastName}
          </li>
        ))}
      </ul>
      <h2>Traits</h2>
      <ul>
        {house.traits.map((trait) => (
          <li key={trait.id}>{trait.name}</li>
        ))}
      </ul>
    </div>
  );
}
