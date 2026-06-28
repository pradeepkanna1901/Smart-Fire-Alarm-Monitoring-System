package com.firealarm.backend.service;

import com.firealarm.backend.entity.Sensor;
import com.firealarm.backend.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SensorService {

    @Autowired
    private SensorRepository repository;

    public List<Sensor> getAllSensors() {
        return repository.findAll();
    }

    public Sensor saveSensor(Sensor sensor) {
        return repository.save(sensor);
    }

    public Sensor updateSensor(Long id, Sensor sensor) {
        sensor.setId(id);
        return repository.save(sensor);
    }

    public void deleteSensor(Long id) {
        repository.deleteById(id);
    }
}