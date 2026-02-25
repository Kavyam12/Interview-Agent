package com.HellFire.HellFire.Service;

import com.HellFire.HellFire.DTO.ResumeRequest;
import com.HellFire.HellFire.DTO.ResumeResponse;
import com.HellFire.HellFire.Model.Resume;
import com.HellFire.HellFire.Model.User;
import com.HellFire.HellFire.Repository.ResumeRepository;
import com.HellFire.HellFire.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Upload and save resume details
     */
    public ResumeResponse uploadResume(ResumeRequest resumeRequest) {
        User user = null;
        if (resumeRequest.getUserId() != null) {
            user = userRepository.findById(resumeRequest.getUserId())
                    .orElse(null); // Allow null user for hackathon quick testing if needed
        }

        Resume resume = new Resume();
        if (user != null) {
            resume.setUser(user);
        }
        resume.setFullName(resumeRequest.getFullName());
        resume.setEmail(resumeRequest.getEmail());
        resume.setPhoneNumber(resumeRequest.getPhoneNumber());
        resume.setSummary(resumeRequest.getSummary());
        resume.setEducation(resumeRequest.getEducation());
        resume.setSkills(resumeRequest.getSkills());
        resume.setExperience(resumeRequest.getExperience());
        resume.setCertifications(resumeRequest.getCertifications());
        resume.setLanguages(resumeRequest.getLanguages());
        resume.setLinks(resumeRequest.getLinks());
        resume.setRawResumeText(resumeRequest.getRawResumeText());
        resume.setUploadedAt(LocalDateTime.now());
        resume.setUpdatedAt(LocalDateTime.now());

        Resume savedResume = resumeRepository.save(resume);
        return convertToResponse(savedResume);
    }

    /**
     * Get all resumes for a user
     */
    public List<ResumeResponse> getResumesByUserId(Long userId) {
        return resumeRepository.findByUserId(userId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get a specific resume by ID
     */
    public ResumeResponse getResumeById(Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found with id: " + resumeId));
        return convertToResponse(resume);
    }

    /**
     * Get a specific resume by ID and user ID
     */
    public ResumeResponse getResumeByIdAndUserId(Long resumeId, Long userId) {
        Resume resume = resumeRepository.findByIdAndUserId(resumeId, userId)
                .orElseThrow(
                        () -> new RuntimeException("Resume not found with id: " + resumeId + " for user: " + userId));
        return convertToResponse(resume);
    }

    /**
     * Update resume
     */
    public ResumeResponse updateResume(Long resumeId, ResumeRequest resumeRequest) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found with id: " + resumeId));

        if (resumeRequest.getFullName() != null)
            resume.setFullName(resumeRequest.getFullName());
        if (resumeRequest.getEmail() != null)
            resume.setEmail(resumeRequest.getEmail());
        if (resumeRequest.getPhoneNumber() != null)
            resume.setPhoneNumber(resumeRequest.getPhoneNumber());
        if (resumeRequest.getSummary() != null)
            resume.setSummary(resumeRequest.getSummary());
        if (resumeRequest.getEducation() != null)
            resume.setEducation(resumeRequest.getEducation());
        if (resumeRequest.getSkills() != null)
            resume.setSkills(resumeRequest.getSkills());
        if (resumeRequest.getExperience() != null)
            resume.setExperience(resumeRequest.getExperience());
        if (resumeRequest.getCertifications() != null)
            resume.setCertifications(resumeRequest.getCertifications());
        if (resumeRequest.getLanguages() != null)
            resume.setLanguages(resumeRequest.getLanguages());
        if (resumeRequest.getLinks() != null)
            resume.setLinks(resumeRequest.getLinks());
        if (resumeRequest.getRawResumeText() != null)
            resume.setRawResumeText(resumeRequest.getRawResumeText());

        resume.setUpdatedAt(LocalDateTime.now());

        Resume updatedResume = resumeRepository.save(resume);
        return convertToResponse(updatedResume);
    }

    /**
     * Delete resume
     */
    public void deleteResume(Long resumeId) {
        if (!resumeRepository.existsById(resumeId)) {
            throw new RuntimeException("Resume not found with id: " + resumeId);
        }
        resumeRepository.deleteById(resumeId);
    }

    /**
     * Convert Resume entity to ResumeResponse DTO
     */
    private ResumeResponse convertToResponse(Resume resume) {
        ResumeResponse response = new ResumeResponse();
        response.setId(resume.getId());
        if (resume.getUser() != null) {
            response.setUserId(resume.getUser().getId());
        }
        response.setFullName(resume.getFullName());
        response.setEmail(resume.getEmail());
        response.setPhoneNumber(resume.getPhoneNumber());
        response.setSummary(resume.getSummary());
        response.setEducation(resume.getEducation());
        response.setSkills(resume.getSkills());
        response.setExperience(resume.getExperience());
        response.setCertifications(resume.getCertifications());
        response.setLanguages(resume.getLanguages());
        response.setLinks(resume.getLinks());
        response.setRawResumeText(resume.getRawResumeText());
        response.setUploadedAt(resume.getUploadedAt());
        response.setUpdatedAt(resume.getUpdatedAt());
        return response;
    }
}
