package com.firealarm.backend.controller;

import com.firealarm.backend.entity.Report;
import com.firealarm.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
})
public class ReportController {

    @Autowired
    private ReportService service;

    // View all reports
    @GetMapping
    public List<Report> getAllReports() {
        return service.getAllReports();
    }

    // Add report
    @PostMapping
    public Report addReport(@RequestBody Report report) {
        return service.saveReport(report);
    }

    // Update report
    @PutMapping("/{id}")
    public Report updateReport(@PathVariable Long id,
                               @RequestBody Report report) {
        return service.updateReport(id, report);
    }

    // Delete report
    @DeleteMapping("/{id}")
    public String deleteReport(@PathVariable Long id) {
        service.deleteReport(id);
        return "Report deleted successfully!";
    }
}