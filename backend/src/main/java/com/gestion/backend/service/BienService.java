package com.gestion.backend.service;

import com.gestion.backend.model.Bien;
import com.gestion.backend.model.StatutBien;  // ← Cet import est essentiel !
import com.gestion.backend.repository.BienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BienService {
    @Autowired
    private BienRepository bienRepository;

    public List<Bien> getAllBiens() {
        return bienRepository.findAll();
    }

    public Bien getBienById(Long id) {
        return bienRepository.findById(id).orElse(null);
    }

    public Bien createBien(Bien bien) {
        return bienRepository.save(bien);
    }

    public Bien updateBien(Long id, Bien bienDetails) {
        Bien bien = getBienById(id);
        if (bien != null) {
            bien.setAdresse(bienDetails.getAdresse());
            bien.setLoyerMensuel(bienDetails.getLoyerMensuel());
            bien.setStatut(bienDetails.getStatut());
            return bienRepository.save(bien);
        }
        return null;
    }

    public void deleteBien(Long id) {
        bienRepository.deleteById(id);
    }

    public List<Bien> getBiensDisponibles() {
        return bienRepository.findByStatut(StatutBien.disponible);
    }
}