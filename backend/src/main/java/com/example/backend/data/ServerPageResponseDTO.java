package com.example.backend.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ServerPageResponseDTO {
    List<ServerResponseDto> serverResponseDtos;
    long totalElements;
}
