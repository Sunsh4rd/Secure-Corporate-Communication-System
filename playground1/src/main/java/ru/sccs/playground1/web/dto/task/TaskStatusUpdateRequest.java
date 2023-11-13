package ru.sccs.playground1.web.dto.task;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.sccs.playground1.domain.task.Status;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskStatusUpdateRequest {
    private Status status;
}
