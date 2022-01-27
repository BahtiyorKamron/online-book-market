create table book_shelf_users(
  id bigint not null,
  username varchar(64),
  first_name varchar(64)
);
create table books(
  id smallserial not null,
  nomi varchar(64) not null,
  narxi varchar(64) not null,
  turi int not null,
  aftori varchar(64)
);
insert into books(
  nomi,narxi,turi,aftori
) values ("Raqamli Qala","39000",1,"Den Braun"),
("Ilm Olish Sirlari","21000",2,"Ibn hatoot"),
("Web Development with Nodejs","54000",3,"Ethan Brown"),
("Stiv Jobs","65000",4,"Wolter Isaakson");
