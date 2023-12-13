package ru.sccs.server.web.security.expression;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.sccs.server.domain.task.Task;
import ru.sccs.server.domain.user.User;
import ru.sccs.server.repository.TaskRepository;
import ru.sccs.server.web.security.SystemUserDetails;

@Service("authorizationExpression")
@RequiredArgsConstructor
public class AuthorizationExpression {

    private final TaskRepository taskRepository;

    public boolean canAccessTask(Long taskId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        SystemUserDetails user = (SystemUserDetails) authentication.getPrincipal();
        System.out.println(user.getUser().getUsername());
        Task task = taskRepository.findById(taskId).get();
        task.getAssignees().stream().map(User::getUsername).forEach(System.out::println);
        return task.getAssignees().contains(user.getUser());
    }

}
