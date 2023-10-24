//package ru.sccs.playground1.web.security;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import ru.sccs.playground1.service.UserService;
//
//@Service
//@RequiredArgsConstructor
//public class JwtUserDetailsService implements UserDetailsService {
//
//    private final UserService userService;
//
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        return JwtEntityFactory.create(userService.getByUsername(username));
//    }
//}
