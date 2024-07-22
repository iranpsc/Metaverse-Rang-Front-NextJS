import Link from "next/link";

export default async function CitizensPage({
  params,
}: {
  params: { lang: "en" | "fa" };
}) {
  const citizensArray = [
    { id: "hm-2000001" },
    { id: "hm-2000002" },
    { id: "hm-2000003" },
    { id: "hm-2000004" },
  ];
  return (
    <>
      {citizensArray.map((item) => (
        <Link
          className="p-5 border-2"
          href={`/${params.lang}/citizens/${item.id}`}
        >
          {item.id}
        </Link>
      ))}
    </>
  );
}
