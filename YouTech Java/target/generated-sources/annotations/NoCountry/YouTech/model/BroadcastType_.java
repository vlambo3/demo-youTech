package NoCountry.YouTech.model;

import NoCountry.YouTech.model.BroadcastMedium;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2022-12-08T02:18:09")
@StaticMetamodel(BroadcastType.class)
public class BroadcastType_ { 

    public static volatile ListAttribute<BroadcastType, BroadcastMedium> broadcastMediumList;
    public static volatile SingularAttribute<BroadcastType, Integer> idBroadcastType;
    public static volatile SingularAttribute<BroadcastType, String> description;
    public static volatile SingularAttribute<BroadcastType, Short> status;

}