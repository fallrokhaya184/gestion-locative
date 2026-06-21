package com.gestion.backend.controller;

import com.gestion.backend.model.Utilisateur;
import com.gestion.backend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;  // ← AJOUTER CET IMPORT
import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "http://localhost:3000")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @GetMapping
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id).orElse(null);
        return utilisateur != null ? ResponseEntity.ok(utilisateur) : ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("🔍 Tentative de connexion : " + loginRequest.getEmail());

        Utilisateur utilisateur = utilisateurRepository
                .findByEmail(loginRequest.getEmail())
                .filter(u -> u.getMotDePasse().equals(loginRequest.getMotDePasse()))
                .orElse(null);

        if (utilisateur != null) {
            System.out.println("✅ Connexion réussie : " + utilisateur.getEmail());
            return ResponseEntity.ok(utilisateur);
        } else {
            System.out.println("❌ Échec de connexion : " + loginRequest.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect");
        }
    }

    @PostMapping("/inscription")
    public ResponseEntity<?> inscription(@RequestBody Utilisateur utilisateur) {
        // Vérifier si l'email existe déjà
        if (utilisateurRepository.findByEmail(utilisateur.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email déjà utilisé");
        }

        utilisateur.setDateInscription(LocalDate.now());
        Utilisateur saved = utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok(saved);
    }
}

// LoginRequest
class LoginRequest {
    private String email;
    private String motDePasse;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getMotDePasse() { return motDePasse; }
    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }
}