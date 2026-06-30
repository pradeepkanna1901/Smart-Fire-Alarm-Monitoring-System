package com.firealarm.backend.controller;

import com.firealarm.backend.entity.Report;
import com.firealarm.backend.service.EmailService;
import com.firealarm.backend.service.ExcelService;
import com.firealarm.backend.service.PdfService;
import com.firealarm.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    public ReportController() {
        System.out.println("===== ReportController Loaded =====");
    }

    @Autowired
    private ReportService reportService;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private ExcelService excelService;

    @Autowired
    private EmailService emailService;

    // Get all reports
    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }

    // Add report
    @PostMapping
    public Report addReport(@RequestBody Report report) {
        return reportService.saveReport(report);
    }

    // Update report
    @PutMapping("/{id}")
    public Report updateReport(@PathVariable Long id,
                               @RequestBody Report report) {
        return reportService.updateReport(id, report);
    }

    // Delete report
    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
    }

    // Download PDF
    @GetMapping("/pdf")
    public ResponseEntity<InputStreamResource> downloadPdf() {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition",
                "attachment; filename=FireAlarmReport.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(pdfService.generateReport()));
    }

    // Download Excel
    @GetMapping("/excel")
    public ResponseEntity<InputStreamResource> downloadExcel() {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition",
                "attachment; filename=FireAlarmReport.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(excelService.generateExcel()));
    }

    // Send Email
    @GetMapping("/email")
    public String sendEmail() {

        emailService.sendFireAlert(
                "Smart Fire Alarm Report",
                "Fire Alarm Monitoring System Report generated successfully."
        );

        return "Email sent successfully!";
    }
}