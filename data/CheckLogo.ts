import teamLogos from "./teamLogos";
const checkLogo = (cityCode: string) => {
  try {
    let code = cityCode;
    let match: {
      team: string;
      src: string;
    }[] = teamLogos.filter((a) => a.team === code && a);
    let src = match[0].src;
    return src;
  } catch (err) {
    return "";
  }
};

export default checkLogo;
