package outdooractivity.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/adventures")
public class AdventureController {
    private final AdventureService adventureService;

    @GetMapping
    List<Adventure> adventures() {

        return adventureService.getAll();
    }

    @PostMapping
    Adventure addAdventure(@RequestBody Adventure adventure) {
        return adventureService.addAdventure(adventure);
    }

    @GetMapping("{id}")
    Adventure findById(@PathVariable String id) {
        return adventureService.findById(id);
    }

    @DeleteMapping("{id}")
    void deleteAdventure(@PathVariable String id) {
        adventureService.deleteAdventure(id);
    }

    @PutMapping(path = {"{id}/update", "{id}"})
    Adventure update(@PathVariable String id, @RequestBody Adventure adventure) {
        if (!adventure.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return adventureService.updateAdventure(adventure);
    }

}
