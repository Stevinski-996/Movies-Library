CREATE TABLE Movie (
    id serial primary key,
    title varchar(255),
    poster_path varchar(255),
    release_date varchar(255),
    overview Text,
    comment Text
)