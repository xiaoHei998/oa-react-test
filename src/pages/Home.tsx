import React, { useEffect, useState } from "react";
import { Axios } from "../utils/request";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import pluginTimezone from "dayjs/plugin/timezone";
import { useCurrentTimezone } from "../context/currentTimezoneContext";
import { Button } from "@/components/ui/button";
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

const Home: React.FC = () => {
  const { timezone, setTimezone } = useCurrentTimezone();
  console.log("Home--updated");
  const [options, setOptions] = useState<
    {
      value: string;
      label: string;
      description: string;
    }[]
  >([]);
  const timezoneLabel =
    options.find((item) => item.value === timezone)?.label || "";
  const getOptions = async () => {
    const { data } = await Axios.get("/options/timezones");
    setOptions(
      data.list.map((item: Record<string, string>) => {
        return {
          value: item.value,
          label: item.name,
          description: item?.description,
        };
      })
    );
  };
  const getDetails = async () => {
    try {
      const { data } = await Axios.get("/profile");
      setTimezone(data.timezone.value);
    } catch (error) {
      console.log(error);
    }
  };

  const getNowDateTime = (timezone: string) => {
    if (!timezone) {
      return "";
    }
    const s = new Date().getTime();
    return formatNowDateTimeByTimeZone(timezone, s);
  };

  const handleTimeZoneChange = async function (params: { key: string }) {
    setTimezone(params.key);
    try {
      const { data } = await Axios.put("/profile", {
        timezone: params.key,
      });
      if (data.code === 0) {
        const baseInfo = JSON.parse(
          localStorage.getItem("signin-staff-base-info") as string
        );

        localStorage.setItem(
          "signin-staff-base-info",
          JSON.stringify({
            staff_id: baseInfo.staff_id,
            name: baseInfo.name,
            role: baseInfo.role,
            timezone: params.key,
          })
        );
      }
    } catch (error) {
      console.error(String(error));
    }
  };

  useEffect(() => {
    const init = async () => {
      await getOptions();
      await getDetails();
      // const timer = setInterval(() => {
      //   // getDetails();
      //   setTimezone(
      //     [
      //       "Asia/Shanghai",
      //       "UTC",
      //       "US/Pacific",
      //       "Pacific/Pitcairn",
      //       "US/Eastern",
      //     ][Math.floor(Math.random() * 5)]
      //   );
      // }, 3000);
      // return () => clearInterval(timer);
    };
    init();
  }, []);
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
              {item.label} {getNowDateTime(item.value)}
            </li>
          );
        })}
      </ul>
      <Button className="bg-red-500 hover:bg-red-600" onClick={() => console.log("click")}>Click me</Button>
    </div>
  );
};

export default Home;
