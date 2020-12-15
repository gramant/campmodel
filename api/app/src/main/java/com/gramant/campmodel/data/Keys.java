/*
 * This file is generated by jOOQ.
 */
package com.gramant.campmodel.data;


import com.gramant.campmodel.data.tables.Company;
import com.gramant.campmodel.data.tables.Products;
import com.gramant.campmodel.data.tables.records.CompanyRecord;
import com.gramant.campmodel.data.tables.records.ProductsRecord;

import org.jooq.ForeignKey;
import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.Internal;


/**
 * A class modelling foreign key relationships and constraints of tables in 
 * the default schema.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Keys {

    // -------------------------------------------------------------------------
    // UNIQUE and PRIMARY KEY definitions
    // -------------------------------------------------------------------------

    public static final UniqueKey<CompanyRecord> PK_COMPANY_ID = Internal.createUniqueKey(Company.COMPANY, DSL.name("PK_COMPANY_ID"), new TableField[] { Company.COMPANY.ID }, true);
    public static final UniqueKey<CompanyRecord> PRODUCT_ID = Internal.createUniqueKey(Company.COMPANY, DSL.name("PRODUCT_ID"), new TableField[] { Company.COMPANY.PRODUCT_ID }, true);
    public static final UniqueKey<CompanyRecord> UQ_COMPANY_NAME = Internal.createUniqueKey(Company.COMPANY, DSL.name("UQ_COMPANY_NAME"), new TableField[] { Company.COMPANY.NAME }, true);
    public static final UniqueKey<ProductsRecord> PK_CODE = Internal.createUniqueKey(Products.PRODUCTS, DSL.name("PK_CODE"), new TableField[] { Products.PRODUCTS.CODE }, true);
    public static final UniqueKey<ProductsRecord> UQ_PRODUCT_NAME = Internal.createUniqueKey(Products.PRODUCTS, DSL.name("UQ_PRODUCT_NAME"), new TableField[] { Products.PRODUCTS.NAME }, true);

    // -------------------------------------------------------------------------
    // FOREIGN KEY definitions
    // -------------------------------------------------------------------------

    public static final ForeignKey<CompanyRecord, ProductsRecord> FK_COMPANY = Internal.createForeignKey(Company.COMPANY, DSL.name("FK_COMPANY"), new TableField[] { Company.COMPANY.PRODUCT_ID }, Keys.PK_CODE, new TableField[] { Products.PRODUCTS.CODE }, true);
}