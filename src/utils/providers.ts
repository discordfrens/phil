import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env['Supabase_URL'], 
  process.env['Supabase_Service_Role']
);