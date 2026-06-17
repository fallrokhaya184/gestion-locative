package com.gestion.backend.controller;

import com.gestion.backend.model.Reclamation;
import com.gestion.backend.repository.ReclamationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reclamations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReclamationController {
    @Autowired
    private ReclamationRepository reclamationRepository;

    @GetMapping
    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }
}