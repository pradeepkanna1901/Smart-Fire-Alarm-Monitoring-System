package com.firealarm.backend.controller;

import com.firealarm.backend.entity.Incident;
import com.firealarm.backend.service.IncidentService;
import com.firealarm.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
})
public class IncidentController {

    @Autowired
    private IncidentService service;

    @Autowired
    private NotificationService notificationService;

    // View all incidents
    @GetMapping
    public List<Incident> getAllIncidents() {
        return service.getAllIncidents();
    }

    // Add incident
    @PostMapping
    public Incident addIncident(@RequestBody Incident incident) {

        Incident savedIncident = service.saveIncident(incident);

        notificationService.sendNotification(
                "🚨 New Fire Incident: "
                        + savedIncident.getIncidentType()
                        + " | "
                        + savedIncident.getLocation()
                        + " | "
                        + savedIncident.getSeverity()
        );

        return savedIncident;
    }

    // Update incident
    @PutMapping("/{id}")
    public Incident updateIncident(@PathVariable Long id,
                                   @RequestBody Incident incident) {
        return service.updateIncident(id, incident);
    }

    // Delete incident
    @DeleteMapping("/{id}")
    public String deleteIncident(@PathVariable Long id) {
        service.deleteIncident(id);
        return "Incident deleted successfully!";
    }
}