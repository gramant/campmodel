ALTER TABLE compeign
    ADD CONSTRAINT fk_compeign FOREIGN KEY(product_id) REFERENCES products(code);
