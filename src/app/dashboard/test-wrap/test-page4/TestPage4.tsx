import { useTranslation } from "react-i18next";

export default function TestPage4() {
  const { t } = useTranslation();
  return <div>{t("test.name")}</div>;
}