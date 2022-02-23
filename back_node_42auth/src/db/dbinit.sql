CREATE TABLE users
(
    login42 text  NOT NULL,
    avatar text  NOT NULL,
    status integer NOT NULL,
    wins integer NOT NULL,
    losses integer NOT NULL,
    ladder_level integer NOT NULL,
    achievements text NOT NULL
);

INSERT INTO users (login42, avatar, status, wins, losses, ladder_level, achievements) VALUES ('user1', 'test1', 1, 10, 30, 1000 , 'hello');
INSERT INTO users (login42, avatar, status, wins, losses, ladder_level, achievements) VALUES ('user2', 'test2', 2, 20, 20, 1000 , 'hello');
INSERT INTO users (login42, avatar, status, wins, losses, ladder_level, achievements) VALUES ('user3', 'test3', 3, 30, 10, 1000 , 'hello');

CREATE TABLE matches
(
    user1 text  NOT NULL,
    user2 text  NOT NULL,
    matchid text NOT NULL,
    winner text NOT NULL,
    loser text NOT NULL,
    score_user1 integer NOT NULL,
    score_user2 integer NOT NULL
);