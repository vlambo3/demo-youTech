package NoCountry.YouTech.dto.broadcastMedium;

import NoCountry.YouTech.model.BroadcastMediumTag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BroadcastMediumResponseDTO {
    private Integer idBroadcastMedium;
    private String urImage;
    private String name;
    private String description;
    private String url;
    private Integer status;
    private List<BroadcastMediumTag> broadcastMediumTagList;
}
