import { DetailItemSkeleton } from "./DetailItemSkeleton";

// معادل دقیق Permissions: ۱۶ DetailItem با showCheck=true
// (create_union, inter_level_general_points, access_to_answer_questions_unit,
// observation_license, create_challenge_questions, gate_license, upload_music,
// lawyer_license, rent_out_satisfaction, city_counsile_entry, judge_entry,
// establish_special_residential_property, upload_image,
// establish_property_on_surface, delete_image, inter_level_special_points)
export default function PermissionsSkeleton() {
  return (
    <div className="w-full flex flex-wrap justify-between">
      {Array.from({ length: 16 }).map((_, i) => (
        <DetailItemSkeleton key={i} showCheck />
      ))}
    </div>
  );
}
