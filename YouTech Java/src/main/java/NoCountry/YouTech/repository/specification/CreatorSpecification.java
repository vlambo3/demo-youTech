package NoCountry.YouTech.repository.specification;

import NoCountry.YouTech.dto.contentCreator.ContentCreatorFilters;
import NoCountry.YouTech.model.BroadcastMediumTag;
import NoCountry.YouTech.model.ContentCreator;
import NoCountry.YouTech.model.Tag;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class CreatorSpecification {

    public Specification<ContentCreator> getByFilters(ContentCreatorFilters creatorFilters) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasLength(creatorFilters.getName())) {
                predicates.add(
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("name")),
                                "%" + creatorFilters.getName().toLowerCase() + "%"
                        )
                );
            }

            if(creatorFilters.getIdTag() != null) {
                Join<BroadcastMediumTag, ContentCreator> join = root.join("broadcast_medium_tag", JoinType.INNER);
                Expression<String> idTag = join.get("idTag");
                predicates.add(
                        criteriaBuilder.equal(root.get("idTag"), creatorFilters.getIdTag())
                );
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));

            };
        }
}
