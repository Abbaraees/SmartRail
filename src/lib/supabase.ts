
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Database } from '../database.types';

export const supabase = createClient<Database>("https://ojboyszkxisxvazjpkbr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qYm95c3preGlzeHZhempwa2JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4Njk3NTEsImV4cCI6MjAzNTQ0NTc1MX0.7QyCw_T-nyf9QSGHw70oMJpJSbM5ngiaIzVxb1SX1xc", {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});