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

    @GetMapping("{id}")
    public Adventure findById(@PathVariable String id) {
        return adventureService.findById(id);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        adventureService.deleteAdventure(id);
    }

}
