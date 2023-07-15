package NoCountry.YouTech.repository;

import NoCountry.YouTech.projection.IPContentCreator;
import NoCountry.YouTech.dto.contentCreator.ContentCreatorResponseDTO;
import NoCountry.YouTech.model.ContentCreator;
import NoCountry.YouTech.projection.IPContentCreatorForEdition;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentCreatorRepository extends JpaRepository<ContentCreator, Integer>, JpaSpecificationExecutor<ContentCreator> {
    @Query("SELECT c.idContentCreator as idContentCreator,user.email as email, c.name as name,c.lastName as lastName,c.imageProfile as imageProfile ,user.isAdmin as isAdmin FROM ContentCreator c JOIN c.idUser user WHERE user.email=:email")
    IPContentCreator findByEmail(String email);

    @Query("SELECT c.name as name,c.lastName as lastName,c.urlGithub as urlGithub,c.urlTwitter as urlTwitter, c.urlLinkedin as urlLinkedin, c.idPseudonym as pseudonym ,user.email as email, user.password as  password,c.nameImageProfile as  nameImageProfile, c.imageProfile as imageProfile FROM ContentCreator c JOIN c.idUser user WHERE c.idContentCreator=:idContentCreator")
    IPContentCreatorForEdition findForEdition(Integer idContentCreator);

    List<ContentCreator> findAll(Specification<ContentCreator> spec);

    @Query(value = "SELECT\n" +
            "\t* \n" +
            "FROM\n" +
            "\tcontent_creator cc \n" +
            "WHERE\n" +
            "\tcc.id_content_creator IN (\n" +
            "\tSELECT DISTINCT\n" +
            "\t\t( bm.id_content_creator ) \n" +
            "\tFROM\n" +
            "\t\tbroadcast_medium bm\n" +
            "\t\tINNER JOIN broadcast_medium_tag bt ON bm.id_broadcast_medium = bt.id_broadcast_medium \n" +
            "\tWHERE\n" +
            "\t\tbt.id_tag IN ( :idTags) \n" +
            "\t) \n"
            , nativeQuery = true)
    List<ContentCreator> findByTags(@Param("idTags") List<Integer> idTags);

    @Query(value = "SELECT\n" +
            "\t* \n" +
            "FROM\n" +
            "\tcontent_creator cc \n" +
            "WHERE\n" +
            "\tcc.id_content_creator IN (\n" +
            "\tSELECT DISTINCT\n" +
            "\t\t( bm.id_content_creator ) \n" +
            "\tFROM\n" +
            "\t\tbroadcast_medium bm\n" +
            "\t\tINNER JOIN broadcast_medium_tag bt ON bm.id_broadcast_medium = bt.id_broadcast_medium \n" +
            "\tWHERE\n" +
            "\t\tbt.id_tag IN ( :idTags ) \n" +
            "\t) \n" +
            "\tAND cc.NAME LIKE %:name% ", nativeQuery = true)
    List<ContentCreator> findByTagsName(@Param("idTags") List<Integer> idTags, @Param("name") String name);
}
