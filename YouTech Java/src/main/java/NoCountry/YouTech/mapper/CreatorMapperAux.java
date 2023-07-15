package NoCountry.YouTech.mapper;

import NoCountry.YouTech.dto.contentCreator.ContentCreatorBasicDTO;
import NoCountry.YouTech.model.ContentCreator;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CreatorMapperAux {

    public List<ContentCreatorBasicDTO> creatorList2DTOBasicList(List<ContentCreator> entities) {
        List<ContentCreatorBasicDTO> dtos = new ArrayList<>();
        for (ContentCreator entity : entities) {
            dtos.add(this.movieEntity2DTOBasic(entity));
        }
        return dtos;
    }

    public ContentCreatorBasicDTO movieEntity2DTOBasic(ContentCreator entity) {
        ContentCreatorBasicDTO dtoBasic = new ContentCreatorBasicDTO();
        dtoBasic.setImageProfile(entity.getImageProfile());
        dtoBasic.setName(entity.getName());
        dtoBasic.setLastName(entity.getLastName());
        dtoBasic.setPseudonym(entity.getIdPseudonym());
        dtoBasic.setImageProfile(entity.getImageProfile());
        dtoBasic.setUrlGithub(entity.getUrlGithub());
        dtoBasic.setUrlTwitter(entity.getUrlTwitter());
        return dtoBasic;
    }


}
