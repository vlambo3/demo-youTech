package NoCountry.YouTech.controlador;

import NoCountry.YouTech.dto.broadcastMedium.BroadcastMediumRequestDTO;
import NoCountry.YouTech.dto.contentCreator.*;
import NoCountry.YouTech.model.ContentCreator;
import NoCountry.YouTech.service.IContentCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/content_creator")
@RequiredArgsConstructor
public class ContentCreatorController {

    private final IContentCreator service;

    @PostMapping
    public ResponseEntity update(Principal principal, @RequestBody ContentCreator2UpdateDTO dto) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(service.update(principal.getName(), dto));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ContentCreatorResponseDTO>> getAll() {
        return ResponseEntity.status(OK).body(service.getAllContentCreators());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContentCreatorResponseDTO> getById(Principal principal, @PathVariable Integer id) {
        return ResponseEntity.status(OK).body(service.getById(id));
    }

    @GetMapping("/find_for_edition/{id}")
    public ResponseEntity<ContentCreatorResponseForEditionDTO> getForEdition(@PathVariable Integer id) {
        return ResponseEntity.status(OK).body(service.getForEdition(id));
    }


    @GetMapping
    public ResponseEntity<List<ContentCreatorBasicDTO>> getDetailsByFilters(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer idTag) {
        return ResponseEntity.ok(this.service.getByFilters(name, idTag));
    }

    @PostMapping("find_by_tags")
    public ResponseEntity<List<ContentCreatorResponseDTO>> findByTags(@RequestBody List<Integer> idTag) {
        return ResponseEntity.ok(this.service.findByTags(idTag));
    }

    @PostMapping("find_by_tags_name")
    public ResponseEntity<List<ContentCreatorResponseDTO>> findByTagsName(@RequestBody ContentCreatorRequestSearchDTO contentCreatorRequestSearchDTO) {
        return ResponseEntity.ok(this.service.findByTagsAndName(contentCreatorRequestSearchDTO.getIdTags(), contentCreatorRequestSearchDTO.getName()));
    }
}
