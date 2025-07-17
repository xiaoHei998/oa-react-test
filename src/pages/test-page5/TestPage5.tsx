import { useTranslation } from "react-i18next";

export default function TestPage5() {
  const { t } = useTranslation();
  return <div>{t("key")}</div>;
}