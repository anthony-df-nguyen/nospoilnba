import React from "react";

// Teams listed here ship a separate SVG for dark backgrounds; the rest use one file for both.
const DARK_VARIANTS = new Set(["BOS", "HOU", "LAC", "PHI", "SAS", "UTA"]);

interface Props {
  tricode: string;
}

const TeamLogo = ({ tricode }: Props) => {
  const hasDark = DARK_VARIANTS.has(tricode);
  const cls = "absolute inset-0 h-full w-full object-contain";
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={hasDark ? `${cls} dark:hidden` : cls}
        src={`/teamlogos/${tricode}.svg`}
        alt=""
        loading="lazy"
      />
      {hasDark && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={`${cls} hidden dark:block`}
          src={`/teamlogos/${tricode}-dark.svg`}
          alt=""
          loading="lazy"
        />
      )}
    </>
  );
};

export default TeamLogo;
