package ru.sccs.server.domain.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

//    private List<Task> tasks;

}
