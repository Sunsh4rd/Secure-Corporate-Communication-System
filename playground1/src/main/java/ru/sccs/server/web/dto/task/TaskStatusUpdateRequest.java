package ru.sccs.server.web.dto.task;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.sccs.server.domain.task.Status;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskStatusUpdateRequest {
    private Status status;
}
