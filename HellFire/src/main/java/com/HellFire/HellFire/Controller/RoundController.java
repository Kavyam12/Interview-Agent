package com.HellFire.HellFire.Controller;

import com.HellFire.HellFire.DTO.ResumeRequest;
import com.HellFire.HellFire.DTO.Round3Submission;
import com.HellFire.HellFire.Model.Resume;
import com.HellFire.HellFire.Repository.ResumeRepository;
import com.HellFire.HellFire.Service.FastApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/round")
@CrossOrigin(origins = "*") // Allow frontend to call
public class RoundController {

    private final ResumeRepository resumeRepository;
    private final FastApiService fastApiService;

    public RoundController(ResumeRepository resumeRepository, FastApiService fastApiService) {
        this.resumeRepository = resumeRepository;
        this.fastApiService = fastApiService;
    }

    // Round 1: Submit Resume -> Save -> Get ATS Score
    @PostMapping("/1/submit")
    public ResponseEntity<?> submitResume(@RequestBody ResumeRequest request) {
        // 1. Save to DB
        Resume resume = new Resume();
        resume.setName(request.getName());
        resume.setEmail(request.getEmail());
        resume.setContent(request.getResumeContent());
        resume.setUploadedAt(java.time.LocalDateTime.now());
        resume.setUpdatedAt(java.time.LocalDateTime.now());
        resumeRepository.save(resume);

        // 2. Call Fast API
        String atsScoreResponse = fastApiService.getAtsScore(request);

        // 3. Update DB with score
        resume.setAtsScore(atsScoreResponse);
        resumeRepository.save(resume);

        return ResponseEntity.ok(atsScoreResponse);
    }

    // Round 2: Get Questions
    @GetMapping("/2/questions")
    public ResponseEntity<?> getQuestions() {
        String questionsResponse = fastApiService.getInterviewQuestions();
        return ResponseEntity.ok(questionsResponse);
    }

    // Round 3: Get Questions
    @GetMapping("/3/questions")
    public ResponseEntity<?> getRound3Questions() {
        String questionsResponse = fastApiService.getRound3Questions();
        return ResponseEntity.ok(questionsResponse);
    }

    // Round 3: Submit Answers & Evaluate
    @PostMapping("/3/submit")
    public ResponseEntity<?> submitRound3Answers(@RequestBody Round3Submission submission) {
        // You might want to save the submission to DB here as well
        String evaluationResponse = fastApiService.evaluateRound3(submission);
        return ResponseEntity.ok(evaluationResponse);
    }
}
