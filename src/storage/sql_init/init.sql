CREATE TYPE status AS ENUM ('Active', 'Disabled', 'Deleted');
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id serial primary key,
    firstName varchar(255) not null,
    lastName varchar(255) not null,
    email varchar(255) not null,

    createdAt timestamp without time zone default now(),
    updatedAt timestamp without time zone default now(),
    status status not null,

    unique(email)

);

CREATE TYPE bookStatus AS ENUM ('Ready', 'Using', 'Deleted');
DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
    id serial primary key,
    title varchar(255) not null,
    author varchar(255) not null,

    createdAt timestamp without time zone default now(),
    updatedAt timestamp without time zone default now(),
    status bookStatus not null,
);

CREATE TYPE loanStatus AS ENUM ('Active', 'Finished');
DROP TABLE IF EXISTS booksloan CASCADE;
CREATE TABLE books (
    id serial primary key,
    userId int not null,
    bookId int not null,

    createdAt timestamp without time zone default now(),
    updatedAt timestamp without time zone default now(),
    status status not null,

    foreign key (userId) references users (id),
    foreign key (bookId) references books (id)
);
