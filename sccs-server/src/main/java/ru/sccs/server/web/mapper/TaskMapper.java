package ru.sccs.server.web.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.sccs.server.domain.task.ChatMessage;
import ru.sccs.server.domain.task.Status;
import ru.sccs.server.domain.task.Task;
import ru.sccs.server.domain.user.User;
import ru.sccs.server.web.dto.task.TaskCreationDTO;
import ru.sccs.server.web.dto.task.TaskDTO;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

@Mapper
public interface TaskMapper {

    TaskDTO toDto(Task task);

    List<TaskDTO> toDto(List<Task> tasks);

    Task toEntity(TaskDTO dto);

    @Mapping(source = ".", target = "chatMessages", qualifiedByName = "newChatMessages")
    @Mapping(source = ".", target = "assignees", qualifiedByName = "newAssignees")
    @Mapping(source = ".", target = "status", qualifiedByName = "defaultStatus")
    Task toEntity(TaskCreationDTO dto);

    @Named("newChatMessages")
    default ArrayList<ChatMessage> newChatMessages(TaskCreationDTO dto) {
        return new ArrayList<>();
    }

    @Named("newAssignees")
    default LinkedHashSet<User> newAssignees(TaskCreationDTO dto) {
        return new LinkedHashSet<>();
    }

    @Named("defaultStatus")
    default Status defaultStatus(TaskCreationDTO dto) {
        return Status.TODO;
    }

}
