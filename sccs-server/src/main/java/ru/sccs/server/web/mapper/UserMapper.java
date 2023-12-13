package ru.sccs.server.web.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.sccs.server.domain.user.Role;
import ru.sccs.server.domain.user.User;
import ru.sccs.server.web.dto.user.UserCreationDTO;
import ru.sccs.server.web.dto.user.UserDTO;

@Mapper
public interface UserMapper {

    UserDTO toDto(User user);

    User toEntity(UserDTO dto);

    @Mapping(source = ".", target = "role", qualifiedByName = "defaultRole")
    User toEntity(UserCreationDTO dto);

    @Named("defaultRole")
    default Role defaultRole(UserCreationDTO dto) {
        return Role.ROLE_ADMIN;
    }

}
