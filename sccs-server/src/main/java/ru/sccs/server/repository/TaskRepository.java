package ru.sccs.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sccs.server.domain.task.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

}
