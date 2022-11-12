import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = 'https://ijutagxnmbixeuohxrlk.supabase.co';
const PUBLIC_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqdXRhZ3hubWJpeGV1b2h4cmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNjgxNzYsImV4cCI6MTk4Mzc0NDE3Nn0.FUBvnj2pKJAjKQaxewDzo83MmvP23ZmjmIR2YmXVJDg';
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from('video').select('*');
        },
    };
}
