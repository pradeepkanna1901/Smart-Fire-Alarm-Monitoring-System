package com.firealarm.backend.service;

import com.firealarm.backend.entity.Report;
import com.firealarm.backend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository repository;

    // Get all reports
    public List<Report> getAllReports() {
        return repository.findAll();
    }

    // Add report
    public Report saveReport(Report report) {
        return repository.save(report);
    }

    // Update report
    public Report updateReport(Long id, Report report) {

        Report existing = repository.findById(id).orElseThrow();

        existing.setReportName(report.getReportName());
        existing.setReportType(report.getReportType());
        existing.setGeneratedDate(report.getGeneratedDate());
        existing.setStatus(report.getStatus());

        return repository.save(existing);
    }

    // Delete report
    public void deleteReport(Long id) {
        repository.deleteById(id);
    }
}