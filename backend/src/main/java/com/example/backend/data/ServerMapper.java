package com.example.backend.data;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.data.domain.Page;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ServerMapper {
    @Mapping(target = "creationDate", source = "creationDate", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "lastWorkDate", source = "lastWorkDate", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "updateDate", source = "updateDate", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "status", source = "status", qualifiedByName = "mapStatus")
    @Mapping(target = "type", source = "type", qualifiedByName = "mapType")
    Server serverResponseDtoToServer(ServerResponseDto serverResponseDto);
    ServerResponseDto serverToServerResponseDto(Server server);
    List<ServerResponseDto> serverListToServerResponseDto(List<Server> servers);
    List<ServerResponseDto> serverPageToServerResponseDtoList(Page<Server> servers);

    @Named("mapType")
    default int mapType(ServerType value){
        return value.ordinal();
    }
    @Named("mapStatus")
    default int mapStatus(ServerStatus value){
        return value.ordinal();
    }
}
