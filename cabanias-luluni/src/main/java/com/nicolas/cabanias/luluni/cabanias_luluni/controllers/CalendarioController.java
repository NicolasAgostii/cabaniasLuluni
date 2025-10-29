package com.nicolas.cabanias.luluni.cabanias_luluni.controllers;

import com.nicolas.cabanias.luluni.cabanias_luluni.dtos.CalendarioDTO;
import com.nicolas.cabanias.luluni.cabanias_luluni.services.CalendarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/calendarios")
@RequiredArgsConstructor
public class CalendarioController {

    private final CalendarioService calendarioService;

    @GetMapping
    public ResponseEntity<List<CalendarioDTO>> getAll() {
        return ResponseEntity.ok(calendarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CalendarioDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(calendarioService.findById(id));
    }

    @PostMapping
    public ResponseEntity<CalendarioDTO> create(@RequestBody CalendarioDTO dto) {
        return ResponseEntity.ok(calendarioService.create(dto));
    }

    @PutMapping("/{id}/agregar-mes/{mesId}")
    public ResponseEntity<CalendarioDTO> agregarMes(@PathVariable Long id, @PathVariable Long mesId) {
        return ResponseEntity.ok(calendarioService.agregarMes(id, mesId));
    }
}
