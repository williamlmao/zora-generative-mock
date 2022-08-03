export const Zorb = ({
  color,
}: {
  color?: "yellow" | "lightgreen" | "darkgreen" | "blue";
}) => {
  if (color === "lightgreen") {
    return (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <rect
          width="30"
          height="30"
          rx="15"
          fill="url(#paint0_radial_6017_3014)"
        ></rect>
        <defs>
          <radialGradient
            id="paint0_radial_6017_3014"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(19.4876 7.30724) scale(22.5872)"
          >
            <stop offset="15.62%" stopColor="hsl(42, 77%, 97%)" />
            <stop offset="39.58%" stopColor="hsl(42, 78%, 89%)" />
            <stop offset="72.92%" stopColor="hsl(122, 80%, 77%)" />
            <stop offset="90.63%" stopColor="hsl(132, 85%, 67%)" />
            <stop offset="100%" stopColor="hsl(132, 87%, 67%)" />
          </radialGradient>
        </defs>
      </svg>
    );
  }

  if (color === "darkgreen") {
    return (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <rect
          width="30"
          height="30"
          rx="15"
          fill="url(#paint0_radial_6017_3015)"
        ></rect>
        <defs>
          <radialGradient
            id="paint0_radial_6017_3015"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(19.4876 7.30724) scale(22.5872)"
          >
            <stop offset="15.62%" stopColor="hsl(90, 77%, 97%)" />
            <stop offset="39.58%" stopColor="hsl(100, 90%, 59%)" />
            <stop offset="72.92%" stopColor="hsl(122, 80%, 67%)" />
            <stop offset="90.63%" stopColor="hsl(132, 85%, 47%)" />
            <stop offset="100%" stopColor="hsl(132, 87%, 45%)" />
          </radialGradient>
        </defs>
      </svg>
    );
  }

  if (color === "yellow") {
    return (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="30"
          height="30"
          rx="15"
          fill="url(#paint0_radial_6017_3018)"
        ></rect>
        <defs>
          <radialGradient
            id="paint0_radial_6017_3018"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(19.4876 7.30724) scale(22.5872)"
          >
            <stop offset="15.62%" stopColor="hsl(42, 77%, 97%)" />
            <stop offset="39.58%" stopColor="hsl(42, 78%, 89%)" />
            <stop offset="72.92%" stopColor="hsl(53, 100%, 50%, 1)" />
            <stop offset="90.63%" stopColor="hsla(42, 100%, 50%, 1)" />
            <stop offset="100%" stopColor="hsla(38, 100%, 50%, 1)" />
          </radialGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="30"
        height="30"
        rx="15"
        fill="url(#paint0_radial_6017_3016)"
      ></rect>
      <defs>
        <radialGradient
          id="paint0_radial_6017_3016"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.4876 7.30724) scale(22.5872)"
        >
          <stop offset="0.15625" stopColor="#DCC8D0"></stop>
          <stop offset="0.302083" stopColor="#78C8CF"></stop>
          <stop offset="0.427083" stopColor="#4D959E"></stop>
          <stop offset="0.557292" stopColor="#305EB9"></stop>
          <stop offset="0.796875" stopColor="#311F12"></stop>
          <stop offset="0.90625" stopColor="#684232"></stop>
          <stop offset="1" stopColor="#2D1C13"></stop>
        </radialGradient>
      </defs>
    </svg>
  );
};
