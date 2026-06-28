package com.firealarm.backend.service;

import com.firealarm.backend.entity.Settings;
import com.firealarm.backend.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingsService {

    @Autowired
    private SettingsRepository repository;

    public List<Settings> getAllSettings() {
        return repository.findAll();
    }

    public Settings saveSettings(Settings settings) {
        return repository.save(settings);
    }

    public Settings updateSettings(Long id, Settings settings) {

        Settings existing = repository.findById(id).orElseThrow();

        existing.setAdminEmail(settings.getAdminEmail());
        existing.setTemperature(settings.getTemperature());
        existing.setSmoke(settings.getSmoke());
        existing.setNotifications(settings.isNotifications());

        return repository.save(existing);
    }

    public void deleteSettings(Long id) {
        repository.deleteById(id);
    }
}