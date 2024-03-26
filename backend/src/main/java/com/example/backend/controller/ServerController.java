package com.example.backend.controller;

import com.example.backend.configuration.ApiVersionSettings;
import com.example.backend.data.ErrorResponse;
import com.example.backend.data.GetServerParam;
import com.example.backend.data.Id;
import com.example.backend.data.Server;
import com.example.backend.mapper.ServerMapper;
import com.example.backend.data.ServerPageResponseDTO;
import com.example.backend.data.ServerResponseDto;
import com.example.backend.filter.ServerSpecification;
import com.example.backend.repository.ServerRepository;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequiredArgsConstructor
public class ServerController {

    private final ApiVersionSettings apiVersionSettings;
    private final ServerRepository serverRepository;
    private final ServerMapper serverMapper;
    private final ServerSpecification serverSpecification;

    @Operation(summary = "Возвращает версию api", description = "Возвращает актуальную версию api")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Успешное выполнение"),
            @ApiResponse(code = 404, message = "Не найдено - продукт был не найден")
    })
    @GetMapping("/version")
    public ResponseEntity<String> getVersion() {
        return ResponseEntity.ok(apiVersionSettings.getVersion());
    }

    @Operation(summary = "Получить список серверов", description = "Возвращает список всех серверов")
    @GetMapping("${api.version}/servers")
    public ServerPageResponseDTO getServers(@Valid GetServerParam getServerParam) {

        Date startDate = null;
        Date endDate = null;

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        try {
            if (getServerParam.getStartDateStr() != null) {
                startDate = dateFormat.parse(getServerParam.getStartDateStr());
            }

            if (getServerParam.getEndDateStr() != null) {
                endDate = dateFormat.parse(getServerParam.getEndDateStr());
            }
        } catch (ParseException e) {
            System.out.println(e.getMessage());
        }

        Sort.Direction sortDirection = Sort.Direction.fromString(getServerParam.getDirection());

        Pageable pageable = PageRequest.of(getServerParam.getPage(), getServerParam.getSize(), sortDirection, getServerParam.getField());
        Specification<Server> spec = serverSpecification.filterByCriteria(startDate, endDate, getServerParam.getName(), getServerParam.getStatus(), getServerParam.getType(), getServerParam.getIndicator());

        Page<Server> serverPage = serverRepository.findAll(spec, pageable);

        long totalElements = serverPage.getTotalElements();
        var response = serverMapper.serverPageToServerResponseDtoList(serverPage);
        return new ServerPageResponseDTO(response, totalElements);
    }

    @Operation(summary = "Создать новый сервер", description = "Создает новый сервер по переданному json")
    @PostMapping("${api.version}/server")
    public Id createServer(@Valid @RequestBody ServerResponseDto serverResponseDto) {
        Id id = new Id();
        Server server = serverMapper.serverResponseDtoToServer(serverResponseDto);
        Server newServer = serverRepository.save(server);
        id.setId(newServer.getId());
        return id;
    }

    @Operation(summary = "Получить сервер по id", description = "Возвращает сервер по переданному id")
    @GetMapping("${api.version}/server/{id}")
    public ServerResponseDto getServerById(@Valid @PathVariable("id") @NotNull @Min(0) Long id) {
        if (id == null || id < 0) {
            throw new IllegalArgumentException("Неверно указано id");
        }
        var optionalServer = serverRepository.findById(id);
        Server server = optionalServer.orElseThrow(() -> {
            throw new IllegalArgumentException();
        });
        return serverMapper.serverToServerResponseDto(server);
    }

    @Operation(summary = "Удалить сервер", description = "Удаляет сервер по переданному id")
    @DeleteMapping("${api.version}/server/{id}")
    public Id deleteServerById(@Valid @PathVariable("id") @NotNull @Min(0) Long id) {
        serverRepository.deleteById(id);
        Id requestId = new Id();
        requestId.setId(id);
        return requestId;
    }

    @Operation(summary = "Обновить информацию о сервере", description = "По переданной информации обновляет сервер или создает новый если сервер с указанным id не существует")
    @PutMapping("${api.version}/server")
    public Id updateServer(@Valid @RequestBody ServerResponseDto updatedServerDto) {
        Server updatedServer = serverMapper.serverResponseDtoToServer(updatedServerDto);
        Server existingServer = serverRepository.save(updatedServer);
        Id requestId = new Id();
        requestId.setId(existingServer.getId());
        return requestId;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ErrorResponse handleValidationExceptions(MethodArgumentNotValidException ex) {
        var errors = ex.getAllErrors();
        if (errors.isEmpty()) {
            return new ErrorResponse();
        }
        var firstError = ex.getAllErrors().get(0);
        return new ErrorResponse(((FieldError) firstError).getField(), firstError.getDefaultMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BindException.class)
    public ErrorResponse handleValidationExceptions(BindException ex) {
        var errors = ex.getAllErrors();
        if (errors.isEmpty()) {
            return new ErrorResponse();
        }
        var firstError = ex.getAllErrors().get(0);
        return new ErrorResponse(((FieldError) firstError).getField(), firstError.getDefaultMessage());
    }

}