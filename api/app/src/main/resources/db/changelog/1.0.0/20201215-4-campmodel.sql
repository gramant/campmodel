ALTER TABLE company
    ADD CONSTRAINT fk_company FOREIGN KEY(product_id) REFERENCES products(code);
