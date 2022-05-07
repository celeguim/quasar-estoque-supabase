import { createClient, onAuthStateChanged } from "@supabase/supabase-js";
import useAuthUser from "src/composables/UseAuthUser";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
//console.log(supabase);
//console.log("supabase.auth", supabase.auth);

supabase.auth.onAuthStateChange(async (event, session) => {
  const { user } = useAuthUser();
  console.log(user);

  user.value = session?.user ?? null;
});

export default function useSupabase() {
  return { supabase };
}
