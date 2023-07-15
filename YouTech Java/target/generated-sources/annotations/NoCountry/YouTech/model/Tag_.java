package NoCountry.YouTech.model;

import NoCountry.YouTech.model.BroadcastMediumTag;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2022-12-08T02:18:09")
@StaticMetamodel(Tag.class)
public class Tag_ { 

    public static volatile SingularAttribute<Tag, Integer> idTag;
    public static volatile SingularAttribute<Tag, String> description;
    public static volatile ListAttribute<Tag, BroadcastMediumTag> broadcastMediumTagList;
    public static volatile SingularAttribute<Tag, Short> status;

}