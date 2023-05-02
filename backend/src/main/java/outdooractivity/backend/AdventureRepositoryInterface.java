package outdooractivity.backend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdventureRepositoryInterface extends MongoRepository<Adventure, String> {
}


