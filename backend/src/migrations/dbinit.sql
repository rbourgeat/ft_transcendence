CREATE TABLE users
(
    id integer NOT NULL,
    user text  NOT NULL,
    avatar text  NOT NULL,
    status integer NOT NULL,
    wins integer DEFAULT 0,
    losses integer DEFAULT 0,
    ladder_level integer NOT NULL,
    achievements text NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)
