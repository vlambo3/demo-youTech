package NoCountry.YouTech.controlador;

import NoCountry.YouTech.dto.tag.Tag2UpdateDTO;
import NoCountry.YouTech.dto.tag.TagResponseDTO;
import NoCountry.YouTech.dto.tag.TagResponseMaintenanceDTO;
import NoCountry.YouTech.service.ITag;
import NoCountry.YouTech.util.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/tag")
@RequiredArgsConstructor
public class TagController {

    private final ITag service;

    @GetMapping("/actives")
    public ResponseEntity<List<TagResponseDTO>> getActives() {
        return ResponseEntity.status(OK).body(service.getActives(Util.STATUS_ACTIVE));
    }

    @GetMapping("/all")
    public ResponseEntity<List<TagResponseMaintenanceDTO>> getAllTags() {
        return ResponseEntity.status(OK).body(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TagResponseDTO> update(@RequestBody TagResponseMaintenanceDTO dto, @PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.update(dto, id));
    }

    @PostMapping
    public ResponseEntity save(@RequestBody TagResponseMaintenanceDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(service.delete(id));
    }

}
