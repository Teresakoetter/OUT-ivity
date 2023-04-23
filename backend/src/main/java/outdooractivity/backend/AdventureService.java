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
}
