package com.example.backend.configuration;

import com.example.backend.data.ServerSpecification;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfiguration {

    @Value("${api.version}")
    private String apiVersion;

    @Bean
    public ApiVersionSettings apiVersionSettings() {
        return new ApiVersionSettings(apiVersion);
    }

    @Bean
    public ServerSpecification serverSpecification() {
        return new ServerSpecification();
    }
}
