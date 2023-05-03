package outdooractivity.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AdventureService {
    private final AdventureRepositoryInterface adventureRepositoryInterface;
    private final CloudinaryService cloudinaryService;

    public List<Adventure> getAll() {
        return adventureRepositoryInterface.findAll();
    }

    public Adventure addAdventure(Adventure adventure, MultipartFile image) throws IOException {
        if (image != null) {
            String url = cloudinaryService.uploadImage(image);
            adventure = adventure.withUrl(url);
        }
        return adventureRepositoryInterface.save(adventure);
    }



    public Adventure findById(String id) {
        return adventureRepositoryInterface.findById(id).orElseThrow();
    }

    public void deleteAdventure(String id) {
        adventureRepositoryInterface.deleteById(id);
    }

    public Adventure updateAdventure(Adventure adventure) {
        return adventureRepositoryInterface.save(adventure);
    }
}
