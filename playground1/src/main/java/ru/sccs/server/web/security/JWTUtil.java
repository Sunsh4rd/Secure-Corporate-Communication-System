package ru.sccs.server.web.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ru.sccs.server.domain.user.Role;

import java.time.ZonedDateTime;
import java.util.Date;

@Component
public class JWTUtil {

    @Value("${jwt_secret}")
    private String secret;
    private final String subject = "details";
    private final String issuer = "SCCS";

    public String generateRefreshToken(String username) {
        Date expiration = Date.from(ZonedDateTime.now().plusHours(8).toInstant());
        return JWT.create()
                .withSubject(subject)
                .withClaim("username", username)
                .withIssuedAt(new Date())
                .withIssuer(issuer)
                .withExpiresAt(expiration)
                .sign(Algorithm.HMAC512(secret));
    }

    public String generateAccessToken(Long id, String username, Role role) {
        Date expiration = Date.from(ZonedDateTime.now().plusHours(1).toInstant());
        return JWT.create()
                .withSubject(subject)
                .withClaim("id", id)
                .withClaim("username", username)
                .withClaim("authorities", role.name())
                .withIssuedAt(new Date())
                .withIssuer(issuer)
                .withExpiresAt(expiration)
                .sign(Algorithm.HMAC512(secret));
    }

    public String validateTokenAndRetrieveClaim(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC512(secret))
                .withSubject(subject)
                .withIssuer(issuer)
                .build();

        DecodedJWT jwt = verifier.verify(token);
        return jwt.getClaim("username").asString();
    }
}
