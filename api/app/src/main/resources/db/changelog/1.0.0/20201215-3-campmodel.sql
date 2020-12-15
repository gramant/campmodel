CREATE TABLE products(
                         code UUID CONSTRAINT pk_code PRIMARY KEY,
                         name VARCHAR(100) CONSTRAINT uq_product_name UNIQUE NOT NULL
);

CREATE TABLE company(
                       id UUID CONSTRAINT pk_company_id PRIMARY KEY,
                       name VARCHAR(100) CONSTRAINT uq_company_name UNIQUE NOT NULL,
                       product_id UUID CONSTRAINT product_id UNIQUE NOT NULL,
                       calculation VARCHAR(50) NOT NULL,
                       budget INTEGER NOT NULL,
                       weeks INTEGER NOT NULL
);