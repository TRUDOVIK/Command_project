package com.example.backend.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum ServerStatus {
    DEAD("Лежит"), WORK("Работает"), UNKNOWN("Не определен");
    private String rusStatus;
}
