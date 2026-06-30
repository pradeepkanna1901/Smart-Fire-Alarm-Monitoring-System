package com.firealarm.backend.service;

import com.firealarm.backend.repository.AlertRepository;
import com.firealarm.backend.repository.IncidentRepository;
import com.firealarm.backend.repository.ReportRepository;
import com.firealarm.backend.repository.SensorRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private IncidentRepository incidentRepository;

    @Autowired
    private ReportRepository reportRepository;

    public void sendFireAlert(String subject, String message) {

        try {

            long sensorCount = sensorRepository.count();
            long alertCount = alertRepository.count();
            long incidentCount = incidentRepository.count();
            long reportCount = reportRepository.count();

            MimeMessage mimeMessage = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, true);

            helper.setTo("pradeepkanna1901@gmail.com");
            helper.setSubject(subject);

            String body =
                    "Dear User,\n\n" +
                    "Smart Fire Alarm Monitoring System Report\n\n" +
                    "Dashboard Summary\n" +
                    "-----------------------------\n" +
                    "Sensors      : " + sensorCount + "\n" +
                    "Alerts       : " + alertCount + "\n" +
                    "Incidents    : " + incidentCount + "\n" +
                    "Reports      : " + reportCount + "\n\n" +
                    "Status : System Running Normally\n\n" +
                    "Please find the attached PDF report.\n\n" +
                    "Regards,\n" +
                    "Smart Fire Alarm Monitoring System";

            helper.setText(body);

            byte[] pdf = pdfService.generateReport().readAllBytes();

            helper.addAttachment(
                    "FireAlarmReport.pdf",
                    new ByteArrayResource(pdf)
            );

            mailSender.send(mimeMessage);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}