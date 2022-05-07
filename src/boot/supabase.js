import { createClient, onAuthStateChanged } from "@supabase/supabase-js";
import useAuthUser from "src/composables/UseAuthUser";

const supabaseUrl = "https://fetomfxnfnexjqlimwza.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZldG9tZnhuZm5leGpxbGltd3phIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE2NTMwNTYsImV4cCI6MTk2NzIyOTA1Nn0.GILLrcHlEIOPW91tjqWL9BRqbGE0s1t73iQXWzDokPA";

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
