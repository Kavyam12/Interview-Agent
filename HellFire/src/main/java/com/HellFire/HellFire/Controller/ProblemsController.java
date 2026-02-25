package com.HellFire.HellFire.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/problems")
@CrossOrigin(origins = "*")
public class ProblemsController {

    @GetMapping
    public ResponseEntity<List<Map<String, String>>> getProblems() {
        List<Map<String, String>> problems = new ArrayList<>();

        Map<String, String> p1 = new HashMap<>();
        p1.put("id", "1");
        p1.put("title", "Reverse a String");
        p1.put("difficulty", "Easy");
        p1.put("description",
                "Write a function that reverses a string. The input string is given as an array of characters s.");
        problems.add(p1);

        Map<String, String> p2 = new HashMap<>();
        p2.put("id", "2");
        p2.put("title", "Two Sum");
        p2.put("difficulty", "Medium");
        p2.put("description",
                "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.");
        problems.add(p2);

        Map<String, String> p3 = new HashMap<>();
        p3.put("id", "3");
        p3.put("title", "LRU Cache");
        p3.put("difficulty", "Hard");
        p3.put("description",
                "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.");
        problems.add(p3);

        return ResponseEntity.ok(problems);
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitSolutions(@RequestBody Map<String, Object> payload) {
        System.out.println("Received solutions: " + payload);
        return ResponseEntity.ok(Map.of("message", "Solutions submitted successfully"));
    }
}
