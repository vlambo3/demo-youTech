package NoCountry.YouTech.service;

import NoCountry.YouTech.dto.broadcastMedium.BroadcastMediumContentCreatorResponseDTO;
import NoCountry.YouTech.dto.broadcastMedium.BroadcastMediumRequestDTO;
import NoCountry.YouTech.dto.contentCreator.ContentCreatorBasicDTO;
import NoCountry.YouTech.dto.contentCreator.ContentCreatorResponseDTO;
import NoCountry.YouTech.dto.contentCreator.ContentCreator2UpdateDTO;
import NoCountry.YouTech.dto.contentCreator.ContentCreatorResponseForEditionDTO;

import java.util.List;

public interface IContentCreator {

    String update(String email, ContentCreator2UpdateDTO dto);

    List<ContentCreatorResponseDTO> getAllContentCreators();

    ContentCreatorResponseDTO getById(Integer id);

    String saveBroadcastMedium(String email, BroadcastMediumRequestDTO dto);

    String updateBroadcastMedium(String email, Integer idBroadcastMedium, BroadcastMediumRequestDTO dto);

    String deleteBroadcastMedium(String email, Integer idBroadcastMedium);

    List<BroadcastMediumContentCreatorResponseDTO> getAllBroadcastMedium(Integer idContentCreator);


    ContentCreatorResponseForEditionDTO getForEdition(Integer idContentCreator);

    List<ContentCreatorBasicDTO> getByFilters(String name, Integer idTag);

    List<ContentCreatorResponseDTO> findByTags(List<Integer> idTags);

    List<ContentCreatorResponseDTO> findByTagsAndName(List<Integer> idTags, String name);
}
