import Link from "next/link";
import { CustomConnectButton } from "../CustomConnectButton";
import { Zorb } from "../Zorb";

// Header height is controlled by the theme in tailwind.config.js

export const Header = () => {
  return (
    <div
      className={`flex items-center justify-between shadow-sm px-8 py-4 w-full bg-base-100 z-20`}
    >
      <Link href="/">
        <div className="flex items-center">
          <Zorb />
          <span className="ml-4 text-[12px] text-[#4D4D4D] font-light hover:cursor-pointer uppercase">
            Creator
          </span>
        </div>
      </Link>

      <div className="items-center justify-between">
        <div className="flex">
          <div className="ml-4">
            <CustomConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};
