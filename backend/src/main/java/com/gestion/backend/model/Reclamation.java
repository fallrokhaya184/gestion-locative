package com.gestion.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "reclamation")
@Data
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "locataire_id")
    private Utilisateur locataire;

    @ManyToOne
    @JoinColumn(name = "bien_id")
    private Bien bien;

    private String titre;
    private String description;
    private LocalDate dateCreation;

    @Enumerated(EnumType.STRING)
    private Urgence urgence;

    @Enumerated(EnumType.STRING)
    private StatutReclamation statut;

    private String reponse;
    private LocalDate dateResolution;
}

enum Urgence {
    faible, moyenne, elevee, urgente
}

enum StatutReclamation {
    nouvelle, en_cours, resolue, fermee
}