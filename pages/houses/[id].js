import styles from "@styles/Post.module.css";
import HouseContent from "@components/HouseContent";
import Metatags from "@components/Metatags";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import * as amplitude from "@amplitude/analytics-browser";

export default function House({ houseData }) {
  const router = useRouter();
  const { id } = router.query;
  const [house, setHouse] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://wizard-world-api.herokuapp.com/houses/${id}`)
        .then((response) => {
          setHouse(response.data);
          amplitude.track("House Detail Page View", {
            page: `HouseDetail-${id}`,
            user: user ? user.uid : "guest",
          });
        });
    }
  }, [id]);

  if (!house) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.container}>
      <Metatags title={house.name} description={house.commonRoom} />

      <section>
        <HouseContent house={house} />
      </section>
    </main>
  );
}
