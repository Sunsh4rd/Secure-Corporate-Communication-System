package ru.sccs.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sccs.server.domain.task.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
}
