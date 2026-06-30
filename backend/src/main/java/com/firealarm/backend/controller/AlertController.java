package com.firealarm.backend.controller;

import com.firealarm.backend.entity.Alert;
import com.firealarm.backend.service.AlertService;
import com.firealarm.backend.service.EmailService;
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

    @Autowired
    private EmailService emailService;

    // View all alerts
    @GetMapping
    public List<Alert> getAllAlerts() {
        return service.getAllAlerts();
    }

    // Add alert
    @PostMapping
    public Alert addAlert(@RequestBody Alert alert) {

        Alert savedAlert = service.saveAlert(alert);

        if (alert.getSeverity() != null &&
                alert.getSeverity().equalsIgnoreCase("Critical")) {

            emailService.sendFireAlert(
                    "🔥 FIRE ALERT - CRITICAL",
                    "A Critical Fire Alert has been detected.\n\n"
                            + "Location: " + alert.getLocation() + "\n"
                            + "Alert Type: " + alert.getAlertType() + "\n"
                            + "Severity: " + alert.getSeverity() + "\n"
                            + "Status: " + alert.getStatus() + "\n"
                            + "Time: " + alert.getTime()
            );
        }

        return savedAlert;
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