package com.gestion.backend.controller;

import com.gestion.backend.model.Bien;
import com.gestion.backend.service.BienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/biens")
@CrossOrigin(origins = "http://localhost:3000")
public class BienController {
    @Autowired
    private BienService bienService;

    @GetMapping
    public List<Bien> getAllBiens() {
        return bienService.getAllBiens();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bien> getBienById(@PathVariable Long id) {
        Bien bien = bienService.getBienById(id);
        return bien != null ? ResponseEntity.ok(bien) : ResponseEntity.notFound().build();
    }

    @GetMapping("/disponibles")
    public List<Bien> getBiensDisponibles() {
        return bienService.getBiensDisponibles();
    }

    @PostMapping
    public ResponseEntity<Bien> createBien(@RequestBody Bien bien) {
        Bien nouveauBien = bienService.createBien(bien);
        return new ResponseEntity<>(nouveauBien, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bien> updateBien(@PathVariable Long id, @RequestBody Bien bien) {
        Bien bienMisAJour = bienService.updateBien(id, bien);
        return bienMisAJour != null ? ResponseEntity.ok(bienMisAJour) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBien(@PathVariable Long id) {
        bienService.deleteBien(id);
        return ResponseEntity.noContent().build();
    }
}