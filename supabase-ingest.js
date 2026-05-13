<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
  const SUPABASE_URL = "https://etwwriloppklhhkmswpr.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_h73YNxdir_c2J_5X7avE_g_BhvRU82G";

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  function normalize(data) {
    if (data instanceof FormData) {
      const obj = {};
      for (const [k, v] of data.entries()) obj[k] = v;
      return obj;
    }

    if (Array.isArray(data)) {
      return data.reduce((acc, val, i) => {
        acc[String.fromCharCode(65 + i)] = val; // A, B, C...
        return acc;
      }, {});
    }

    if (typeof data === "object" && data !== null) {
      return data;
    }

    return { value: data };
  }

  async function sendToSupabase(data) {
    const payload = normalize(data);

    const { data: result, error } = await supabase
      .from("generic_ingest")
      .insert([{ payload }]);

    if (error) {
      console.error("Insert error:", error);
      return { success: false, error };
    }

    return { success: true, result };
  }

  // ===== EXAMPLES =====

  sendToSupabase(["John", "Doe", 42]);

  sendToSupabase({
    name: "John",
    surname: "Doe",
    age: 42
  });
</script>