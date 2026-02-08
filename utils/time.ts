import moment from "moment";
import "moment/locale/id";

export function currentTimeToMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export function timeStringToMinutes(timeStr: string) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

export function formatLocalizedDate(
  date: string | Date | undefined,
  format?:
    | "YYYY-MM-DD"
    | "D MMMM YYYY"
    | "YYYY-MM-DD HH:mm:ss"
    | "D MMMM YYYY HH:mm:ss"
    | "dddd, D MMMM YYYY"
    | "HH:mm:ss",
): string {
  if (!date) return "";
  moment.locale("id");
  const parsed =
    typeof date === "string" ? moment(date) : moment(date.toISOString());

  if (!format) {
    return parsed.toISOString();
  }
  return parsed.format(format);
}
