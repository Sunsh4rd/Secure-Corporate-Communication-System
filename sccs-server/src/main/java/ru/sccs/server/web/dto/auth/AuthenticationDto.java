package ru.sccs.server.web.dto.auth;

import lombok.Data;

@Data
public class AuthenticationDto {

    private String username;
    private String password;

}
