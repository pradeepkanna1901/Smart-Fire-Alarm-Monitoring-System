package com.firealarm.backend.service;

import com.firealarm.backend.entity.Incident;
import com.firealarm.backend.repository.IncidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentService {

    @Autowired
    private IncidentRepository repository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private NotificationService notificationService;

    // Get all incidents
    public List<Incident> getAllIncidents() {
        return repository.findAll();
    }

    // Add incident, send email and live notification
    public Incident saveIncident(Incident incident) {

        Incident savedIncident = repository.save(incident);

        // ===========================
        // Send Email
        // ===========================

        String subject = "🚨 FIRE INCIDENT ALERT";

        String message =
                "A new fire incident has been reported.\n\n" +
                "====================================\n" +
                "Incident Type : " + savedIncident.getIncidentType() + "\n" +
                "Location      : " + savedIncident.getLocation() + "\n" +
                "Severity      : " + savedIncident.getSeverity() + "\n" +
                "Status        : " + savedIncident.getStatus() + "\n" +
                "Reported Time : " + savedIncident.getReportedTime() + "\n" +
                "====================================\n\n" +
                "Please take immediate action.\n\n" +
                "Smart Fire Alarm Monitoring System";

        emailService.sendFireAlert(subject, message);

        // ===========================
        // Send Live Notification
        // ===========================

        notificationService.sendNotification(
                "🚨 FIRE INCIDENT!\n\n" +
                "Type: " + savedIncident.getIncidentType() +
                "\nLocation: " + savedIncident.getLocation() +
                "\nSeverity: " + savedIncident.getSeverity() +
                "\nStatus: " + savedIncident.getStatus()
        );

        return savedIncident;
    }

    // Update incident
    public Incident updateIncident(Long id, Incident incident) {

        Incident existing = repository.findById(id).orElseThrow();

        existing.setIncidentType(incident.getIncidentType());
        existing.setLocation(incident.getLocation());
        existing.setSeverity(incident.getSeverity());
        existing.setStatus(incident.getStatus());
        existing.setReportedTime(incident.getReportedTime());

        return repository.save(existing);
    }

    // Delete incident
    public void deleteIncident(Long id) {
        repository.deleteById(id);
    }
}