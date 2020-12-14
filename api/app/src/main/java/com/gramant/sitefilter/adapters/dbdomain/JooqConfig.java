package com.gramant.sitefilter.adapters.dbdomain;

import org.jooq.ConnectionProvider;
import org.jooq.DSLContext;
import org.jooq.conf.RenderNameCase;
import org.jooq.conf.RenderQuotedNames;
import org.jooq.conf.Settings;
import org.jooq.impl.DataSourceConnectionProvider;
import org.jooq.impl.DefaultConfiguration;
import org.jooq.impl.DefaultDSLContext;
import org.jooq.impl.DefaultExecuteListenerProvider;
import org.springframework.boot.autoconfigure.jooq.JooqExceptionTranslator;
import org.springframework.boot.autoconfigure.jooq.JooqProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableConfigurationProperties(JooqProperties.class)
@EnableTransactionManagement(proxyTargetClass = true)
public class JooqConfig {

    private final JooqProperties properties;

    public JooqConfig(JooqProperties properties) {
        this.properties = properties;
    }

    @Bean
    public DataSourceConnectionProvider connectionProvider(DataSource dataSource) {
        return new DataSourceConnectionProvider(new TransactionAwareDataSourceProxy(dataSource));
    }

    @Bean
    public DSLContext dsl(org.jooq.Configuration configuration) {
        return new DefaultDSLContext(configuration);
    }

    @Bean
    public DefaultConfiguration configuration(ConnectionProvider connectionProvider, DataSource dataSource) {
        DefaultConfiguration jooqConfiguration = new DefaultConfiguration();
        jooqConfiguration.set(connectionProvider);
        jooqConfiguration.set(new Settings().withRenderQuotedNames(RenderQuotedNames.NEVER).withRenderNameCase(RenderNameCase.LOWER));
        jooqConfiguration.set(this.properties.determineSqlDialect(dataSource));
        jooqConfiguration.set(new DefaultExecuteListenerProvider(new JooqExceptionTranslator()));

        return jooqConfiguration;
    }
}
