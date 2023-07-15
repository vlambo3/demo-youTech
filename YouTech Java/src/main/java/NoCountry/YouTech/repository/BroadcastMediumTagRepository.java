package NoCountry.YouTech.repository;

import NoCountry.YouTech.model.BroadcastMediumTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BroadcastMediumTagRepository extends JpaRepository<BroadcastMediumTag, Long> {
}
