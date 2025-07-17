import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import pluginTimezone from "dayjs/plugin/timezone";
import { useCurrentTimezone } from "@/context/currentTimezoneContext";

const formatNowDateTimeByTimeZone = (
  timezone: string,
  timestamp: number,
  formatString?: string
) => {
  // 毫秒
  if (!timestamp || timestamp == 0) {
    return "";
  }
  dayjs.extend(utc);
  dayjs.extend(pluginTimezone);

  return dayjs(timestamp)
    .utc()
    .tz(timezone)
    .format(formatString ? formatString : "MM-DD HH:mm");
};

export function SiteHeader() {
  const getNowDateTime = (timezone: string) => {
    if (!timezone) {
      return "";
    }
    const s = new Date().getTime();
    return formatNowDateTimeByTimeZone(timezone, s);
  };
  const { timezone, setTimezone } = useCurrentTimezone();

  const [position, setPosition] = useState<string>(localStorage.getItem("language") || "en");
  const [options] = useState([
    {
      id: 0,
      value: "UTC",
      name: "Greenwich Mean Time (GMT)",
      description: "格林威治标准时间",
    },
    {
      id: 0,
      value: "Asia/Shanghai",
      name: "Asia/Shanghai (CST)",
      description: "中国标准时间",
    },
    {
      id: 0,
      value: "US/Pacific",
      name: "US/Pacific Daylight Time (PDT)",
      description: "太平洋夏令时间",
    },
    {
      id: 0,
      value: "Pacific/Pitcairn",
      name: "US/Pacific Standard Time (PST)",
      description: "太平洋标准时间",
    },
    {
      id: 0,
      value: "US/Eastern",
      name: "US/Eastern Daylight Time (EDT)",
      description: "美国东部时间",
    },
  ]);

  // const [timezoneLabel, setTimezoneLabel] = useState<string>(
  //   options.find((item) => item.value === timezone)?.name || ""
  // );

  const { i18n } = useTranslation();
  const onOpenChange = (e: string) => {
    if (e) {
      setPosition(e);
      i18n.changeLanguage(e);
      localStorage.setItem("language", e);
    }
  };

  const onOpenChangeTimezone = (e: string) => {
    if (e) {
      setTimezone(e);
      localStorage.setItem("timezone", e);
      // setTimezoneLabel(options.find((item) => item.value === e)?.name || "");
    }
  };
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex justify-between items-center w-full px-4">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">Documents</h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{position}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 ">
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={onOpenChange}
              >
                <DropdownMenuRadioItem value="en">en</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="zh">zh</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {timezone} {getNowDateTime(timezone)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 ">
              <DropdownMenuRadioGroup
                value={timezone}
                onValueChange={onOpenChangeTimezone}
              >
                {options.map((item) => {
                  return (
                    <DropdownMenuRadioItem key={item.value} value={item.value}>
                      {item.name} {getNowDateTime(item.value)}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
