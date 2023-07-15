package NoCountry.YouTech.dto.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtDTO {
    Integer idContentCreator;
    String email;
    String name;
    String lastName;
    String urlImage;
    boolean admin;


}
