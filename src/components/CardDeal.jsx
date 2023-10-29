import React from "react";
import { card,Female } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";
import { Link } from "react-router-dom";
const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Find a better Community<br className="sm:block hidden" /> in few easy
        steps.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Ready to level up your gaming experience? Join us and discover a vibrant community of passionate gamers just like you!
      </p>
      <Link to="/login"><Button styles={`mt-10`} /></Link>
    </div>
    <div className={layout.sectionImg}>
      <img src={Female} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;