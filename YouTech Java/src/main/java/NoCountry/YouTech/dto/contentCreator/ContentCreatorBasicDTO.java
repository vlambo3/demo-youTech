package NoCountry.YouTech.dto.contentCreator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContentCreatorBasicDTO {
    private String name;
    private String lastName;
    private String urlGithub;
    private String urlTwitter;
    private String urlLinkedin;
    private String pseudonym;
    private String imageProfile;
}
