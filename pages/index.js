import styles from "../styles/Home.module.css";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3001/noon-api/get-all");
  const data = await res.json();

  return {
    props: { call: data },
  };
};

const Calls = ({ call }) => {
  const addLike = async (posted) => {
    return await fetch("http://localhost:3001/noon-api/checked-like", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        id: posted._id,
        status: posted.is_liked == 1 ? 0 : 1,
        count: posted.posted_like_count,
      }),
    })
      .then(async (response) => {
        console.log(await response.text());
        Router.reload("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Head>
        <title>Noon-App</title>
      </Head>
      <div className={styles.deskMargin}>
        {call["messages"].map((item) => (
          <div key={item._id} className="card" style={{ marginBottom: "20px" }}>
            <div className={styles.proPicContainer}>
              <span>
                <img
                  src={item.posted_movie_pro_pic}
                  style={{ width: "40px", borderRadius: "50%" }}
                  alt="proPic"
                />
              </span>
              <span className={styles.movieContainer}>{item.posted_movie}</span>
            </div>
            <img
              src={item.posted_movie_image}
              alt="Avatar"
              style={{ width: "100%" }}
            />
            <div className={styles.movieTitle}>{item.posted_movie_title}</div>
            <div className={styles.favIcon}>
              <FontAwesomeIcon
                onClick={() => addLike(item)}
                color={item.is_liked == 0 ? "#bbc0c5" : "#fc619c"}
                style={{ fontSize: "25px" }}
                icon={faHeart}
              ></FontAwesomeIcon>
            </div>
            <div className={styles.likeContainer}>
              <span>
                <img width={20} src="/heart-svgrepo-pink.svg" alt="favIcon" />
              </span>
              <span className={styles.likeCounter}>
                {item.posted_like_count} Likes
              </span>
            </div>
            <div className={styles.descriptionText}>
              {item.posted_description}
            </div>
            <div className={styles.commentContainer}>
              View {item.posted_comment_count} comments
            </div>
            <hr style={{ borderTop: "2px solid gray" }} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Calls;
