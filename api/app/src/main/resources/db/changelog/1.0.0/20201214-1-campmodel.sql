--liquibase 20201214-1-campmodel.sql

CREATE TABLE products(
                         code UUID CONSTRAINT pk_code PRIMARY KEY,
                         name VARCHAR(100) CONSTRAINT uq_product_name UNIQUE NOT NULL
);

CREATE TABLE compeign(
                       id UUID CONSTRAINT pk_compeign_id PRIMARY KEY,
                       name VARCHAR(100) CONSTRAINT uq_compeign_name UNIQUE NOT NULL,
                       product_id UUID CONSTRAINT product_id NOT NULL,
                       calculation VARCHAR(50) NOT NULL,
                       budget INTEGER NOT NULL,
                       weeks INTEGER NOT NULL
);