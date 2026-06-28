package com.firealarm.backend.controller;

import com.firealarm.backend.entity.Sensor;
import com.firealarm.backend.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sensors")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
})
public class SensorController {

    @Autowired
    private SensorService service;

    @GetMapping
    public List<Sensor> getSensors() {
        return service.getAllSensors();
    }

    @PostMapping
    public Sensor addSensor(@RequestBody Sensor sensor) {
        return service.saveSensor(sensor);
    }

    @PutMapping("/{id}")
    public Sensor updateSensor(@PathVariable Long id,
                               @RequestBody Sensor sensor) {
        return service.updateSensor(id, sensor);
    }

    @DeleteMapping("/{id}")
    public String deleteSensor(@PathVariable Long id) {
        service.deleteSensor(id);
        return "Sensor deleted successfully!";
    }
}