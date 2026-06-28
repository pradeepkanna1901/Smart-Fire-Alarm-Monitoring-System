package com.firealarm.backend.controller;

import com.firealarm.backend.dto.LoginRequest;
import com.firealarm.backend.dto.LoginResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        if ("admin".equals(request.getUsername())
                && "admin123".equals(request.getPassword())) {

            return new LoginResponse(true, "Login Successful");
        }

        return new LoginResponse(false, "Invalid Username or Password");
    }
}