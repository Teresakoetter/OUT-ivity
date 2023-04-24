package outdooractivity.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AdventureService {
    private final AdventureRepositoryInterface adventureRepositoryInterface;

    public List<Adventure> getAll() {
        return adventureRepositoryInterface.findAll();
    }

    public Adventure addAdventure(Adventure adventure) {
        return adventureRepositoryInterface.save(adventure);
    }

    public Adventure findById(String id) {
        return adventureRepositoryInterface.findById(id).orElseThrow();
    }
}
