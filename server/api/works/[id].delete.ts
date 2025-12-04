import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const id = event.context.params!.id;

  const { error } = await client.from("portfolio").delete().eq("id", id);

  if (error) throw createError({ statusCode: 400, statusMessage: error.message });

  return { success: true };
});
