package com.careeros.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Deny-by-default security posture from day one.
 *
 * The API is a stateless OAuth2 resource server (ADR-002): it validates JWTs
 * issued by the managed OIDC provider (Cognito/Auth0) against the provider's
 * JWKS, discovered from OIDC_ISSUER_URI. It never issues or refreshes tokens
 * itself — that is the provider's job, driven by the web client's code flow.
 *
 * Only the health endpoint is public. CSRF is disabled because the API is
 * stateless JSON — there are no browser sessions to forge.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));
        return http.build();
    }
}
