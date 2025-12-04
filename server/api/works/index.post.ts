import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);

  const { data, error } = await client.from("portfolio")
    .insert({
      title: body.title,
      description: body.description,
      images: body.images,
      highlight: body.highlight
    })
    .select()
    .single();

  if (error) throw createError({ statusCode: 400, statusMessage: error.message });

  return data;
});
