/*
 * This file is generated by jOOQ.
 */
package com.gramant.campmodel.data;


import com.gramant.campmodel.data.tables.Campaign;
import com.gramant.campmodel.data.tables.Products;
import com.gramant.campmodel.data.tables.records.CampaignRecord;
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

    public static final UniqueKey<CampaignRecord> PK_COMPANY_ID = Internal.createUniqueKey(Campaign.CAMPAIGN, DSL.name("PK_COMPANY_ID"), new TableField[] { Campaign.CAMPAIGN.ID }, true);
    public static final UniqueKey<CampaignRecord> PRODUCT_ID = Internal.createUniqueKey(Campaign.CAMPAIGN, DSL.name("PRODUCT_ID"), new TableField[] { Campaign.CAMPAIGN.PRODUCT_ID }, true);
    public static final UniqueKey<CampaignRecord> UQ_COMPANY_NAME = Internal.createUniqueKey(Campaign.CAMPAIGN, DSL.name("UQ_COMPANY_NAME"), new TableField[] { Campaign.CAMPAIGN.NAME }, true);
    public static final UniqueKey<ProductsRecord> PK_CODE = Internal.createUniqueKey(Products.PRODUCTS, DSL.name("PK_CODE"), new TableField[] { Products.PRODUCTS.CODE }, true);
    public static final UniqueKey<ProductsRecord> UQ_PRODUCT_NAME = Internal.createUniqueKey(Products.PRODUCTS, DSL.name("UQ_PRODUCT_NAME"), new TableField[] { Products.PRODUCTS.NAME }, true);

    // -------------------------------------------------------------------------
    // FOREIGN KEY definitions
    // -------------------------------------------------------------------------

    public static final ForeignKey<CampaignRecord, ProductsRecord> FK_COMPANY = Internal.createForeignKey(Campaign.CAMPAIGN, DSL.name("FK_COMPANY"), new TableField[] { Campaign.CAMPAIGN.PRODUCT_ID }, Keys.PK_CODE, new TableField[] { Products.PRODUCTS.CODE }, true);
}
