package ru.sccs.server.web.dto.task;

import lombok.Data;
import ru.sccs.server.domain.task.Status;

@Data
public class TaskDTO {

    private Long id;
    private String title;
    private String description;
    private Status status;

}
