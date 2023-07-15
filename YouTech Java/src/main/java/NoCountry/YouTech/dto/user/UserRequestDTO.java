package NoCountry.YouTech.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    private String email;
    private String password;
    private String imageProfile;
    private String nameImageProfile;
    private String name;
    private String lastName;

}
