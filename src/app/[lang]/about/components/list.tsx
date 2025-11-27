import UserCard from "@/components/shared/UserCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

interface User {
  id: string;
  name: string;
  profile_photo: string;
  code: string;
  score: number;
  levels: { current: any; previous: any[] };
  passions: any;
}

interface ListProps {
  params: any;
  mainData: any;
  users: User[];
}

export default function List({ params, mainData, users }: ListProps) {
  if (!users || users.length === 0) {
    return <div className="text-center p-5 text-red-500">کاربر یافت نشد</div>;
  }

  const staticRouteNames = [
    { id: 1, route_name: "citizen-baguette" },
    { id: 2, route_name: "reporter-baguette" },
    { id: 3, route_name: "participation-baguette" },
    { id: 4, route_name: "developer-baguette" },
    { id: 5, route_name: "inspector-baguette" },
    { id: 6, route_name: "businessman-baguette" },
    { id: 7, route_name: "lawyer-baguette" },
    { id: 8, route_name: "city-council-baguette" },
    { id: 9, route_name: "the-mayor-baguette" },
    { id: 10, route_name: "governor-baguette" },
    { id: 11, route_name: "minister-baguette" },
    { id: 12, route_name: "judge-baguette" },
    { id: 13, route_name: "legislator-baguette" },
  ];

  const getRouteName = (id: number, lang: string, name: string) => {
    if (lang === "fa") return name;
    const found = staticRouteNames.find(r => r.id === id);
    return found?.route_name.split("-")[0] || name;
  };

  // ترجمه لول‌ها قبل از ارسال به UserCard
  const mappedUsers = users.map(user => {
    const current = user.levels?.current
      ? { ...user.levels.current, name: getRouteName(user.levels.current.id, params.lang, user.levels.current.name) }
      : null;

    const previous = user.levels?.previous?.map(gem => ({
      ...gem,
      name: getRouteName(gem.id, params.lang, gem.name),
    })) || [];

    return {
      ...user,
      levels: { current, previous },
    };
  });

  return (
    <div className="w-full relative flex flex-wrap gap-6 justify-center pb-10 lg:px-7 items-start">
      {mappedUsers.map((user, index) => (
        <div key={`${user.code}-${index}`} className="h-full" style={{ minWidth: "280px" }}>
          <UserCard
            item={user}
            index={index}
            params={params}
            mainData={mainData}
            minWidth="280px"
            levelText={findByUniqueId(mainData, 68)}
            buttonText={findByUniqueId(mainData, 600)}
          />
        </div>
      ))}
    </div>
  );
}
