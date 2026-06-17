package com.gestion.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import  com.gestion.backend.model.StatutBien;

@Entity
@Table(name = "bien")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String reference;
    private String type;
    private String adresse;
    private String ville;
    private String codePostal;
    private BigDecimal superficie;
    private Integer nombrePieces;
    private BigDecimal loyerMensuel;
    private BigDecimal caution;

    @Enumerated(EnumType.STRING)
    private StatutBien statut;  // ← Maintenant importé depuis son propre fichier

    private LocalDate dateCreation;

    @ManyToOne
    @JoinColumn(name = "proprietaire_id")
    private Utilisateur proprietaire;
}