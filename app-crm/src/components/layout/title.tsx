import React from "react";

import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";
import { useLink } from "@refinedev/core";

import { Space, theme, Typography } from "antd";

import { Logo } from "./logo";

const { useToken } = theme;

const name = "Ticketify";

export const Title: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
}) => {
  const { token } = useToken();
  const Link = useLink();

  return (
    <Link
      to="/login"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "24px",
            width: "24px",
            color: token.colorPrimary,
          }}
        >
          <Logo />
        </div>

        {!collapsed && (
          <Typography.Title
            style={{
              fontSize: "25px",
              marginBottom: 0,
              fontWeight: 550,
            }}
          >
            {name}
          </Typography.Title>
        )}
      </Space>
    </Link>
  );
};
