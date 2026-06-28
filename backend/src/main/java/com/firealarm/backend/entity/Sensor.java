package com.firealarm.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "sensors")
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sensorName;
    private String location;
    private String status;
    private Double temperature;
    private Double smokeLevel;

    public Sensor() {
    }

    public Sensor(Long id, String sensorName, String location, String status,
                  Double temperature, Double smokeLevel) {
        this.id = id;
        this.sensorName = sensorName;
        this.location = location;
        this.status = status;
        this.temperature = temperature;
        this.smokeLevel = smokeLevel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSensorName() {
        return sensorName;
    }

    public void setSensorName(String sensorName) {
        this.sensorName = sensorName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Double getSmokeLevel() {
        return smokeLevel;
    }

    public void setSmokeLevel(Double smokeLevel) {
        this.smokeLevel = smokeLevel;
    }
}