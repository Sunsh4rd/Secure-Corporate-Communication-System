package ru.sccs.server.web.controller;

import com.auth0.jwt.exceptions.TokenExpiredException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.CollectionUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;
import ru.sccs.server.domain.user.Role;
import ru.sccs.server.repository.UserRepository;
import ru.sccs.server.web.dto.user.UserCreationDTO;
import ru.sccs.server.web.mapper.UserMapper;
import ru.sccs.server.web.security.JwtUtil;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Validated
@Log4j2
public class AuthController {

    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserCreationDTO userCreationDTO) {
        log.info(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        log.info(userCreationDTO.getUsername());
        log.info(userCreationDTO.getPassword());
        Authentication authenticate = authenticationManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken(
                                userCreationDTO.getUsername(), userCreationDTO.getPassword()
                        )
                );
        log.info(authenticate);
        try {
            Long id = userRepository.findByUsername(userCreationDTO.getUsername()).orElseThrow(() -> new AuthenticationCredentialsNotFoundException("no username")).getId();
            String refreshToken = jwtUtil.generateRefreshToken(id, userCreationDTO.getUsername(), Role.valueOf(authenticate.getAuthorities().stream().toList().get(0).toString()));
            String accessToken = jwtUtil.generateAccessToken(id, userCreationDTO.getUsername(), Role.valueOf(authenticate.getAuthorities().stream().toList().get(0).toString()));
            ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", refreshToken)
                    .httpOnly(true)
                    .sameSite("Strict")
                    .path("/")
                    .maxAge(86400)
                    .build();
            ResponseCookie accessCookie = ResponseCookie.from("access_token", accessToken)
                    .httpOnly(true)
                    .sameSite("Strict")
                    .path("/")
                    .maxAge(86400)
                    .build();
            log.info(accessToken);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, refreshCookie.toString());
            headers.add(HttpHeaders.SET_COOKIE, accessCookie.toString());
//        headers.add(HttpHeaders.LOCATION, "http://localhost:8080/auth/refresh");
//        return new ResponseEntity<>(Map.of("access_token", accessToken), headers, HttpStatus.FOUND);
            return ResponseEntity.ok()
//                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                    .headers(headers)
                    .body(Map.of("is_admin", authenticate.getAuthorities().stream().toList().get(0).toString().equals("ROLE_ADMIN")));
        } catch (AuthenticationCredentialsNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public Long register(@RequestBody UserCreationDTO userCreationDTO) {
        log.info(userCreationDTO);
        userCreationDTO.setPassword(passwordEncoder.encode(userCreationDTO.getPassword()));
        return userRepository.save(userMapper.toEntity(userCreationDTO)).getId();
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refreshTokens(HttpServletRequest request) {
        log.warn(request);
        log.warn(request.getCookies());
        Cookie tokenCookie = WebUtils.getCookie(request, "refresh_token");
        assert tokenCookie != null;
        String refresh = tokenCookie.getValue();
        log.info("/refresh ENDPOINT CALL {}", refresh);
        try {
            List<String> claims = jwtUtil.validateTokenAndRetrieveAllClaims(refresh);

            String newRefresh = jwtUtil.generateRefreshToken(Long.valueOf(claims.get(0)), claims.get(1), Role.valueOf(claims.get(2)));
            String newAccess = jwtUtil.generateAccessToken(Long.valueOf(claims.get(0)), claims.get(1), Role.valueOf(claims.get(2)));

            ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", newRefresh)
                    .httpOnly(true)
                    .sameSite("Strict")
                    .path("/")
                    .maxAge(86400)
                    .build();
            ResponseCookie accessCookie = ResponseCookie.from("access_token", newAccess)
                    .httpOnly(true)
                    .sameSite("Strict")
                    .path("/")
                    .maxAge(86400)
                    .build();
            log.info("new access {}", newAccess);
            log.info("new refresh {}", newRefresh);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, refreshCookie.toString());
            headers.add(HttpHeaders.SET_COOKIE, accessCookie.toString());

            return ResponseEntity.ok()
                    .headers(headers)
                    .build();
        } catch (TokenExpiredException e) {
            log.error("redirecting to login");
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            return ResponseEntity.status(HttpStatus.FOUND).
                    headers(new HttpHeaders(
                            CollectionUtils.toMultiValueMap(
                                    Map.of(HttpHeaders.LOCATION, List.of("/auth/newLogin"))
                            ))
                    ).build();
        }
    }

    @GetMapping("/newLogin")
    ResponseEntity<?> newLogin(HttpServletRequest request) {
        return ResponseEntity.ok().build();
    }

}
