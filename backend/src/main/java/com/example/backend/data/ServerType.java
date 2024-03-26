package com.example.backend.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum ServerType {
    WEB("Веб-сервис"), GAME("Игровой"), VPN("Бесплатный VPN");
    private String rusName;
}
