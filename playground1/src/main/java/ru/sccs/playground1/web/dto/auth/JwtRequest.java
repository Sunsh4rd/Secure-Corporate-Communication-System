package ru.sccs.playground1.web.dto.auth;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class JwtRequest {

    @NotNull
    private String username;

    @NotNull
    private String password;

}
