package com.nicolas.cabanias.luluni.cabanias_luluni.services;

import com.nicolas.cabanias.luluni.cabanias_luluni.dtos.CalendarioDTO;
import com.nicolas.cabanias.luluni.cabanias_luluni.entities.Calendario;
import com.nicolas.cabanias.luluni.cabanias_luluni.entities.Mes;
import com.nicolas.cabanias.luluni.cabanias_luluni.repositories.CalendarioRepository;
import com.nicolas.cabanias.luluni.cabanias_luluni.repositories.MesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarioServiceImpl implements CalendarioService {

    private final CalendarioRepository calendarioRepository;
    private final MesRepository mesRepository;

    @Override
    public List<CalendarioDTO> findAll() {
        return calendarioRepository.findAll()
                .stream()
                .map(c -> new CalendarioDTO(c.getId(), c.getNombre(), c.getMeses()))
                .collect(Collectors.toList());
    }

    @Override
    public CalendarioDTO findById(Long id) {
        Calendario calendario = calendarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Calendario no encontrado"));
        return new CalendarioDTO(calendario.getId(), calendario.getNombre(), calendario.getMeses());
    }

    @Override
    public CalendarioDTO create(CalendarioDTO dto) {
        Calendario calendario = new Calendario();
        calendario.setNombre(dto.getNombre());
        calendario.setMeses(dto.getMeses());
        calendarioRepository.save(calendario);
        return new CalendarioDTO(calendario.getId(), calendario.getNombre(), calendario.getMeses());
    }

    @Override
    public CalendarioDTO agregarMes(Long calendarioId, Long mesId) {
        Calendario calendario = calendarioRepository.findById(calendarioId)
                .orElseThrow(() -> new RuntimeException("Calendario no encontrado"));
        Mes mes = mesRepository.findById(mesId)
                .orElseThrow(() -> new RuntimeException("Mes no encontrado"));
        calendario.getMeses().add(mes);
        calendarioRepository.save(calendario);
        return new CalendarioDTO(calendario.getId(), calendario.getNombre(), calendario.getMeses());
    }
}
