package com.firealarm.backend.controller;

import com.firealarm.backend.entity.Settings;
import com.firealarm.backend.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
})
public class SettingsController {

    @Autowired
    private SettingsService service;

    @GetMapping
    public List<Settings> getAllSettings() {
        return service.getAllSettings();
    }

    @PostMapping
    public Settings saveSettings(@RequestBody Settings settings) {
        return service.saveSettings(settings);
    }

    @PutMapping("/{id}")
    public Settings updateSettings(@PathVariable Long id,
                                   @RequestBody Settings settings) {
        return service.updateSettings(id, settings);
    }

    @DeleteMapping("/{id}")
    public String deleteSettings(@PathVariable Long id) {
        service.deleteSettings(id);
        return "Settings deleted successfully!";
    }
}