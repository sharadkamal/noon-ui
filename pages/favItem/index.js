import Link from "next/link";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Fav.module.css";
import HomeStyle from "../../styles/Home.module.css";

export const getStaticProps = async () => {
  const res = await fetch("https://noon-api.vercel.app/noon-api/get-all-liked");
  const data = await res.json();

  return {
    props: { calls: data },
  };
};

const RemoveLike = async (call) => {
  return await fetch("https://noon-api.vercel.app/noon-api/checked-like", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      id: call._id,
      status: call.is_liked == 1 ? 0 : 1,
      count: call.posted_like_count,
    }),
  })
    .then(async (response) => {
      Router.reload("/favItem");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const favCall = ({ calls }) => {
  return (
    <div className={HomeStyle.deskMargin}>
      {calls["messages"].map((call) => (
        <Link className={styles.fav} href="#" key={call._id}>
          <h3 styles={{ position: "relative", float: "left" }}>
            {call.posted_movie}
            <span className={styles.iconContainer}>
              <FontAwesomeIcon
                style={{ fontSize: "15px" }}
                icon={faDeleteLeft}
                color={call.is_liked == 0 ? "#bbc0c5" : "#fc619c"}
                onClick={() => RemoveLike(call)}
              ></FontAwesomeIcon>
            </span>
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default favCall;
