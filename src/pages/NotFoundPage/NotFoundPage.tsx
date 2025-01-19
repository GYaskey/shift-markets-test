import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToEvents = () => {
    navigate("/");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.moon}></div>
      <div className={`${styles.moonCrater} ${styles.moonCrater1}`}></div>
      <div className={`${styles.moonCrater} ${styles.moonCrater2}`}></div>
      <div className={`${styles.moonCrater} ${styles.moonCrater3}`}></div>

      <div className={`${styles.star} ${styles.star1}`}></div>
      <div className={`${styles.star} ${styles.star2}`}></div>
      <div className={`${styles.star} ${styles.star3}`}></div>
      <div className={`${styles.star} ${styles.star4}`}></div>
      <div className={`${styles.star} ${styles.star5}`}></div>

      <div className={styles.error}>
        <div className={styles.errorTitle}>404</div>
        <div className={styles.errorSubtitle}>Hmmm...</div>
        <div>
          <p className={styles.errorDescription}>
            It looks like this page doesn't exist.
          </p>
        </div>
        <button
          className={`${styles.errorButton} ${styles.errorButtonActive}`}
          onClick={handleBackToEvents}
        >
          Get back to events
        </button>
      </div>

      <div className={styles.astronaut}>
        <div className={styles.astronautBackpack}></div>
        <div className={styles.astronautBody}></div>
        <div className={styles.astronautBodyChest}></div>
        <div className={styles.astronautArmLeft1}></div>
        <div className={styles.astronautArmLeft2}></div>
        <div className={styles.astronautArmRight1}></div>
        <div className={styles.astronautArmRight2}></div>
        <div className={styles.astronautArmThumbLeft}></div>
        <div className={styles.astronautArmThumbRight}></div>
        <div className={styles.astronautLegLeft}></div>
        <div className={styles.astronautLegRight}></div>
        <div className={styles.astronautFootLeft}></div>
        <div className={styles.astronautFootRight}></div>
        <div className={styles.astronautWristLeft}></div>
        <div className={styles.astronautWristRight}></div>
        <div className={styles.astronautCord}>
          <canvas id="cord" height="500px" width="500px"></canvas>
        </div>
        <div className={styles.astronautHead}>
          <canvas id="visor" width="60px" height="60px"></canvas>
          <div className={styles.astronautHeadVisorFlare1}></div>
          <div className={styles.astronautHeadVisorFlare2}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
