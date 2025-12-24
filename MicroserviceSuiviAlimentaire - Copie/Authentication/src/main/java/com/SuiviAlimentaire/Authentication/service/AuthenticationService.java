package com.SuiviAlimentaire.Authentication.service;

import com.SuiviAlimentaire.Authentication.dto.LoginRequest;
import com.SuiviAlimentaire.Authentication.dto.LoginResponse;
import com.SuiviAlimentaire.Authentication.dto.RegisterRequest;
import com.SuiviAlimentaire.Authentication.entities.User;
import com.SuiviAlimentaire.Authentication.repository.UserRepository;
import com.SuiviAlimentaire.Authentication.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email déjà utilisé");
        }

        User user = new User(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword())
        );

        userRepository.save(user);
        return "Utilisateur créé avec succès";
    }
}

