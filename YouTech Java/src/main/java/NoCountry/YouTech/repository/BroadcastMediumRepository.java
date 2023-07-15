package NoCountry.YouTech.repository;

import NoCountry.YouTech.model.BroadcastMedium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BroadcastMediumRepository extends JpaRepository<BroadcastMedium, Integer> {
    @Query("SELECT b FROM BroadcastMedium b JOIN b.idContentCreator creator  WHERE creator.idContentCreator=:idContentCreator")
    List<BroadcastMedium> getAllBroadcastMedium(Integer idContentCreator);


}
