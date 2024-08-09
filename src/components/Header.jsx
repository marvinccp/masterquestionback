import style from "../styles/Header.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

export const Header = ({}) => {

  const router = useRouter();
  return (
    <header className={style.container}>
      <Image
        src="/images/logo-white.png"
        alt="logo-white"
        width={140}
        height={53}
      />
      <div className="buttons-container">
        {/* <button onClick={() => router.push("/")} className={style.button_right}>
          New Game
        </button> */}
        <Image
          src="/icons/config-icon.png"
          alt="config-icon"
          width={45}
          height={45}
          className={style.config}
        />
      </div>

    </header>
  );
};
