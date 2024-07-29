import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import * as amplitude from "@amplitude/analytics-browser";

export default function HouseFeed({ houses }) {
  return houses
    ? houses.map((house) => <HouseItem house={house} key={house.id} />)
    : null;
}

function HouseItem({ house }) {
  const { user } = useContext(UserContext);

  const handleClick = (houseId) => {
    amplitude.track("House Detail Clicked", {
      houseId,
      user: user ? user.id : "guest",
    });
  };

  return (
    <div className="card" onClick={() => handleClick(house.id)}>
      <Link href={`/houses/${house.id}`}>
        <a>
          <strong>At {house.commonRoom}</strong>
        </a>
      </Link>

      <Link href={`/houses/${house.id}`}>
        <h2>
          <a>{house.name}</a>
        </h2>
      </Link>

      <footer>
        <span>Founded by {house.founder}</span>
      </footer>
    </div>
  );
}
