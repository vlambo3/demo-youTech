package NoCountry.YouTech.model;

import NoCountry.YouTech.model.BroadcastMediumTag;
import NoCountry.YouTech.model.BroadcastType;
import NoCountry.YouTech.model.ContentCreator;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2022-12-08T02:18:09")
@StaticMetamodel(BroadcastMedium.class)
public class BroadcastMedium_ { 

    public static volatile SingularAttribute<BroadcastMedium, String> nameImage;
    public static volatile SingularAttribute<BroadcastMedium, ContentCreator> idContentCreator;
    public static volatile SingularAttribute<BroadcastMedium, BroadcastType> idBroadcastType;
    public static volatile SingularAttribute<BroadcastMedium, String> urImage;
    public static volatile SingularAttribute<BroadcastMedium, Integer> idBroadcastMedium;
    public static volatile SingularAttribute<BroadcastMedium, String> name;
    public static volatile SingularAttribute<BroadcastMedium, String> description;
    public static volatile ListAttribute<BroadcastMedium, BroadcastMediumTag> broadcastMediumTagList;
    public static volatile SingularAttribute<BroadcastMedium, String> url;
    public static volatile SingularAttribute<BroadcastMedium, Integer> status;

}