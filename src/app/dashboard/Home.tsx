import React, { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import pluginTimezone from "dayjs/plugin/timezone";
import { useCurrentTimezone } from "../context/currentTimezoneContext";
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

const TimeZonelist = [
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
];

const Home = () => {
  const { timezone, setTimezone } = useCurrentTimezone();
  console.log("Home--updated");
  const [options] = useState(TimeZonelist);
  const timezoneLabel =
    options.find((item) => item.value === timezone)?.name || "";
  const getNowDateTime = (timezone: string) => {
    if (!timezone) {
      return "";
    }
    const s = new Date().getTime();
    return formatNowDateTimeByTimeZone(timezone, s);
  };

  const handleTimeZoneChange = async function (params: { key: string }) {
    setTimezone(params.key);
    localStorage.setItem("timezone", params.key);
  };


  return (
    <div>
      <h1>Home Page</h1>
      <h1 className="text-2xl font-bold">
        current Timezone: {timezoneLabel} {getNowDateTime(timezone)}
      </h1>
      <ul className="mt-[10rem]">
        {options.map((item) => {
          return (
            <li
              onClick={() => handleTimeZoneChange({ key: item.value })}
              key={item.value}
            >
              {item.name} {getNowDateTime(item.value)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
