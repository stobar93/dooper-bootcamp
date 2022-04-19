import { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

class CustomSupabaseClient extends SupabaseClient {
  constructor(url, anonKey) {
    super(url, anonKey);
  }

  async isNewUSer(userEmail) {
    const { data } = await this.from("profile")
      .select("id")
      .eq("email", userEmail);
    const isNewUSer = data.length === 0;
    return isNewUSer;
  }
}

export const supabase = new CustomSupabaseClient(supabaseUrl, supabaseAnonKey);
