package NoCountry.YouTech.dto.tag;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TagResponseMaintenanceDTO {
    private Integer idTag;
    private String description;
    private int status;
}
