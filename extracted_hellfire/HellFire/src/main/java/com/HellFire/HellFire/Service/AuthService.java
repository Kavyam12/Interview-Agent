package com.HellFire.HellFire.Service;

import com.HellFire.HellFire.DTO.LoginRequest;
import com.HellFire.HellFire.DTO.LoginResponse;
import com.HellFire.HellFire.DTO.RegistrationRequest;
import com.HellFire.HellFire.DTO.UserResponse;
import com.HellFire.HellFire.Model.Role;
import com.HellFire.HellFire.Model.User;
import com.HellFire.HellFire.Repository.UserRepository;
import com.HellFire.HellFire.Security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public UserResponse register(@Valid RegistrationRequest registerRequest) {

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(registerRequest.getRole() != null ? registerRequest.getRole() : Role.USER);
        user.setContactNumber(registerRequest.getContactNumber());
        user.setJobDescription(registerRequest.getJobDescription());

        User savedUser = userRepository.save(user);

        UserResponse userResponse = new UserResponse();
        userResponse.setUserid(savedUser.getId());
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setName(savedUser.getName());
        userResponse.setRole(savedUser.getRole());

        return userResponse;

    }

    public LoginResponse login(@Valid LoginRequest loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Email or password is incorrect"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        LoginResponse response = new LoginResponse();
        response.setUserId(user.getId());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setToken(token);

        return response;

    }
}
