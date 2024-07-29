import HouseFeed from "@components/HouseFeed";
import Metatags from "@components/Metatags";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import axios from "axios";
import * as amplitude from "@amplitude/analytics-browser";

import { useState, useEffect } from "react";

amplitude.init("16962284f9ac6a7b0e7f04d477264b8c");

export default function Home() {
  const [houses, setHouses] = useState([]);

  const { user } = useContext(UserContext);
  const platform = navigator.userAgent.includes("Mobi") ? "mobile" : "web";

  useEffect(() => {
    axios
      .get("https://wizard-world-api.herokuapp.com/houses")
      .then((response) => {
        setHouses(response.data);
        amplitude.track("All Houses Page View", {
          page: `AllHouses`,
          user: user ? user.uid : "guest",
          platform: platform,
        });
      });
  }, []);

  return (
    <main>
      <Metatags
        title="Home Page"
        description="Check Hogwarts Houses on our site"
      />

      <div className="card card-info">
        <h2>Hogwarts Houses</h2>
        <p>
          Welcome Wizzard! 👨‍🎤 This app will help you find all the relevant
          information of the houses in Hogwarts School of Witchcraft and
          Wizardry
        </p>
        <p>Sign up for an account and check the houses</p>
      </div>

      <HouseFeed houses={houses} />
    </main>
  );
}
