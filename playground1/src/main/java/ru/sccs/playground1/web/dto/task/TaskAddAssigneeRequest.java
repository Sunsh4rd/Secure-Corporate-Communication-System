package ru.sccs.playground1.web.dto.task;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskAddAssigneeRequest {
    private String username;
}
