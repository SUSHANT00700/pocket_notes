import React, { useEffect, useState } from "react";
import styles from "./homepage.module.css";
import { GroupList } from "../../components/GroupList/GroupList";
import { Landing } from "../../components/landing/Landing";
import { SelectedGroup } from "../../components/SelectedGroup/SelectedGroup";
import { useSelector } from "react-redux";

export default function FirstPage() {
  const [windowWith, setWindowWith] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowWith(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { currentActiveGroup } = useSelector((note) => note.note);

  const isCurrGrpNull = currentActiveGroup === null;

  return (
    <div className={styles.container}>
      <div
        className={styles.left_container}
        style={{ display: isCurrGrpNull || (windowWith < 720 && "none") }}
      >
        <GroupList />
      </div>

      {!currentActiveGroup ? (
        <div className={styles.right_container}>
          <Landing />
        </div>
      ) : (
        (currentActiveGroup || windowWith > 719) && (
          <div className={styles.right_container} style={{ display: "block" }}>
            <SelectedGroup />
          </div>
        )
      )}
    </div>
  );
}
