import React, { useEffect, useState } from "react";

// e.g. "Times shown in PST". Resolved after mount so server and client markup match.
const TimezoneNote = ({ className = "" }: { className?: string }) => {
  const [zone, setZone] = useState("");

  useEffect(() => {
    try {
      const part = new Intl.DateTimeFormat(undefined, { timeZoneName: "short" })
        .formatToParts(new Date())
        .find((p) => p.type === "timeZoneName");
      setZone(part?.value ?? "");
    } catch {}
  }, []);

  if (!zone) return null;
  return <p className={`text-xs text-mute ${className}`}>Times shown in {zone}</p>;
};

export default TimezoneNote;
