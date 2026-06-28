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

    // Get all incidents
    public List<Incident> getAllIncidents() {
        return repository.findAll();
    }

    // Add incident
    public Incident saveIncident(Incident incident) {
        return repository.save(incident);
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