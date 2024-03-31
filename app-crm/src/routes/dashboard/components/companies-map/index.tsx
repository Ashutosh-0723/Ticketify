import { lazy, Suspense } from "react";

import { useNavigation } from "@refinedev/core";

import { GlobalOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";

import { Text } from "@/components";

import Countries from "./countries.json";
import styles from "./index.module.css";

const Map = lazy(() => import("./map"));

export const CompaniesMap: React.FC = () => {
  const { list } = useNavigation();

  return (
    <div></div>
  );
};
