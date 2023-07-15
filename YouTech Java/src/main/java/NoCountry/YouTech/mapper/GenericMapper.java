package NoCountry.YouTech.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.modelmapper.ModelMapper;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Component
@RequiredArgsConstructor
public class GenericMapper {

    private final ModelMapper mapper;

    public <S, D> D map(S source, Class<D> destinationClass) {
        return mapper.map(source, destinationClass);
    }

    public <S, D> List<D> mapAll(List<S> sourceList, Class<D> destinationClass) {
        return sourceList.stream()
                .map(e -> map(e, destinationClass))
                .collect(toList());
    }

}
