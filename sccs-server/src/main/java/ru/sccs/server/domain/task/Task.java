package ru.sccs.server.domain.task;

import jakarta.persistence.*;
import lombok.*;
import ru.sccs.server.domain.user.User;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tasks")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "task_id")
    private List<ChatMessage> chatMessages = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tasks_users",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "users_id")
    )
    private Set<User> assignees = new LinkedHashSet<>();

}
