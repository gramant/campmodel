CREATE TABLE product(
                         code UUID CONSTRAINT pk_code PRIMARY KEY,
                         name VARCHAR(100) CONSTRAINT uq_product_name UNIQUE NOT NULL
);

CREATE TABLE campaign(
                        id UUID CONSTRAINT pk_campaign_id PRIMARY KEY,
                        name VARCHAR(100) CONSTRAINT uq_campaign_name UNIQUE NOT NULL,
                        product_code UUID CONSTRAINT product_code NOT NULL REFERENCES product(code),
                        calculation VARCHAR(50) NOT NULL,
                        budget INTEGER NOT NULL,
                        weeks INTEGER NOT NULL
);