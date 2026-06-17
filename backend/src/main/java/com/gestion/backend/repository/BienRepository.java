package com.gestion.backend.repository;

import com.gestion.backend.model.Bien;
import com.gestion.backend.model.StatutBien;  // ← Import essentiel
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BienRepository extends JpaRepository<Bien, Long> {
    List<Bien> findByStatut(StatutBien statut);
    List<Bien> findByProprietaireId(Long proprietaireId);
}