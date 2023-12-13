package ru.sccs.server.domain.task;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "chat_messages")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long senderId;
    private String content;
    private String sentAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm"));
}
