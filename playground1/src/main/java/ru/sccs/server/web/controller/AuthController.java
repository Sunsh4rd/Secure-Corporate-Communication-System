package ru.sccs.server.web.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.sccs.server.domain.user.Role;
import ru.sccs.server.repository.UserRepository;
import ru.sccs.server.web.dto.user.UserCreationDTO;
import ru.sccs.server.web.mapper.UserMapper;
import ru.sccs.server.web.security.JWTUtil;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Validated
@Log4j2
public class AuthController {

    private final UserMapper userMapper;
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody UserCreationDTO userCreationDTO) {
        log.info(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        Authentication authenticate = authenticationManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken(
                                userCreationDTO.getUsername(), userCreationDTO.getPassword()
                        )
                );
        log.info(authenticate);
        Long id = userRepository.findByUsername(userCreationDTO.getUsername()).orElseThrow(() -> new IllegalArgumentException("no username")).getId();
        String refreshToken = jwtUtil.generateRefreshToken(userCreationDTO.getUsername());
        String accessToken = jwtUtil.generateAccessToken(id, userCreationDTO.getUsername(), Role.valueOf(authenticate.getAuthorities().stream().toList().get(0).toString()));
        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(86400)
                .build();
        log.info(accessToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("access_token", accessToken));
    }

    @PostMapping("/register")
    public Long register(@RequestBody UserCreationDTO userCreationDTO) {
        log.info(userCreationDTO);
        userCreationDTO.setPassword(passwordEncoder.encode(userCreationDTO.getPassword()));
        return userRepository.save(userMapper.toEntity(userCreationDTO)).getId();
    }

}
