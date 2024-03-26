package com.example.backend;

import com.example.backend.configuration.ApplicationConfiguration;
import com.example.backend.service.ServerController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(controllers = ServerController.class)
@ContextConfiguration(classes = {ApplicationConfiguration.class, ServerController.class})
public class VersionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetVersion() throws Exception {
        String expectedVersion = "1.0"; // Задайте здесь ожидаемую версию

        mockMvc.perform(MockMvcRequestBuilders.get("/version")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(expectedVersion));
    }
}

