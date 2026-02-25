package com.HellFire.HellFire.Controller;

import com.HellFire.HellFire.DTO.RegistrationRequest;
import com.HellFire.HellFire.DTO.UserResponse;
import com.HellFire.HellFire.Service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class RegistrationController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public UserResponse registration(@Valid @RequestBody RegistrationRequest registerRequest) {
        return authService.register(registerRequest);
    }
}
