package NoCountry.YouTech.service;

import NoCountry.YouTech.dto.tag.Tag2UpdateDTO;
import NoCountry.YouTech.dto.tag.TagResponseDTO;
import NoCountry.YouTech.dto.tag.TagResponseMaintenanceDTO;

import java.util.List;

public interface ITag {
    List<TagResponseDTO> getActives(short status);

    List<TagResponseMaintenanceDTO> getAll();

    TagResponseDTO update(TagResponseMaintenanceDTO dto, Long id);
    String save(TagResponseMaintenanceDTO dto);

    boolean delete(Long id);
}
