// InviteListLoader.tsx
import { getAllReferral } from "@/components/utils/actions";
import InviteList from "./invite-list";

export default async function InviteListLoader({ id, params, referralPageArrayContent, mainData }: any) {
  const initInviteList = await getAllReferral(id);
  return (
    <InviteList
      initInviteList={initInviteList}
      params={params}
      referralPageArrayContent={referralPageArrayContent}
      mainData={mainData}
    />
  );
}