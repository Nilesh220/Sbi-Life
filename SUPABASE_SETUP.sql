-- ============================================================
-- SUPABASE_SETUP.sql — SBI Life IdeationX 2026 Table Schemas
-- Copy and paste this directly into your Supabase SQL Editor!
-- ============================================================

-- 1. registrations Table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_name TEXT NOT NULL,
    lead_first_name TEXT NOT NULL,
    lead_last_name TEXT NOT NULL,
    college TEXT NOT NULL,
    course TEXT NOT NULL,
    year TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    member_2_name TEXT NOT NULL,
    member_2_email TEXT NOT NULL,
    member_2_course TEXT,
    member_2_phone TEXT,
    member_3_name TEXT NOT NULL,
    member_3_email TEXT NOT NULL,
    member_3_course TEXT,
    member_3_phone TEXT,
    theme_id INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on registrations
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public inserts on registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow public select on registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow public updates on registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow public deletes on registrations" ON public.registrations;

-- CRUD policies for demo sandbox admin dashboard
CREATE POLICY "Allow public inserts on registrations" ON public.registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on registrations" ON public.registrations FOR SELECT USING (true);
CREATE POLICY "Allow public updates on registrations" ON public.registrations FOR UPDATE USING (true);
CREATE POLICY "Allow public deletes on registrations" ON public.registrations FOR DELETE USING (true);


-- 2. posts Table (Community Discussion Board)
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_name TEXT NOT NULL,
    author_college TEXT NOT NULL,
    avatar_color TEXT DEFAULT '#FF6B1A',
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INT DEFAULT 0,
    replies INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on posts" ON public.posts;
DROP POLICY IF EXISTS "Allow public select on posts" ON public.posts;
DROP POLICY IF EXISTS "Allow public update on posts" ON public.posts;
DROP POLICY IF EXISTS "Allow public delete on posts" ON public.posts;

CREATE POLICY "Allow public insert on posts" ON public.posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Allow public update on posts" ON public.posts FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on posts" ON public.posts FOR DELETE USING (true);

-- Store procedure function to increment likes atomically
CREATE OR REPLACE FUNCTION public.increment_likes(post_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.posts
    SET likes = likes + 1
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 3. challenge_submissions Table (Weekly Bharat Challenge)
CREATE TABLE IF NOT EXISTS public.challenge_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    week INT NOT NULL,
    file_name TEXT,
    url TEXT,
    team_id TEXT NOT NULL,
    status TEXT DEFAULT 'Pending' NOT NULL, -- Status: Pending, Approved, Rejected
    score INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on challenge_submissions
ALTER TABLE public.challenge_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on submissions" ON public.challenge_submissions;
DROP POLICY IF EXISTS "Allow public select on submissions" ON public.challenge_submissions;
DROP POLICY IF EXISTS "Allow public update on submissions" ON public.challenge_submissions;
DROP POLICY IF EXISTS "Allow public delete on submissions" ON public.challenge_submissions;

CREATE POLICY "Allow public insert on submissions" ON public.challenge_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on submissions" ON public.challenge_submissions FOR SELECT USING (true);
CREATE POLICY "Allow public update on submissions" ON public.challenge_submissions FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on submissions" ON public.challenge_submissions FOR DELETE USING (true);


-- 4. leaderboard Table (National Standings)
CREATE TABLE IF NOT EXISTS public.leaderboard (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    rank INT NOT NULL,
    college TEXT NOT NULL,
    entry TEXT NOT NULL,
    theme TEXT NOT NULL,
    phase TEXT NOT NULL,
    city TEXT NOT NULL,
    score INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on leaderboard
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select on leaderboard" ON public.leaderboard;
DROP POLICY IF EXISTS "Allow public insert on leaderboard" ON public.leaderboard;
DROP POLICY IF EXISTS "Allow public update on leaderboard" ON public.leaderboard;
DROP POLICY IF EXISTS "Allow public delete on leaderboard" ON public.leaderboard;

CREATE POLICY "Allow public select on leaderboard" ON public.leaderboard FOR SELECT USING (true);
CREATE POLICY "Allow public insert on leaderboard" ON public.leaderboard FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on leaderboard" ON public.leaderboard FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on leaderboard" ON public.leaderboard FOR DELETE USING (true);

-- Insert original mock standings into the database leaderboard table
INSERT INTO public.leaderboard (rank, college, entry, theme, phase, city, score) VALUES
(1, 'IIM Lucknow', 'DigiShield Parampara', 'Kirana to Coverage 🏪', 'Semi-Finalist', 'Lucknow', 1240),
(2, 'XLRI Jamshedpur', 'Sanjeevani Vriksh', 'Climate & Farmer 🌾', 'Semi-Finalist', 'Jamshedpur', 1180),
(3, 'FMS Delhi', 'Nari Raksha Kavach', 'Women Co-operatives 👩‍💼', 'National Qualifier', 'Delhi', 1040),
(4, 'NMIMS Mumbai', 'Pocket Suraksha', 'Invisible Insurance 🚗', 'National Qualifier', 'Mumbai', 980),
(5, 'MICA Ahmedabad', 'Bharat Mitra', 'GenZ Insurance 📱', 'National Qualifier', 'Ahmedabad', 910),
(6, 'ISB Hyderabad', 'Gramin Jeevan', 'Kirana to Coverage 🏪', 'National Qualifier', 'Hyderabad', 870),
(7, 'JBIMS Mumbai', 'Nirmal Bima', 'Women Co-operatives 👩‍💼', 'National Qualifier', 'Mumbai', 820),
(8, 'IIFT Delhi', 'Krishi Rakshak', 'Climate & Farmer 🌾', 'National Qualifier', 'Delhi', 790),
(9, 'IMT Ghaziabad', 'Sahaj Bima', 'GenZ Insurance 📱', 'National Qualifier', 'Ghaziabad', 740),
(10, 'Symbiosis Pune', 'Yuvak Suraksha', 'GenZ Insurance 📱', 'National Qualifier', 'Pune', 710)
ON CONFLICT DO NOTHING;


-- 5. student_stats Table (XP Score & Level)
CREATE TABLE IF NOT EXISTS public.student_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    xp INT DEFAULT 100,
    level INT DEFAULT 1,
    streak INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on student_stats
ALTER TABLE public.student_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select on student_stats" ON public.student_stats;
DROP POLICY IF EXISTS "Allow public update on student_stats" ON public.student_stats;
DROP POLICY IF EXISTS "Allow public insert on student_stats" ON public.student_stats;
DROP POLICY IF EXISTS "Allow public delete on student_stats" ON public.student_stats;

CREATE POLICY "Allow public select on student_stats" ON public.student_stats FOR SELECT USING (true);
CREATE POLICY "Allow public update on student_stats" ON public.student_stats FOR UPDATE USING (true);
CREATE POLICY "Allow public insert on student_stats" ON public.student_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete on student_stats" ON public.student_stats FOR DELETE USING (true);

-- Insert a default mock student account
INSERT INTO public.student_stats (email, xp, level, streak)
VALUES ('student@college.edu', 450, 4, 7)
ON CONFLICT (email) DO NOTHING;


-- 6. idea_hub Table (Inspiration library / Netflix of Student Ideas)
CREATE TABLE IF NOT EXISTS public.idea_hub (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    college TEXT NOT NULL,
    summary TEXT NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on idea_hub
ALTER TABLE public.idea_hub ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select on idea_hub" ON public.idea_hub;
DROP POLICY IF EXISTS "Allow public insert on idea_hub" ON public.idea_hub;
DROP POLICY IF EXISTS "Allow public update on idea_hub" ON public.idea_hub;
DROP POLICY IF EXISTS "Allow public delete on idea_hub" ON public.idea_hub;

CREATE POLICY "Allow public select on idea_hub" ON public.idea_hub FOR SELECT USING (true);
CREATE POLICY "Allow public insert on idea_hub" ON public.idea_hub FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on idea_hub" ON public.idea_hub FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on idea_hub" ON public.idea_hub FOR DELETE USING (true);

-- Insert initial mock student ideas
INSERT INTO public.idea_hub (title, category, author, college, summary, likes) VALUES
('Kirana Insurance Mitra 🏪', 'Rural Protection', 'Aryan & Shruti', 'IIM Lucknow', 'Converting local mom-and-pop Kirana shops into micro-insurance access points for rural families.', 42),
('Sanjeevani Index Tree 🌾', 'Climate Change', 'Vikram Singh', 'XLRI Jamshedpur', 'Parametric crop-tree security model compensating tribal farmers based on local index data weather events.', 31),
('PocketSuraksha AI 📱', 'Gen Z Inclusive', 'Preeti Sen', 'NMIMS Mumbai', 'Dynamic, micro-premium bite-sized protection linked to mobile transit ticketing apps.', 28)
ON CONFLICT DO NOTHING;


-- 7. webinars Table (Mentor Connect Sessions)
CREATE TABLE IF NOT EXISTS public.webinars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    mentor TEXT NOT NULL,
    mentor_role TEXT NOT NULL,
    date_str TEXT NOT NULL,
    time_str TEXT NOT NULL,
    link TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on webinars
ALTER TABLE public.webinars ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select on webinars" ON public.webinars;
DROP POLICY IF EXISTS "Allow public insert on webinars" ON public.webinars;
DROP POLICY IF EXISTS "Allow public update on webinars" ON public.webinars;
DROP POLICY IF EXISTS "Allow public delete on webinars" ON public.webinars;

CREATE POLICY "Allow public select on webinars" ON public.webinars FOR SELECT USING (true);
CREATE POLICY "Allow public insert on webinars" ON public.webinars FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on webinars" ON public.webinars FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on webinars" ON public.webinars FOR DELETE USING (true);

-- Insert mock Mentor webinar session
INSERT INTO public.webinars (title, mentor, mentor_role, date_str, time_str, link) VALUES
('Ask Me Anything: Designing Scalable Social Business Cases', 'Dr. Radhakrishnan', 'Professor of Social Entrepreneurship', '2026-10-18', '05:00 PM', 'https://zoom.us/j/mocksession')
ON CONFLICT DO NOTHING;


-- 8. weekly_challenges Table (Weekly Bharat Challenge questions config)
CREATE TABLE IF NOT EXISTS public.weekly_challenges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    week INT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    xp_reward INT DEFAULT 50,
    deadline_str TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on weekly_challenges
ALTER TABLE public.weekly_challenges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select on weekly_challenges" ON public.weekly_challenges;
DROP POLICY IF EXISTS "Allow public insert on weekly_challenges" ON public.weekly_challenges;
DROP POLICY IF EXISTS "Allow public update on weekly_challenges" ON public.weekly_challenges;
DROP POLICY IF EXISTS "Allow public delete on weekly_challenges" ON public.weekly_challenges;

CREATE POLICY "Allow public select on weekly_challenges" ON public.weekly_challenges FOR SELECT USING (true);
CREATE POLICY "Allow public insert on weekly_challenges" ON public.weekly_challenges FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on weekly_challenges" ON public.weekly_challenges FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on weekly_challenges" ON public.weekly_challenges FOR DELETE USING (true);

-- Seed Week 8 active question details
INSERT INTO public.weekly_challenges (week, title, description, xp_reward, deadline_str) VALUES
(8, 'The 60-Second Pitch', 'Record a 60-second video pitch of your IdeationX idea to a sceptical jury member. No slides. No props. Just you, your conviction, and your idea. What is the single most important thing you would say?', 50, '2026-10-20T23:59:59')
ON CONFLICT (week) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;
