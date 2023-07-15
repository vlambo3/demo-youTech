package NoCountry.YouTech.model;

import NoCountry.YouTech.model.BroadcastMedium;
import NoCountry.YouTech.model.User;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2022-12-08T02:18:09")
@StaticMetamodel(ContentCreator.class)
public class ContentCreator_ { 

    public static volatile SingularAttribute<ContentCreator, String> idPseudonym;
    public static volatile SingularAttribute<ContentCreator, User> idUser;
    public static volatile SingularAttribute<ContentCreator, String> lastName;
    public static volatile SingularAttribute<ContentCreator, String> urlGithub;
    public static volatile ListAttribute<ContentCreator, BroadcastMedium> broadcastMediumList;
    public static volatile SingularAttribute<ContentCreator, Integer> idContentCreator;
    public static volatile SingularAttribute<ContentCreator, String> urlLinkedin;
    public static volatile SingularAttribute<ContentCreator, String> urlTwitter;
    public static volatile SingularAttribute<ContentCreator, String> name;
    public static volatile SingularAttribute<ContentCreator, String> imageProfile;
    public static volatile SingularAttribute<ContentCreator, String> nameImageProfile;

}