package com.firealarm.backend.service;

import com.firealarm.backend.entity.Alert;
import com.firealarm.backend.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {

    @Autowired
    private AlertRepository repository;

    public List<Alert> getAllAlerts() {
        return repository.findAll();
    }

    public Alert saveAlert(Alert alert) {
        return repository.save(alert);
    }

    public Alert updateAlert(Long id, Alert alert) {
        Alert existing = repository.findById(id).orElseThrow();

        existing.setAlertType(alert.getAlertType());
        existing.setSeverity(alert.getSeverity());
        existing.setLocation(alert.getLocation());
        existing.setStatus(alert.getStatus());
        existing.setTime(alert.getTime());

        return repository.save(existing);
    }

    public void deleteAlert(Long id) {
        repository.deleteById(id);
    }
}