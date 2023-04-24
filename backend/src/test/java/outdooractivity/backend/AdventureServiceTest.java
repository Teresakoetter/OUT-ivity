package outdooractivity.backend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@AutoConfigureMockMvc
@SpringBootTest
class AdventureServiceTest {
    @Mock
    private AdventureRepositoryInterface adventureRepositoryInterfaceMock;
    final AdventureRepositoryInterface adventureRepositoryInterface = mock(AdventureRepositoryInterface.class);
    private AdventureService adventureService;
    Adventure adventure1 = new Adventure("1", "name1", "quote1", "description1");
    Adventure adventure2 = new Adventure("2", "name2", "quote2", "description2");

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        adventureService = new AdventureService(adventureRepositoryInterfaceMock);
    }

    @Test
    void getAll_shouldReturnEmptyListWhenNoAdventureAvailable() {
        //GIVEN
        final AdventureService adventureService = new AdventureService(adventureRepositoryInterface);
        when(adventureRepositoryInterface.findAll())
                .thenReturn(Collections.emptyList());
        //WHEN
        List<Adventure> actual = adventureService.getAll();
        List<Adventure> expected = new ArrayList<>();
        //THEN
        verify(adventureRepositoryInterface).findAll();
        assertEquals(actual, expected);
    }

    @Test
    void getAll_ShouldReturnListOfAvailableAdventures() {
        List<Adventure> expected = Arrays.asList(adventure1, adventure2);
        when(adventureRepositoryInterfaceMock.findAll()).thenReturn(expected);
        List<Adventure> actual = adventureService.getAll();
        Assertions.assertEquals(expected.size(), actual.size());
        for (int i = 0; i < expected.size(); i++) {
            Assertions.assertEquals(expected.get(i), actual.get(i));
        }
        verify(adventureRepositoryInterfaceMock, times(1)).findAll();
    }

    @Test
    void addAdventure_shouldReturnAddedAdventureWhenAdventureIsAdded() {
        final AdventureService adventureService = new AdventureService(adventureRepositoryInterface);
        when(adventureRepositoryInterface.save(adventure1))
                .thenReturn(adventure1);
        Adventure actual = adventureService.addAdventure(adventure1);
        verify(adventureRepositoryInterface).save(adventure1);
        assertEquals(actual, adventure1);

    }
}

