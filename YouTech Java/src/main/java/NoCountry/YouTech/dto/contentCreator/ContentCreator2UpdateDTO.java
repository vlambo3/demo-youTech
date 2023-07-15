package NoCountry.YouTech.dto.contentCreator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContentCreator2UpdateDTO {
    private Integer idContentCreator;
    private String name;
    private String lastName;
    private String urlGithub;
    private String urlTwitter;
    private String urlLinkedin;
    private String pseudonym;
    private String nameImageProfile;
    private String imageProfile;
    private String email;
    private String password;
}
