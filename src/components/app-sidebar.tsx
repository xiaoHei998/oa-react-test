import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
// import { permissionRoutes, type RouteNode } from "@/router/permission-router";
import { default as dashboardRoutes } from '@/app/dashboard/routes'
import type { DashboardRoutes } from "@/app/dashboard/routes/types";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

interface SidebarItem {
  title: string;
  url: string;
  items?: SidebarItem[];
}

// 将路由树转换为侧边栏导航格式
export function routesToSidebar(routes: DashboardRoutes[]): SidebarItem[] {
  const sidebarItems: SidebarItem[] = [];

  function convertNode(node: DashboardRoutes): SidebarItem | null {
    const sidebarItem: SidebarItem = {
      title: node.meta?.title || node.path,
      url: node.children ? "" : `/${node.path}`,
    };

    // 如果有子节点，递归处理
    if (node.children && node.children.length > 0) {
      const childItems: SidebarItem[] = [];
      for (const child of node.children) {
        const childItem = convertNode(child);
        if (childItem) {
          childItems.push(childItem);
        }
      }
      if (childItems.length > 0) {
        sidebarItem.items = childItems;
      }
    }

    // 只返回有 element 或有子项的节点
    if (node.element || (sidebarItem.items && sidebarItem.items.length > 0)) {
      return sidebarItem;
    }
    return null;
  }

  for (const route of routes) {
    const sidebarItem = convertNode(route);
    if (sidebarItem) {
      sidebarItems.push(sidebarItem);
    }
  }
  return sidebarItems;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const tnavMain = routesToSidebar(dashboardRoutes);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <h2 className=" text-[20px] font-bold"> TT</h2>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={tnavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
