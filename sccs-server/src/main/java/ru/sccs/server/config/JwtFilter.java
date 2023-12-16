package ru.sccs.server.config;

import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;
import ru.sccs.server.service.impl.SystemUserDetailsServiceImpl;
import ru.sccs.server.web.security.JwtUtil;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Log4j2
public class JwtFilter extends GenericFilterBean {

    private final JwtUtil jwtUtil;
    private final SystemUserDetailsServiceImpl systemUserDetailsService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
//        String authorization = ((HttpServletRequest) request).getHeader("Authorization");
        Cookie tokenCookie = WebUtils.getCookie((HttpServletRequest) request, "access_token");

        if (tokenCookie != null /* authorization!= null && !authorization.isBlank() && authorization.startsWith("Bearer ")*/) {
            String jwt = tokenCookie.getValue();
//            String jwt = authorization.substring(7);
            if (jwt.isBlank()) {
                ( (HttpServletResponse)response).sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JWT");
            } else {
                try {
                    String username = jwtUtil.validateTokenAndRetrieveClaim(jwt);
                    UserDetails userDetails = systemUserDetailsService.loadUserByUsername(username);
                    UsernamePasswordAuthenticationToken token =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    userDetails.getPassword(),
                                    userDetails.getAuthorities());

                    if (SecurityContextHolder.getContext().getAuthentication() == null) {
                        SecurityContextHolder.getContext().setAuthentication(token);
                    }
                } catch (JWTVerificationException e) {
                    log.error("EXPIRED JWT");
//                    if (!response.isCommitted()) {
//                        ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_FOUND);
//                        log.info(((HttpServletRequest) request).getContextPath());
//                        ((HttpServletResponse) response).setHeader("Location", "http://localhost:8080/auth/refresh");
//                    }
//                    return;
//                    return;
//                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JWT");
                }
            }
        }

        filterChain.doFilter(request, response);
    }

//    public JwtFilter(RequestMatcher requiresAuthenticationRequestMatcher, JwtUtil jwtUtil, SystemUserDetailsServiceImpl systemUserDetailsService) {
//        super(requiresAuthenticationRequestMatcher);
//        this.jwtUtil = jwtUtil;
//        this.systemUserDetailsService = systemUserDetailsService;
//    }

//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
//        String authorization = request.getHeader("Authorization");
//        if (authorization!= null && !authorization.isBlank() && authorization.startsWith("Bearer ")) {
//            String jwt = authorization.substring(7);
//            String username = jwtUtil.validateTokenAndRetrieveClaim(jwt);
//            UserDetails userDetails = systemUserDetailsService.loadUserByUsername(username);
//            UsernamePasswordAuthenticationToken token =
//                            new UsernamePasswordAuthenticationToken(
//                                    userDetails,
//                                    userDetails.getPassword(),
//                                    userDetails.getAuthorities()
//                            );
//            return token;
//        }
//        return null;
//    }
//
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
//        SecurityContextHolder.getContext().setAuthentication(authResult);
//        chain.doFilter(request, response);
//    }
//
//    @Override
//    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
//        response.sendRedirect("/auth/refresh");
//    }

//        @Override
//    protected void doFilterInternal(
//            @NonNull HttpServletRequest request,
//            @NonNull HttpServletResponse response,
//            @NonNull FilterChain filterChain
//    ) throws ServletException, IOException {
//        String authorization = request.getHeader("Authorization");
////        Cookie tokenCookie = WebUtils.getCookie(request, "refresh_token");
//
//        if (/*tokenCookie != null*/ authorization!= null && !authorization.isBlank() && authorization.startsWith("Bearer ")) {
////            String jwt = tokenCookie.getValue();
//            String jwt = authorization.substring(7);
//            if (jwt.isBlank()) {
//                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JWT");
//            } else {
//                try {
//                    String username = jwtUtil.validateTokenAndRetrieveClaim(jwt);
//                    UserDetails userDetails = systemUserDetailsService.loadUserByUsername(username);
//                    UsernamePasswordAuthenticationToken token =
//                            new UsernamePasswordAuthenticationToken(
//                                    userDetails,
//                                    userDetails.getPassword(),
//                                    userDetails.getAuthorities());
//
//                    if (SecurityContextHolder.getContext().getAuthentication() == null) {
//                        SecurityContextHolder.getContext().setAuthentication(token);
//                    }
//                } catch (JWTVerificationException e) {
//                    log.error("EXPIRED JWT");
//                    response.sendRedirect("/ladasda");
////                    return;
////                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JWT");
//                }
//            }
//        }
//        filterChain.doFilter(request, response);
//    }
}
