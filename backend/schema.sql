-- ================================================================
-- Silent Hill 2 Fan Portal — PostgreSQL Schema
-- ================================================================

CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  username   VARCHAR(80)  NOT NULL UNIQUE,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password_hash TEXT       NOT NULL,
  role       VARCHAR(20)  NOT NULL DEFAULT 'cliente' CHECK (role IN ('admin','cliente')),
  created_at TIMESTAMPTZ  DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS characters (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  description TEXT,
  image_url   TEXT,
  role_type   VARCHAR(80),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lore_entries (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  content     TEXT         NOT NULL,
  chapter     VARCHAR(100),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS items (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  type        VARCHAR(80)  NOT NULL CHECK (type IN ('weapon','health','key','ammo','other')),
  description TEXT,
  image_url   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS survival_tips (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  content     TEXT         NOT NULL,
  difficulty  VARCHAR(20)  DEFAULT 'medium' CHECK (difficulty IN ('easy','medium','hard')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comments (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER      REFERENCES users(id) ON DELETE CASCADE,
  entity_type VARCHAR(50)  NOT NULL,
  entity_id   INTEGER      NOT NULL,
  content     TEXT         NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- Seed data
-- ================================================================

INSERT INTO characters (name, description, image_url, role_type) VALUES
('James Sunderland',  'A man who receives a letter from his dead wife Mary, drawing him back to Silent Hill.', 'https://static.wikia.nocookie.net/silent-hill/images/c/c2/Sh2james.jpg', 'Protagonist'),
('Maria',             'A mysterious woman who resembles James''s late wife. Her origins are unknown.', 'https://static.wikia.nocookie.net/silent-hill/images/2/26/Maria.png', 'Companion'),
('Angela Orosco',     'A young woman haunted by a traumatic past, wandering the fog in search of her mother.', 'https://static.wikia.nocookie.net/silent-hill/images/7/72/Angela.png', 'Supporting'),
('Eddie Dombrowski',  'A troubled young man struggling with his own demons inside Silent Hill.', 'https://static.wikia.nocookie.net/silent-hill/images/5/5a/Eddie.png', 'Supporting'),
('Laura',             'A young girl who claims to know Mary personally, and seems immune to the town''s horrors.', 'https://static.wikia.nocookie.net/silent-hill/images/2/23/Laura.png', 'Supporting'),
('Pyramid Head',      'A towering executioner who persists as a manifestation of James''s subconscious guilt.', 'https://static.wikia.nocookie.net/silent-hill/images/7/73/Pyramid_Head.png', 'Antagonist')
ON CONFLICT DO NOTHING;

INSERT INTO lore_entries (title, content, chapter) VALUES
('The Letter from Beyond', 'James received a letter from his wife Mary — who has been dead for three years. In the letter she speaks of their "special place" in Silent Hill, compelliing James to make the journey into the fog-covered town.', 'Chapter 1: Silent Hill'),
('The Otherworld', 'Silent Hill shifts between two realities: the Fog World, blanketed in oppressive mist, and the Otherworld — a nightmarish, industrial hellscape that reflects the psyche of its visitor. Walls of rust, wire and flesh replace ordinary architecture.', 'Chapter 2: The Otherworld'),
('Pyramid Head''s Purpose', 'Pyramid Head is not a random monster. He is a manifestation conjured by James''s own guilt — a judge, an executioner who mirrors the punishment James subconsciously believes he deserves for what he did to Mary.', 'Chapter 3: The Truth'),
('Toluca Lake', 'The dark waters of Toluca Lake sit at the heart of Silent Hill. Local legend speaks of a "Otherworld" beneath its surface. The lake holds secrets — and bodies — that the town refuses to release.', 'Lore: The Town')
ON CONFLICT DO NOTHING;

INSERT INTO items (name, type, description) VALUES
('Wooden Plank',    'weapon',  'A sturdy piece of lumber. Useful for bashing monsters in a pinch.'),
('Steel Pipe',      'weapon',  'A length of metal pipe. More durable than wood, great for dealing heavy blows.'),
('Handgun',         'weapon',  'A standard semi-automatic pistol. James finds it early in Rosewater Park.'),
('Shotgun',         'weapon',  'Pump-action shotgun. Devastating at close range against tougher enemies.'),
('Great Knife',     'weapon',  'Pyramid Head''s iconic massive blade. Extremely heavy but lethal.'),
('Health Drink',    'health',  'A medical drink that restores a small amount of health.'),
('First Aid Kit',   'health',  'A comprehensive medical kit that restores a large portion of health.'),
('Ampoule',         'health',  'A medical injection. Restores health instantly in critical situations.'),
('Handgun Bullets', 'ammo',    'Standard 9mm ammunition for the handgun.'),
('Shotgun Shells',  'ammo',    'Twelve-gauge shells for the pump-action shotgun.'),
('Apartment Key',   'key',     'Opens a specific room in the Wood Side Apartments.'),
('Lakeview Cabin Key', 'key',  'The key to the cabin on the shores of Toluca Lake.')
ON CONFLICT DO NOTHING;

INSERT INTO survival_tips (title, content, difficulty) VALUES
('Conserve Ammo',         'Dodge when possible. Not every monster needs to be killed — running past them saves precious bullets for boss fights.', 'easy'),
('Listen for Audio Cues', 'The radio''s static intensifies near enemies. Use it to detect threats through walls and in dark areas before they detect you.', 'easy'),
('Manage Inventory',      'Keep your item management clean. Cycle through health items from weakest to strongest, always saving First Aid Kits for critical health.', 'medium'),
('Boss Strategy: Pyramid Head', 'In the boss encounter, do NOT focus on dealing damage. Survive his attacks by maintaining distance and using pillars as cover until the timer triggers his self-defeat.', 'hard'),
('Explore Everything',    'Silent Hill 2 rewards thorough exploration. Hidden notes, items, and puzzle clues are found in seemingly empty rooms and dark corners.', 'medium'),
('Puzzle Difficulty',     'Play on Hard puzzle difficulty for the intended experience. Normal mode simplifies riddles that are core to the game''s atmosphere.', 'hard')
ON CONFLICT DO NOTHING;

-- MAPS TABLE
CREATE TABLE IF NOT EXISTS maps (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  area        VARCHAR(150),
  description TEXT,
  image_url   TEXT,
  order_num   INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO maps (name, area, description, image_url, order_num) VALUES
('Rosewater Park',           'Silent Hill - Lakeshore',    'A foggy lakeside park at the edge of town. James first enters Silent Hill here, finding only silence and mist where a message once existed.',  'https://static.wikia.nocookie.net/silent-hill/images/a/a4/SH2_Map_Rosewater.png', 1),
('Woodside Apartments',      'Silent Hill - Residential',  'A crumbling apartment complex where James begins his search. Mannequins and Lying Figures stalk its dark hallways. Pyramid Head is first encountered in the stairwell vault.',  'https://static.wikia.nocookie.net/silent-hill/images/7/71/SH2_Map_Woodside.png', 2),
('Blue Creek Apartments',    'Silent Hill - Residential',  'Connected to Woodside via a subterranean passage. Darker and more labyrinthine, this building hides the key to the adjacent hospital district.',  'https://static.wikia.nocookie.net/silent-hill/images/8/83/SH2_Map_BlueCreek.png', 3),
('Brookhaven Hospital',      'Silent Hill - Medical',      'An abandoned hospital overrun by grotesque creatures. Nurses wander its wards and the underground levels descend into the Otherworld. Angela confronts her trauma here.',  'https://static.wikia.nocookie.net/silent-hill/images/b/b1/SH2_Map_Brookhaven.png', 4),
('Silent Hill Historical Society', 'Silent Hill - Underground', 'A seemingly innocuous building that conceals a vertical shaft into the Labyrinth  an endless maze of caged cells and industrial corridors beneath the town.',  'https://static.wikia.nocookie.net/silent-hill/images/e/e9/SH2_Map_Historical.png', 5),
('The Labyrinth',            'Underground',                'A disorienting subterranean prison. Pyramid Head''s domain. James must navigate flooded corridors and grotesque puzzles to reach Toluca Lake above.',  'https://static.wikia.nocookie.net/silent-hill/images/f/f5/SH2_Map_Labyrinth.png', 6),
('Toluca Lake',              'Silent Hill - Lake',         'The dark heart of Silent Hill. A motorboat crossing leads James to the Lakeview Hotel  the ''special place'' mentioned in Mary''s letter.',  'https://static.wikia.nocookie.net/silent-hill/images/9/9c/SH2_Map_Toluca.png', 7),
('Lakeview Hotel',           'Silent Hill - Lakeside',     'A once-grand hotel now decayed by time and guilt. The final act plays out here as James'' memories  and his true nature  are revealed layer by layer.',  'https://static.wikia.nocookie.net/silent-hill/images/a/a1/SH2_Map_Lakeview.png', 8)
ON CONFLICT DO NOTHING;
