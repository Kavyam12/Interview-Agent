package com.HellFire.HellFire.DTO;

import com.HellFire.HellFire.Model.Role;

public class LoginResponse {

    private Long userId;
    private String email;

    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }



}
