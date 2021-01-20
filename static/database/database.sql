CREATE TABLE scoreboard (
    id serial NOT NULL,
    nick text,
	points integer not null default 0,
    game_date timestamp without time zone
);
