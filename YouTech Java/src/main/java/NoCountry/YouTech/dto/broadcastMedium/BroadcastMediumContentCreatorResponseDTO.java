package NoCountry.YouTech.dto.broadcastMedium;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
public class BroadcastMediumContentCreatorResponseDTO {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class broadcastMediumTagList {
        private Integer idTag;
        private String description;
    }

    private Integer idBroadcastMedium;
    private String urImage;
    private String nameImage;
    private String name;
    private String description;
    private int idPlatform;
    private String platform;
    private String urlPlatform;
    private List<broadcastMediumTagList> tagList;
}
