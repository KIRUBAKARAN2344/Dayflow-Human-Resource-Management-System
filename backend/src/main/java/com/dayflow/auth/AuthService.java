package com.dayflow.auth;

import com.dayflow.auth.dto.LoginRequest;
import com.dayflow.auth.dto.LoginResponse;
import com.dayflow.auth.dto.RegisterRequest;
import com.dayflow.user.User;
import com.dayflow.user.UserRepository;
import com.dayflow.user.dto.UserResponse;
import com.dayflow.security.JwtService;
import com.dayflow.exception.BadRequestException;
import com.dayflow.exception.ConflictException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public UserResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ConflictException("Email is already registered");
        }
        if (request.getEmployeeId() != null && !request.getEmployeeId().isEmpty()) {
            if (userRepository.findByEmployeeId(request.getEmployeeId()).isPresent()) {
                throw new ConflictException("Employee ID is already in use");
            }
        }

        User user = new User();
        user.setEmployeeId(request.getEmployeeId());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setEnabled(true);

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getEmployeeId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getEnabled(),
                savedUser.getCreatedAt()
        );
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }

        if (!user.getEnabled()) {
            throw new BadRequestException("User account is disabled");
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse(
                token,
                user.getEmployeeId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
