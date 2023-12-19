package ru.sccs.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.sccs.server.domain.user.Role;
import ru.sccs.server.domain.user.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    List<User> findByRole(Role role);

    @Query("SELECT u FROM User u WHERE u.role = 'ROLE_USER' AND u NOT IN (SELECT tu FROM Task t JOIN t.assignees tu WHERE t.id = :taskId)")
    List<User> findAllNotAssignedToTask(Long taskId);
}