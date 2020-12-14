--liquibase 20201118-1-filter

--changeset gilinykh:1
CREATE TABLE filter(
    id UUID CONSTRAINT pk_filter_id PRIMARY KEY,
    name VARCHAR(100) CONSTRAINT uq_filter_name UNIQUE NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    original_vast_tag VARCHAR(100) NOT NULL
);