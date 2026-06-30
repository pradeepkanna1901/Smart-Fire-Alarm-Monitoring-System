package com.firealarm.backend.service;

import com.firealarm.backend.entity.Alert;
import com.firealarm.backend.entity.Incident;
import com.firealarm.backend.entity.Sensor;
import com.firealarm.backend.repository.AlertRepository;
import com.firealarm.backend.repository.IncidentRepository;
import com.firealarm.backend.repository.SensorRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PdfService {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private IncidentRepository incidentRepository;

    public ByteArrayInputStream generateReport() {

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);

            document.open();

            Font title =
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22);

            Paragraph p =
                    new Paragraph("SMART FIRE ALARM MONITORING SYSTEM", title);

            p.setAlignment(Element.ALIGN_CENTER);

            document.add(p);

            document.add(new Paragraph(" "));
            document.add(new Paragraph("Generated: " + LocalDateTime.now()));
            document.add(new Paragraph(" "));

            List<Sensor> sensors = sensorRepository.findAll();
            List<Alert> alerts = alertRepository.findAll();
            List<Incident> incidents = incidentRepository.findAll();

            document.add(new Paragraph("Total Sensors : " + sensors.size()));
            document.add(new Paragraph("Total Alerts : " + alerts.size()));
            document.add(new Paragraph("Total Incidents : " + incidents.size()));

            document.add(new Paragraph(" "));
            document.add(new Paragraph("===================================="));
            document.add(new Paragraph("SENSORS"));
            document.add(new Paragraph("===================================="));

            for (Sensor s : sensors) {

                document.add(new Paragraph(
                        s.getSensorName()
                                + " | "
                                + s.getLocation()
                                + " | "
                                + s.getStatus()
                ));
            }

            document.add(new Paragraph(" "));
            document.add(new Paragraph("===================================="));
            document.add(new Paragraph("ALERTS"));
            document.add(new Paragraph("===================================="));

            for (Alert a : alerts) {

                document.add(new Paragraph(
                        a.getAlertType()
                                + " | "
                                + a.getLocation()
                                + " | "
                                + a.getSeverity()
                ));
            }

            document.add(new Paragraph(" "));
            document.add(new Paragraph("===================================="));
            document.add(new Paragraph("INCIDENTS"));
            document.add(new Paragraph("===================================="));

            for (Incident i : incidents) {

                document.add(new Paragraph(
                        i.getIncidentType()
                                + " | "
                                + i.getLocation()
                                + " | "
                                + i.getStatus()
                ));
            }

            document.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}