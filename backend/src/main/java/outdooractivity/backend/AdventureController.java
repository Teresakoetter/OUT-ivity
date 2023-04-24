package outdooractivity.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/adventures")
public class AdventureController {
    private final AdventureService adventureService;

    @GetMapping
    public List<Adventure> adventures() {
        return adventureService.getAll();
    }

    @PostMapping
    public Adventure addAdventure(@RequestBody Adventure adventure) {
        return adventureService.addAdventure(adventure);
    }
}
