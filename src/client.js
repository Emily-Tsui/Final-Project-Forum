import { createClient } from '@supabase/supabase-js'

const URL = 'https://bpxrmemuibbfqnvpuotw.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweHJtZW11aWJiZnFudnB1b3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzOTg2MzcsImV4cCI6MjA0NTk3NDYzN30.GlwW7otSpFQcerBJJ9BtXCqjKZmMmJvD8WHVvSV3rSs';

export const supabase = createClient(URL, API_KEY);