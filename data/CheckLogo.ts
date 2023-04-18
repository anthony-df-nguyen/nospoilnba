import teamLogos from "./teamLogos";
const checkLogo = (cityCode) => {
    try {
      let code = cityCode;
      let match = teamLogos.filter((a) => a.team === code && a);
      let src = match[0].src;
      //console.log("src is", src)
      return src;
    } catch (err) {
      return "";
    }
  };
  
export default checkLogo