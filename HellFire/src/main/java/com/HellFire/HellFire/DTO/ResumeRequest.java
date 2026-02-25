package com.HellFire.HellFire.DTO;

import java.util.List;

public class ResumeRequest {

    private Long userId;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String summary;
    private List<String> education;
    private List<String> skills;
    private List<String> experience;
    private List<String> certifications;
    private List<String> languages;
    private List<String> links;
    private String rawResumeText;

    private String resumeContent; // Alias

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getEducation() {
        return education;
    }

    public void setEducation(List<String> education) {
        this.education = education;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<String> getExperience() {
        return experience;
    }

    public void setExperience(List<String> experience) {
        this.experience = experience;
    }

    public List<String> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<String> certifications) {
        this.certifications = certifications;
    }

    public List<String> getLanguages() {
        return languages;
    }

    public void setLanguages(List<String> languages) {
        this.languages = languages;
    }

    public List<String> getLinks() {
        return links;
    }

    public void setLinks(List<String> links) {
        this.links = links;
    }

    public String getRawResumeText() {
        if (rawResumeText == null)
            return resumeContent;
        return rawResumeText;
    }

    public void setRawResumeText(String rawResumeText) {
        this.rawResumeText = rawResumeText;
    }

    public String getResumeContent() {
        return getRawResumeText();
    }

    public void setResumeContent(String resumeContent) {
        this.resumeContent = resumeContent;
        if (this.rawResumeText == null) {
            this.rawResumeText = resumeContent;
        }
    }

    // Alias to match simple request
    public String getName() {
        return fullName;
    }

    public void setName(String name) {
        this.fullName = name;
    }
}
