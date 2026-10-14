import { DM_Sans } from "next/font/google";
import "../styles/tailwind.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${dmSans.variable} min-h-screen font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
