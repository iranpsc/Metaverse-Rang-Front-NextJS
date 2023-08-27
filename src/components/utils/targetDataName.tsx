
export const abilitySolveProblem =
  "if you had the ability to solve a problem, what would it be?";
export const forecast = "forecast 2022";
export const favorites = "favorites";
export const aboutMe = "about me";

export const targetData = (data: any, targetName: any) => {
  const res = data.find((item: any) => item.name === targetName);
  return res ? res.translation : "";
};


