import teamLogos from "../data/teamLogos";
const checkLogo = (tricode) => {
    try {
      let code = tricode;
      let match = teamLogos.filter((a) => a.team === code && a);
      let src = match[0].src;
      //console.log("src is", src)
      return src;
    } catch (err) {
      return "";
    }
  };
  
export default checkLogo