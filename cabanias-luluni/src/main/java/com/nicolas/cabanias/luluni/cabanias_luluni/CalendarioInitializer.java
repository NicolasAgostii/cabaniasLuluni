package com.nicolas.cabanias.luluni.cabanias_luluni;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.nicolas.cabanias.luluni.cabanias_luluni.entities.Calendario;
import com.nicolas.cabanias.luluni.cabanias_luluni.entities.Cabania;
import com.nicolas.cabanias.luluni.cabanias_luluni.entities.Dia;
import com.nicolas.cabanias.luluni.cabanias_luluni.entities.Foto;
import com.nicolas.cabanias.luluni.cabanias_luluni.entities.Mes;
import com.nicolas.cabanias.luluni.cabanias_luluni.repositories.CalendarioRepository;
import com.nicolas.cabanias.luluni.cabanias_luluni.repositories.CabaniaRepository;
import com.nicolas.cabanias.luluni.cabanias_luluni.repositories.FotoRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CalendarioInitializer implements CommandLineRunner {

    private final CalendarioRepository calendarioRepository;
    private final CabaniaRepository cabaniaRepository;
    private final FotoRepository fotoRepository;

    @Override
    public void run(String... args) throws IOException {
        if (calendarioRepository.count() > 0 || cabaniaRepository.count() > 0) return;

        String[] nombresCalendarios = {
                "Calendario Cabaña 1",
                "Calendario Cabaña 2",
                "Calendario Cabaña 3"
        };

        String[] descripcionesCabanias = {
                "Cabaña 1",
                "Cabaña 2",
                "Cabaña 3"
        };

        int[] diasPorMes = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        String[] nombresMeses = {
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        };

        // Ruta de tu imagen .png
        Path fotoPath = Path.of("C:\\Users\\nicolas.agosti.DIR\\Desktop\\CabaniasLuluni\\cabanias-luluni\\src\\main\\java\\com\\nicolas\\cabanias\\luluni\\cabanias_luluni\\utils\\fotocabania.png");
        byte[] fotoBytes = Files.readAllBytes(fotoPath);

        for (int c = 0; c < nombresCalendarios.length; c++) {

            // Crear calendario completo
            Calendario calendario = new Calendario();
            calendario.setNombre(nombresCalendarios[c]);

            List<Mes> meses = new ArrayList<>();

            for (int i = 0; i < 12; i++) {
                Mes mes = new Mes();
                mes.setNombre(nombresMeses[i]);

                List<Dia> dias = new ArrayList<>();
                for (int j = 0; j < diasPorMes[i]; j++) {
                    Dia dia = new Dia();
                    dia.setNumero(j + 1);
                    dia.setOcupadoALaManiana(false);
                    dia.setOcupadoALaTarde(false);
                    dias.add(dia);
                }

                mes.setDias(dias);
                meses.add(mes);
            }

            calendario.setMeses(meses);
            calendarioRepository.save(calendario);

            // Crear cabaña asociada
            Cabania cabania = new Cabania();
            cabania.setDescripcion(descripcionesCabanias[c]);
            cabania.setCapacidad(4 + c);
            cabania.setPrecio(10000 + c * 2000);
            cabaniaRepository.save(cabania);

            // Crear foto asociada
            Foto foto = new Foto();
            foto.setData(fotoBytes);
            foto.setCabania(cabania);
            fotoRepository.save(foto);
        }
    }
}
