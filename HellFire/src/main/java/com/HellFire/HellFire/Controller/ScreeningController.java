package com.HellFire.HellFire.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/screening")
@CrossOrigin(origins = "*")
public class ScreeningController {

    @PostMapping
    public ResponseEntity<?> submitScreening(@RequestBody Map<String, Object> payload) {
        System.out.println("Received screening data: " + payload);
        // For MVP, we just acknowledge receipt
        return ResponseEntity.ok(Map.of("message", "Screening data received successfully"));
    }

    @PostMapping("/technical/submit")
    public ResponseEntity<?> submitTechnical(@RequestBody Map<String, Object> payload) {
        System.out.println("Received technical data: " + payload);
        return ResponseEntity.ok(Map.of("message", "Technical assessment received successfully"));
    }
}
