import "moment/locale/ka";
import moment from "moment";

export const getTimeFromNow = (time, locale) => {
  const momentLocale = locale === "ge" ? "ka" : locale;
  moment.locale(momentLocale);
  return moment(time).fromNow();
};
