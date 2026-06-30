package com.firealarm.backend.controller;

import com.firealarm.backend.repository.AlertRepository;
import com.firealarm.backend.repository.IncidentRepository;
import com.firealarm.backend.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
})
public class DashboardController {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private IncidentRepository incidentRepository;

    @GetMapping
    public Map<String, Object> getDashboardData() {

        Map<String, Object> data = new HashMap<>();

        data.put("totalSensors", sensorRepository.count());
        data.put("totalAlerts", alertRepository.count());
        data.put("totalIncidents", incidentRepository.count());

        // Add this line
        data.put("systemStatus", "ONLINE");

        return data;
    }
}