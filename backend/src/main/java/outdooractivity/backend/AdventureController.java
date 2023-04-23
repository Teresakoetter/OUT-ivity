package outdooractivity.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/adventures")
public class AdventureController {
    private final AdventureService adventureService;

    @GetMapping
    public List<Adventure> adventures(){
        return adventureService.getAll();

    }
}
