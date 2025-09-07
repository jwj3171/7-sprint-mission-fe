// components/LoadingSpinner.tsx

import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner} />
    </div>
  );
}
