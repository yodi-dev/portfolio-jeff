import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const id = event.context.params!.id;
  const body = await readBody(event);

  const { data, error } = await client
    .from("portfolio")
    .update({
      title: body.title,
      description: body.description,
      images: body.images,
      highlight: body.highlight,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw createError({ statusCode: 400, statusMessage: error.message });

  return data;
});
