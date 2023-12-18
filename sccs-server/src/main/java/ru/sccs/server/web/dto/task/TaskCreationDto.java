package ru.sccs.server.web.dto.task;

import lombok.Data;

@Data
public class TaskCreationDto {

    private String title;
    private String description;

}
