CREATE TABLE players (
  player_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  nick_name TEXT,
  total_matches INT DEFAULT 0,
  total_runs INT DEFAULT 0,
  total_wickets INT DEFAULT 0
);
CREATE TABLE tournaments (
  tournament_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  teams INTEGER[] NOT NULL,
  start_date DATE,
  end_date DATE
);
CREATE TABLE teams (
  team_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  players INTEGER[] NOT NULL,
  tournament_id INTEGER REFERENCES tournaments(tournament_id) ON DELETE CASCADE
);
CREATE TABLE matches (
  match_id SERIAL PRIMARY KEY,
  tournament_id INTEGER REFERENCES tournaments(tournament_id) ON DELETE SET NULL,
  match_number TEXT,
  match_type TEXT,
  team1_id INTEGER REFERENCES teams(team_id),
  team2_id INTEGER REFERENCES teams(team_id),
  team1_runs INT DEFAULT 0,
  team1_wkts INT DEFAULT 0,
  team1_balls INT DEFAULT 0,
  team2_runs INT DEFAULT 0,
  team2_wkts INT DEFAULT 0,
  team2_balls INT DEFAULT 0,
  winner_id INTEGER REFERENCES teams(team_id),
  total_balls INT,
  innings_count INT DEFAULT 1
);
CREATE TABLE match_player_stats (
  id SERIAL PRIMARY KEY,
  match_id INTEGER REFERENCES matches(match_id) ON DELETE CASCADE,
  player_id INTEGER REFERENCES players(player_id),
  innings INT CHECK (innings BETWEEN 1 AND 4),
  runs INT DEFAULT 0,
  balls_faced INT DEFAULT 0,
  fours INT DEFAULT 0,
  sixes INT DEFAULT 0,
  wickets INT DEFAULT 0,
  balls_bowled INT DEFAULT 0,
  runs_conceded INT DEFAULT 0,
  maidens INT DEFAULT 0
);
CREATE TABLE overs (
  over_id SERIAL PRIMARY KEY,
  match_id INTEGER REFERENCES matches(match_id) ON DELETE CASCADE,
  innings INT CHECK (innings BETWEEN 1 AND 4),
  over_number INT,
  bowler_id INTEGER REFERENCES players(player_id),
  runs_in_over INT DEFAULT 0,
  wickets_in_over INT DEFAULT 0,
  total_runs_till_over INT DEFAULT 0, 
  total_wkts_till_over INT DEFAULT 0
);
CREATE TABLE balls (
  ball_id SERIAL PRIMARY KEY,
  match_id INTEGER REFERENCES matches(match_id) ON DELETE CASCADE,
  innings INT CHECK (innings BETWEEN 1 AND 4),
  over_number INT,
  ball_number INT,
  batsman_id INTEGER REFERENCES players(player_id),
  bowler_id INTEGER REFERENCES players(player_id),
  result TEXT CHECK (result IN ('0','1','2','3','4','6','W')),
  runs INT DEFAULT 0
);

CREATE INDEX idx_match_player_stats_player_id ON match_player_stats(player_id);
CREATE INDEX idx_balls_match_id ON balls(match_id);
CREATE INDEX idx_overs_match_id ON overs(match_id);
CREATE INDEX idx_matches_tournament_id ON matches(tournament_id);
CREATE INDEX idx_mps_match_player_innings ON match_player_stats(match_id, player_id, innings);
CREATE INDEX idx_balls_match_innings_over ON balls(match_id, innings, over_number);