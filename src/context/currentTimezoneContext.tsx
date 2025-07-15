import { createContext, useContext, useState } from "react";

interface ICurrentTimezoneContext {
  timezone: string;
  setTimezone: (timezone: string) => void;
}
export const CurrentTimezoneContext = createContext<ICurrentTimezoneContext>({
  timezone: "",
  setTimezone: () => {},
});


export const CurrentTimezoneProvider = ({
  children,
  initalTimezone,
}: {
  children: React.ReactNode;
  initalTimezone?: string;
}) => {
  const [timezone, setTimezone] = useState(initalTimezone ?? '');

  return (
    <CurrentTimezoneContext.Provider
      value={{ timezone, setTimezone }}
    >
      {children}
    </CurrentTimezoneContext.Provider>
  );
};


// 导出使用
export function useCurrentTimezone() {
  return useContext(CurrentTimezoneContext);
}
