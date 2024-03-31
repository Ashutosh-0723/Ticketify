import { FC, PropsWithChildren } from "react";

import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";

import { Text } from "@/components";

type Props = ButtonProps;

export const KanbanAddStageButton: FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  style,
  ...rest
}) => {
  return (
    <div></div>
  );
};
