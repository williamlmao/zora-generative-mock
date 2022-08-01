import { NextSeo } from "next-seo";
import React, { FC, useContext } from "react";
import { Theme } from "react-daisyui";
import { Header } from "../components/Header";

type Props = {
  children: React.ReactNode;
};

export const PrimaryLayout: FC<Props> = ({ children }) => {
  return (
    <Theme>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </Theme>
  );
};
