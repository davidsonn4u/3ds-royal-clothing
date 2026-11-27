// Public browser configuration only. Never put a Supabase service_role key here.
window.ROYAL_SUPABASE_URL = 'https://nuoascdunkvpprduspmk.supabase.co';
window.ROYAL_SUPABASE_ANON_KEY = 'sb_publishable_Ck8dYdNkEDt7w-2eEqUGfg_S0lrKVfq';
window.royalSupabase = null;
if (window.supabase && window.ROYAL_SUPABASE_URL.startsWith('https://') &&
    window.ROYAL_SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
  window.royalSupabase = window.supabase.createClient(
    window.ROYAL_SUPABASE_URL,
    window.ROYAL_SUPABASE_ANON_KEY
  );
}
