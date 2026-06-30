package com.firealarm.backend.service;

import com.firealarm.backend.repository.AlertRepository;
import com.firealarm.backend.repository.IncidentRepository;
import com.firealarm.backend.repository.ReportRepository;
import com.firealarm.backend.repository.SensorRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class ExcelService {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private IncidentRepository incidentRepository;

    @Autowired
    private ReportRepository reportRepository;

    public ByteArrayInputStream generateExcel() {

        try {

            XSSFWorkbook workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet("Dashboard Report");

            Row header = sheet.createRow(0);

            header.createCell(0).setCellValue("Sensors");
            header.createCell(1).setCellValue("Alerts");
            header.createCell(2).setCellValue("Incidents");
            header.createCell(3).setCellValue("Reports");

            Row row = sheet.createRow(1);

            row.createCell(0).setCellValue(sensorRepository.count());
            row.createCell(1).setCellValue(alertRepository.count());
            row.createCell(2).setCellValue(incidentRepository.count());
            row.createCell(3).setCellValue(reportRepository.count());

            ByteArrayOutputStream out = new ByteArrayOutputStream();

            workbook.write(out);
            workbook.close();

            return new ByteArrayInputStream(out.toByteArray());

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}