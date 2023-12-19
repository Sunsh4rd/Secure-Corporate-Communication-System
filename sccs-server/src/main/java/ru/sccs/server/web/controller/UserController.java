package ru.sccs.server.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.sccs.server.domain.user.Role;
import ru.sccs.server.domain.user.User;
import ru.sccs.server.repository.UserRepository;
import ru.sccs.server.web.dto.user.UserCreationDTO;
import ru.sccs.server.web.mapper.UserMapper;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserMapper userMapper;

    private final UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<User> getUser() {
        return userRepository.findByRole(Role.ROLE_USER);
    }

    @GetMapping("/notAssigned/{taskId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<User> getAllNotAssignedUsers(@PathVariable Long taskId) {
        return userRepository.findAllNotAssignedToTask(taskId);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("user not found"));
    }

    @PostMapping("/createUser")
    public User createUser(@RequestBody UserCreationDTO userCreationDTO) {
        return userRepository.save(userMapper.toEntity(userCreationDTO));
    }

    @GetMapping("/test")
    public String getTest() {
        return "test";
    }

}
