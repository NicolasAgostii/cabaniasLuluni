package com.nicolas.cabanias.luluni.cabanias_luluni.dtos;

import com.nicolas.cabanias.luluni.cabanias_luluni.entities.Mes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalendarioDTO {
    private Long id;
    private String nombre;
    private List<Mes> meses;
}
