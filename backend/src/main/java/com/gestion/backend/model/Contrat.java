package com.gestion.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@Table(name = "contrat")
@Data
public class Contrat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String reference;

    @ManyToOne
    @JoinColumn(name = "bien_id")
    private Bien bien;

    @ManyToOne
    @JoinColumn(name = "locataire_id")
    private Utilisateur locataire;

    private LocalDate dateDebut;
    private LocalDate dateFin;
    private BigDecimal loyerMensuel;
    private Boolean cautionVerse;
    private Boolean actif;
    private LocalDate signatureDate;
}