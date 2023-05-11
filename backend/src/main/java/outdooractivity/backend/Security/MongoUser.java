package outdooractivity.backend.Security;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("mongoUsers")
public record MongoUser(
        @Id
        String id,
        String username,
        String password
){
}
