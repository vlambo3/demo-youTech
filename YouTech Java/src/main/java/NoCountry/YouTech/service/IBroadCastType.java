package NoCountry.YouTech.service;

import NoCountry.YouTech.dto.broadCastType.BroadCastTypeDTO;
import NoCountry.YouTech.dto.broadCastType.BroadcastTypeResponseMaintenanceDTO;
import NoCountry.YouTech.dto.tag.Tag2UpdateDTO;
import NoCountry.YouTech.dto.tag.TagResponseDTO;

import java.util.List;

public interface IBroadCastType {
    List<BroadCastTypeDTO> getBroadCastTypeActive(short status);
    List<BroadcastTypeResponseMaintenanceDTO> getAll( );

    String update(String email, BroadcastTypeResponseMaintenanceDTO dto, Long id);

    String save(String email,BroadcastTypeResponseMaintenanceDTO dto);

    boolean delete(String email,Long id);
}
