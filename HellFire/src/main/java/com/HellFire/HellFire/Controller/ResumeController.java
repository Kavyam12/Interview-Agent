package com.HellFire.HellFire.Controller;

import com.HellFire.HellFire.DTO.ResumeRequest;
import com.HellFire.HellFire.DTO.ResumeResponse;
import com.HellFire.HellFire.Service.ResumeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    /**
     * Upload resume details extracted from PDF via LLM
     * POST: /api/resume/upload
     */
    @PostMapping("/upload")
    public ResponseEntity<ResumeResponse> uploadResume(@Valid @RequestBody ResumeRequest resumeRequest) {
        ResumeResponse response = resumeService.uploadResume(resumeRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get all resumes for a specific user
     * GET: /api/resume/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ResumeResponse>> getResumesByUserId(@PathVariable Long userId) {
        List<ResumeResponse> resumes = resumeService.getResumesByUserId(userId);
        return new ResponseEntity<>(resumes, HttpStatus.OK);
    }

    /**
     * Get a specific resume by ID
     * GET: /api/resume/{resumeId}
     */
    @GetMapping("/{resumeId}")
    public ResponseEntity<ResumeResponse> getResumeById(@PathVariable Long resumeId) {
        ResumeResponse response = resumeService.getResumeById(resumeId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get a specific resume by ID and user ID (secure endpoint)
     * GET: /api/resume/{resumeId}/user/{userId}
     */
    @GetMapping("/{resumeId}/user/{userId}")
    public ResponseEntity<ResumeResponse> getResumeByIdAndUserId(@PathVariable Long resumeId,
            @PathVariable Long userId) {
        ResumeResponse response = resumeService.getResumeByIdAndUserId(resumeId, userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Update resume details
     * PUT: /api/resume/{resumeId}
     */
    @PutMapping("/{resumeId}")
    public ResponseEntity<ResumeResponse> updateResume(@PathVariable Long resumeId,
            @Valid @RequestBody ResumeRequest resumeRequest) {
        ResumeResponse response = resumeService.updateResume(resumeId, resumeRequest);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Delete a resume
     * DELETE: /api/resume/{resumeId}
     */
    @DeleteMapping("/{resumeId}")
    public ResponseEntity<String> deleteResume(@PathVariable Long resumeId) {
        resumeService.deleteResume(resumeId);
        return new ResponseEntity<>("Resume deleted successfully", HttpStatus.OK);
    }
}
