package NoCountry.YouTech.repository;

import NoCountry.YouTech.model.BroadcastType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BroadcastTypeRepository extends JpaRepository<BroadcastType, Integer> {
    List<BroadcastType> findByStatus(short status);
}
