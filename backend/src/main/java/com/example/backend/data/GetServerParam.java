package com.example.backend.data;

import com.example.backend.filter.DateConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@DateCorrectOrder(fieldStart = "startDateStr", fieldEnd = "endDateStr", message = "Дата начала фильтрации позже, чем дата конца")
public class GetServerParam {
    @PositiveOrZero(message ="Номер страницы не должен быть отрицательным")
    private int page = 0;
    @PositiveOrZero(message ="Размер страницы не должен быть отрицательным")
    private int size = 10;
    private String field = "id";
    @Pattern(regexp = "(desc|asc)", message = "Параметры сортировки переданы неверно")
    private String direction = "asc";
    private String name;
    @DateConstraint(message = "Неправильный формат даты")
    private String startDateStr;
    @DateConstraint(message = "Неправильный формат даты")
    private String endDateStr;
    @Min(value = 0, message = "Указано неверное значение типа") @Max(value = 2, message = "Указано неверное значение типа")
    private Integer status;
    @Min(value = 0, message = "Указано неверное значение типа") @Max(value = 2, message = "Указано неверное значение типа")
    private Integer type;
    private String indicator;
}
