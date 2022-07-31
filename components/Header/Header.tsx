import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { Zorb } from "../Zorb";
import { GreenZorb } from "../GreenZorb";
import { LoginMenu } from "./LoginMenu";
import { Nav } from "./Nav";

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
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                return (
                  <div
                    {...(!mounted && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!mounted || !account || !chain) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="bg-primary text-white font-semibold py-2 px-4 flex items-center rounded-md"
                          >
                            Connect wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button">
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div className="font-semibold py-2 px-4 flex items-center rounded-3xl hover:bg-base-200 text-sm">
                          <button
                            onClick={openChainModal}
                            style={{ display: "flex", alignItems: "center" }}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  // background: chain.iconBackground,
                                  borderRadius: 999,
                                  overflow: "hidden",
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && <GreenZorb />}
                              </div>
                            )}
                          </button>

                          <button
                            onClick={openAccountModal}
                            type="button"
                            className="ml-1"
                          >
                            {account.displayName}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </div>
  );
};
