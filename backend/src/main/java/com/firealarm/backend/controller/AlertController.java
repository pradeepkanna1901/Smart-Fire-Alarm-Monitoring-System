package com.firealarm.backend.controller;

import com.firealarm.backend.entity.Alert;
import com.firealarm.backend.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
})
public class AlertController {

    @Autowired
    private AlertService service;

    // View all alerts
    @GetMapping
    public List<Alert> getAllAlerts() {
        return service.getAllAlerts();
    }

    // Add alert
    @PostMapping
    public Alert addAlert(@RequestBody Alert alert) {
        return service.saveAlert(alert);
    }

    // Update alert
    @PutMapping("/{id}")
    public Alert updateAlert(@PathVariable Long id,
                             @RequestBody Alert alert) {
        return service.updateAlert(id, alert);
    }

    // Delete alert
    @DeleteMapping("/{id}")
    public String deleteAlert(@PathVariable Long id) {
        service.deleteAlert(id);
        return "Alert deleted successfully!";
    }
}