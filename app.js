const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL; // Your Supabase project URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY; // Your Supabase anonymous public key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

app.use(express.json());

// A sample route to fetch data
app.get('/api/users', async (req, res) => {
    const { data: users, error } = await supabase
        .from('users')
        .select('*');

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(users);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
