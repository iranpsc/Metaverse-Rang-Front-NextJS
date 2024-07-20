export const abilitySolveProblem =
  "if you had the ability to solve a problem, what would it be?";
export const forecast = "forecast 2022";
export const favorites = "favorites";
export const aboutMe = "about me";

export const targetData = (data: any, targetName: any) => {
  const res = data.find((item: any) => item.name === targetName);

  return res ? res.translation : "";
};
export const checkData = (data: any) =>
  data !== undefined ? data : "undefined";

export const translateFavorites = (data: any, targetName: any) => {
  let res: any = "";

  switch (targetName) {
    case "animals_nature":
      res = data.find((item: any) => item.name === "animals nature");
      break;
    case "food_cooking":
      res = data.find((item: any) => item.name === "food cooking");
      break;
    case "travel_leature":
      res = data.find((item: any) => item.name === "travel leature");
      break;
    case "science_technology":
      res = data.find((item: any) => item.name === "science technology");
      break;
    case "space_time":
      res = data.find((item: any) => item.name === "space time");
      break;
    case "politics_economy":
      res = data.find((item: any) => item.name === "politics economy");
      break;
    case "sport_health":
      res = data.find((item: any) => item.name === "sport health");
      break;
    case "language_culture":
      res = data.find((item: any) => item.name === "language culture");
      break;
    default:
      res = data.find((item: any) => item.name.includes(targetName));
      break;
  }

  return res ? res.translation : "";
};
