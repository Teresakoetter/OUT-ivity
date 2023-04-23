package outdooractivity.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.mockito.Mockito.verify;
@AutoConfigureMockMvc
@SpringBootTest
class AdventureServiceTest {
    @Mock
    private AdventureRepositoryInterface adventureRepositoryInterfaceMock;
    private AdventureService adventureService;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        adventureService = new AdventureService(adventureRepositoryInterfaceMock);
    }

    @Test
    void getAll_shouldInvoke_findAll(){
        //GIVEN
        //WHEN
        adventureService.getAll();
        //THEN
        verify(adventureRepositoryInterfaceMock).findAll();

    }
}

