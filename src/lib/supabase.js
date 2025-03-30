// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://bjgmcbtxxczabtphufsr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZ21jYnR4eGN6YWJ0cGh1ZnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3ODQ0MDYsImV4cCI6MjA1NTM2MDQwNn0.JHQYeDBgzGSjLq0svWE17sFWcYezX3Wa_vLtOYeIlpY');

export default supabase;
