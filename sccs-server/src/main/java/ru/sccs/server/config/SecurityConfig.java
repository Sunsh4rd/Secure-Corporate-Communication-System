package ru.sccs.server.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.util.WebUtils;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .httpBasic(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/auth/**").permitAll())
                .authorizeHttpRequests(authorize -> authorize.requestMatchers("/ws/**").permitAll())
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().authenticated())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exception ->
                                exception
                                        .authenticationEntryPoint(
                                                (request, response, authenticationException) -> {
                                                    response.addCookie(WebUtils.getCookie(request, "refresh_token"));
//                                            response.addHeader("Origin", "http://localhost:3000");
//                                            response.addHeader("Access-Control-Allow-Credentials", "true");
//                                            response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
                                                    response.sendRedirect("/auth/refresh");
                                                }
                                        )
//                                .accessDeniedHandler(
//                                        (request, response, authenticationException) -> {
//                                            response.addCookie(WebUtils.getCookie(request, "refresh_token"));
////                                            response.addHeader("Origin", "http://localhost:3000");
////                                            response.addHeader("Access-Control-Allow-Credentials", "true");
////                                            response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//                                            response.sendRedirect("/auth/refresh");
//                                        }
//                                )
//                                .accessDeniedHandler(
//                                        (request, response, accessDeniedException) -> {
//                                            response.addCookie(WebUtils.getCookie(request, "refresh_token"));
//                                            response.sendRedirect("/auth/refresh");
//                                        }
//                                )
                )
                .build();

    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.addAllowedHeader("Access-Control-Allow-Origin");
        configuration.addExposedHeader("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
