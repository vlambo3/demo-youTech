package NoCountry.YouTech.dto.contentCreator;

import lombok.Data;

import java.util.List;

@Data
public class ContentCreatorFilters {
    private String name;
    private Integer idTag;

    public ContentCreatorFilters(String name, Integer idTag) {
        this.name = name;
        this.idTag = idTag;
    }
}
