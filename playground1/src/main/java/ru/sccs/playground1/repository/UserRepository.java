package ru.sccs.playground1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sccs.playground1.domain.user.Role;
import ru.sccs.playground1.domain.user.User;

import java.util.Optional;

//@Repository
//public interface UserRepository extends JpaRepository<User, Long> {
//
//    Optional<User> findByUsername(String username);
//
////    void insertUserRole(Long userId, Role role);
//
//}