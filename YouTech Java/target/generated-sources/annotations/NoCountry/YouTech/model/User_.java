package NoCountry.YouTech.model;

import NoCountry.YouTech.model.ContentCreator;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2022-12-08T02:18:09")
@StaticMetamodel(User.class)
public class User_ { 

    public static volatile SingularAttribute<User, Long> idUser;
    public static volatile SingularAttribute<User, String> password;
    public static volatile SingularAttribute<User, ContentCreator> contentCreator;
    public static volatile SingularAttribute<User, Boolean> isAdmin;
    public static volatile SingularAttribute<User, String> email;
    public static volatile SingularAttribute<User, Short> status;

}