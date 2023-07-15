package NoCountry.YouTech.controlador;

import NoCountry.YouTech.dto.broadcastMedium.BroadcastMediumRequestDTO;
import NoCountry.YouTech.service.IContentCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/broadcast_medium")
@RequiredArgsConstructor
public class BroadcastMediumController {

    private final IContentCreator service;

    @PostMapping
    public ResponseEntity<?> registerBroadcastMedium(Principal principal, @RequestBody BroadcastMediumRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.saveBroadcastMedium(principal.getName(), dto));
    }

    @PutMapping("/{idBroadcastMedium}")
    public ResponseEntity<?> updateBroadcastMedium(Principal principal, @PathVariable Integer idBroadcastMedium, @RequestBody BroadcastMediumRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(service.updateBroadcastMedium(principal.getName(), idBroadcastMedium, dto));
    }

    @DeleteMapping("/{idBroadcastMedium}")
    public ResponseEntity<?> deleteBroadcastMedium(Principal principal, @PathVariable Integer idBroadcastMedium) {
        return ResponseEntity.status(HttpStatus.OK).body(service.deleteBroadcastMedium(principal.getName(), idBroadcastMedium));
    }

    @GetMapping("/{idContentCreator}")
    public ResponseEntity<?> getAllBroadcastMedium(@PathVariable Integer idContentCreator) {
        return ResponseEntity.status(HttpStatus.OK).body(service.getAllBroadcastMedium(idContentCreator));
    }

    @GetMapping("/home/{idContentCreator}")
    public ResponseEntity<?> getAllBroadcastMediumHome(@PathVariable Integer idContentCreator) {
        return ResponseEntity.status(HttpStatus.OK).body(service.getAllBroadcastMedium(idContentCreator));
    }

}
