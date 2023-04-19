const gameStatus = (status: number, statustext: string) => {
  if (status === 2) {
    return statustext;
  } else if (status === 3) {
    return "Final";
  } else if (status === 1) {
    let listedStatus = statustext;
    if (listedStatus === "PPD") {
      return "PPD";
    } else {
      return "Scheduled";
    }
  }
};

export default gameStatus;
