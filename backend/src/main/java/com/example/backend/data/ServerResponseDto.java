package com.example.backend.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.validation.constraints.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ServerResponseDto {

    private Long id;
    @NotBlank(message = "Имя не должно состоять из пробелов и не должно быть пустым")
    @NotNull(message = "Имя является обязательным параметром")
    private String name;
    @NotNull(message = "Дата создания является обязательным параметром")
    @DateConstraint(message = "Неправильный формат даты")
    private String creationDate;
    @NotNull(message = "Тип сервера является обязательным параметром")
    private ServerType type;
    @NotNull(message = "Статус сервера является обязательным параметром")
    private ServerStatus status;
    @DateConstraint(message = "Неправильный формат даты")
    private String lastWorkDate;
    @NotBlank(message = "Описание не должно состоять из пробелов и не должно быть пустым")
    private String description;
    @NotBlank(message = "Адрес сервера не должен состоять из пробелов и не должен быть пустым")
    private String serverAddress;
    @NotBlank(message = "Комментарий не должен состоять из пробелов и не должен быть пустым")
    private String serverComment;
    private int pollingInterval;
    @DateConstraint(message = "Неправильный формат даты")
    private String updateDate;
    @NotBlank(message = "Дополнительные показатели не должны состоять из пробелов и не должны быть пустыми")
    private String additionalIndicators;
}
