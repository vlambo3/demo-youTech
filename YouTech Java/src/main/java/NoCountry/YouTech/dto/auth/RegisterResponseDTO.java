package NoCountry.YouTech.dto.auth;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResponseDTO {
    private Long idUser;
    private String email;
    private String token;
}
