package ru.sccs.server.web.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.sccs.server.domain.task.ChatMessage;
import ru.sccs.server.domain.task.Status;
import ru.sccs.server.domain.task.Task;
import ru.sccs.server.domain.user.User;
import ru.sccs.server.web.dto.task.TaskCreationDto;
import ru.sccs.server.web.dto.task.TaskDto;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

@Mapper
public interface TaskMapper {

    TaskDto toDto(Task task);

    List<TaskDto> toDto(List<Task> tasks);

    Task toEntity(TaskDto dto);

    @Mapping(source = ".", target = "chatMessages", qualifiedByName = "newChatMessages")
    @Mapping(source = ".", target = "assignees", qualifiedByName = "newAssignees")
    @Mapping(source = ".", target = "status", qualifiedByName = "defaultStatus")
    Task toEntity(TaskCreationDto dto);

    @Named("newChatMessages")
    default ArrayList<ChatMessage> newChatMessages(TaskCreationDto dto) {
        return new ArrayList<>();
    }

    @Named("newAssignees")
    default LinkedHashSet<User> newAssignees(TaskCreationDto dto) {
        return new LinkedHashSet<>();
    }

    @Named("defaultStatus")
    default Status defaultStatus(TaskCreationDto dto) {
        return Status.TODO;
    }

}
