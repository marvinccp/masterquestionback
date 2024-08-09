import LoginContext from "@/context/LoginContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <LoginContext>
      <Component {...pageProps} />
    </LoginContext>
  );
}
