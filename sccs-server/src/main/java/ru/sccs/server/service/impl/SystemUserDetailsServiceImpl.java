package ru.sccs.server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.sccs.server.repository.UserRepository;
import ru.sccs.server.web.security.SystemUserDetails;

@Service
@RequiredArgsConstructor
public class SystemUserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new SystemUserDetails(userRepository.findByUsername(username)
                .orElseThrow(
                        () -> new UsernameNotFoundException(String.format("User with username %s not found", username))
                )
        );
    }
}
