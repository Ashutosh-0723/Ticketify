import type { IResourceItem } from "@refinedev/core";

import {
  CalendarOutlined,
  ContainerOutlined,
  CrownOutlined,
  DashboardOutlined,
  ProjectOutlined,
  ShopOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "events",
    list: "/calendar",
    create: "/calendar/create",
    edit: "/calendar/edit/:id",
    show: "/calendar/show/:id",
    meta: {
      label: "Calendar",
      icon: <CalendarOutlined />,
    },
  },
  {
    name: "scrumboard",
    meta: {
      label: "Kanbanboard",
      icon: <ProjectOutlined />,
    },
  },

  {
    name: "tasks",
    list: "/kanbanboard/issues",
    create: "/kanbanboard/issues/create",
    edit: "/kanbanboard/issues/edit/:id",
    meta: {
      label: "Issues",
      parent: "scrumboard",
    },
  },


/*{
    name: "tasks",
    list: "/kanban",
    create: "/kanban/create",
    edit: "/kanban/edit/:id",
    meta: {
      label: "Project Kanban",
      //parent: "scrumboard",
      icon: <ProjectOutlined />,
    },
  },*/


  {
    name: "taskStages",
    create: "/scrumboard/kanban/stages/create",
    edit: "/scrumboard/kanban/stages/edit/:id",
    list: "/scrumboard/kanban",
    meta: {
      hide: true,
    },
  },
  
  {
    name: "companies",
    list: "/projects",
    show: "/projects/:id",
    create: "/projects/create",
    edit: "/projects/edit/:id",
    meta: {
      label: "Projects",
      icon: <ShopOutlined />,
    },
  },
  {
    name: "companies",
    identifier: "sales-companies",
    create: "/scrumboard/sales/create/company/create",
    meta: {
      hide: true,
    },
  },
  
  
];
