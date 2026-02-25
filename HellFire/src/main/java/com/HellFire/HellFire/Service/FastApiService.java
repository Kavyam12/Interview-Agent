package com.HellFire.HellFire.Service;

import com.HellFire.HellFire.DTO.ResumeRequest;
import com.HellFire.HellFire.DTO.Round3Submission;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FastApiService {

    private final RestTemplate restTemplate;

    @Value("${fastapi.url}")
    private String fastApiUrl;

    public FastApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getAtsScore(ResumeRequest resumeRequest) {
        String url = fastApiUrl + "/recom";
        // Using query parameters as per the python snippet
        String resumeData = resumeRequest.getResumeContent(); // Assuming content is what they mean by userdata
        if (resumeData == null || resumeData.isEmpty()) {
            resumeData = "Default User Data";
        }

        // Construct URL with params manually and safely encode
        String finalUrl = org.springframework.web.util.UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("userdata", resumeData)
                .toUriString();

        try {
            // POST request with query params
            return restTemplate.postForObject(finalUrl, null, String.class);
        } catch (org.springframework.web.client.ResourceAccessException e) {
            return "{\"error\": \"Mock ATS score: Connection Refused to " + url + "\"}";
        }
    }

    public String getInterviewQuestions() {
        String url = fastApiUrl + "/resaom";
        String jobDescription = "Frontend Engineer";
        String finalUrl = org.springframework.web.util.UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("job_description", jobDescription)
                .toUriString();

        try {
            return restTemplate.postForObject(finalUrl, null, String.class);
        } catch (org.springframework.web.client.ResourceAccessException e) {
            return "{\"questions\": [\"Mock Question 1\", \"Mock Question 2\"]}";
        }
    }

    public String getRound3Questions() {
        return "Please specify endpoint for fetching Round 3 questions or use Round 2 questions.";
    }

    public String evaluateRound3(Round3Submission submission) {
        String url = fastApiUrl + "/reom";
        // /reom takes params: qestions, answers
        String questionsStr = String.join(" | ", submission.getQuestions());
        String answersStr = String.join(" | ", submission.getAnswers());

        String finalUrl = org.springframework.web.util.UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("qestions", questionsStr)
                .queryParam("answers", answersStr)
                .toUriString();

        try {
            return restTemplate.postForObject(finalUrl, null, String.class);
        } catch (org.springframework.web.client.ResourceAccessException e) {
            return "{\"evaluation\": \"Mock evaluation: Connection Refused to " + url + "\"}";
        }
    }
}
