package com.nicolas.cabanias.luluni.cabanias_luluni.services;

import com.nicolas.cabanias.luluni.cabanias_luluni.dtos.CalendarioDTO;
import java.util.List;

public interface CalendarioService {
    List<CalendarioDTO> findAll();
    CalendarioDTO findById(Long id);
    CalendarioDTO create(CalendarioDTO dto);
    CalendarioDTO agregarMes(Long calendarioId, Long mesId);
}
