import Link from "next/link";
import styles from "../styles/Home.module.css";

const pageRedirect = () => {
  return (
    <div className={styles.deskMargin}>
      <h2>Page Direction Not Found </h2>
      <p>
        Go to{" "}
        <Link className={styles.link} href="/">
          Homepage
        </Link>{" "}
      </p>
    </div>
  );
};

export default pageRedirect;
