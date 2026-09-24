import { findByUniqueId } from "@/components/utils/findByUniqueId";

export const abilitySolveProblem =
  "if you had the ability to solve a problem, what would it be?";
export const forecast = "forecast 2022";
export const favorites = "favorites";
export const aboutMe = "about me";

export const targetData = (data: any, targetName: any) => {
  return findByUniqueId(data, targetName);
};
export const checkData = (data: any) =>
  data !== undefined ? data : "undefined";

export const translateFavorites = (data: any, targetName: any) => {
  return findByUniqueId(data, targetName);
};
