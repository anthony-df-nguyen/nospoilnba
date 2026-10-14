import React from "react";

const Skeleton = ({ count = 3 }: { count?: number }) => (
  <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading games">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-36 animate-pulse rounded-3xl border border-line bg-surface md:h-20"
      />
    ))}
  </div>
);

export default Skeleton;
