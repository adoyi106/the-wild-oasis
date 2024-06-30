import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Issue getting data");
  }

  return data;
}

//https://ovtfhhoftywbsafwjvux.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg?t=2024-01-10T23%3A58%3A20.518Z
export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  //  1. create new/edit cabin
  let query = supabase.from("cabins");

  //A. Create cabin
  if (hasImagePath) return;
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B. Edit Cabin

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin can't be deleted");
  }
  //2. Upload the cabin with
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  //3. Delete cabin if image fails to upload
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin can't be deleted");
  }

  return data;
}
