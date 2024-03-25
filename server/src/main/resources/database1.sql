

create table users
(
    id                  int8    not null,
    activation_code     varchar(255),
    active              boolean not null,
    address             varchar(255),
    city                varchar(255),
    email               varchar(255),
    first_name          varchar(255),
    last_name           varchar(255),
    password            varchar(255),
    password_reset_code varchar(255),
    phone_number        varchar(255),
    credit_card          varchar(255),
    provider            varchar(255),
    primary key (id)
);

create table user_role
(
    user_id int8 not null,
    roles   varchar(255)
);

alter table if exists user_role add constraint FKj345gk1bovqvfame88rcx7yyx foreign key (user_id) references users;

create sequence users_id_seq start 4 increment 1;

-- seed data

-- password: admin
insert into users(id, email, first_name, last_name, city, address, phone_number, credit_card, activation_code, active, password, password_reset_code, provider)
    values(1, 'admin@gmail.com', 'Admin', 'Admin', null, null, null, null, null, true, '$2a$08$eApn9x3qPiwp6cBVRYaDXed3J/usFEkcZbuc3FDa74bKOpUzHR.S.', null, 'LOCAL');

-- password: admin
insert into users(id, email, first_name, last_name, city, address, phone_number, credit_card, activation_code, active, password, password_reset_code, provider)
    values(2, 'test123@test.com', 'John', 'Doe', 'New York', 'Wall Street1', '1234567890', '1234567890', null, true, '$2a$08$eApn9x3qPiwp6cBVRYaDXed3J/usFEkcZbuc3FDa74bKOpUzHR.S.', null, 'LOCAL');

-- password: admin
insert into users(id, email, first_name, last_name, city, address, phone_number, credit_card, activation_code, active, password, password_reset_code, provider)
    values(3, 'ivan123@test.com', 'Ivan', 'Ivanov', 'Moscow', 'Tverskaya street 1', '1234567890', '1234567890', null, true, '$2a$08$eApn9x3qPiwp6cBVRYaDXed3J/usFEkcZbuc3FDa74bKOpUzHR.S.', null, 'LOCAL');

insert into user_role (user_id, roles)
    values (1, 'ADMIN');

insert into user_role (user_id, roles)
    values (2, 'USER');

insert into user_role (user_id, roles)
    values (3, 'USER');