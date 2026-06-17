package com.gestion.backend.controller;

import com.gestion.backend.model.Contrat;
import com.gestion.backend.repository.ContratRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contrats")
@CrossOrigin(origins = "http://localhost:3000")
public class ContratController {
    @Autowired
    private ContratRepository contratRepository;

    @GetMapping
    public List<Contrat> getAllContrats() {
        return contratRepository.findAll();
    }
}