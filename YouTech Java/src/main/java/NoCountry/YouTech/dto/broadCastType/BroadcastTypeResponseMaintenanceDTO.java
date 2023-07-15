package NoCountry.YouTech.dto.broadCastType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BroadcastTypeResponseMaintenanceDTO {
    private Integer idBroadCastType;
    private String description;
    private  int status;
}
