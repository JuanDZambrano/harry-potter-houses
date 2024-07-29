import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import { auth } from "@lib/firebase";
import * as amplitude from "@amplitude/analytics-browser";

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    amplitude.track("Sign Out", { user: user ? user.uid : "guest" });
    router.reload();
  };

  const handleLoginClick = () => {
    amplitude.track("Log In Click");
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">Hogwarts Houses</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <button onClick={signOut}>Sign Out</button>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL || "/hacker.png"} />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue" onClick={handleLoginClick}>
                Log in
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
