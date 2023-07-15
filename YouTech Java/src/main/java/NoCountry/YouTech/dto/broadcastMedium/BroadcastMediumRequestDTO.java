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
public class BroadcastMediumRequestDTO {
    private String urImage;
    private String nameImage;
    private String name;
    private String description;
    private String url;
    private Integer idBroadcastType;
    private List<Integer> broadcastMediumTagList;
}
