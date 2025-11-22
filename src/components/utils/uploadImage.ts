import { supabase } from "./lib/supabaseClient";

export async function uploadImage(file: File, folder: string) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("articles")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error(uploadError);
    return null;
  }

  const { data } = supabase.storage.from("articles").getPublicUrl(filePath);

  return data.publicUrl;
}
