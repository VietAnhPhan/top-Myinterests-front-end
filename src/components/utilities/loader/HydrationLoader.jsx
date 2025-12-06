import styles from "./HydrationLoader.module.css";

export default function HydrationLoader() {
  return (
    <>
      <div className={styles.loaderOverlay}>
        <div className={styles.loader}></div>
      </div>
    </>
  );
}
