import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="navbar">
        <Link href="/">
          <img width={35} src="/home-alt-svgrepo-com.svg" alt="home" />
        </Link>
        <Link href="/favItem">
          <img width={35} src="/heart-svgrepo-white.svg" alt="fav" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
