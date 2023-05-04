package outdooractivity.backend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;

@AutoConfigureMockMvc
@SpringBootTest
class AdventureServiceTest {
    @Mock
    private AdventureRepositoryInterface adventureRepositoryInterfaceMock;
    private CloudinaryService cloudinaryServiceMock;

    final AdventureRepositoryInterface adventureRepositoryInterface = mock(AdventureRepositoryInterface.class);
    final CloudinaryService cloudinaryService = mock(CloudinaryService.class);
    private AdventureService adventureService;

    Adventure adventure1 = new Adventure("1", "name1", "quote1", "description1", "url1");
    Adventure adventure2 = new Adventure("2", "name2", "quote2", "description2", "url2");
    MultipartFile image;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        adventureService = new AdventureService(adventureRepositoryInterfaceMock, cloudinaryServiceMock);
    }

    @Test
    void getAll_shouldReturnEmptyListWhenNoAdventureAvailable() {
        //GIVEN
        final AdventureService adventureService = new AdventureService(adventureRepositoryInterface, cloudinaryService);
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
    void addAdventure_shouldReturnAddedAdventureWhenAdventureIsAdded() throws IOException {
        when(adventureRepositoryInterfaceMock.save(adventure1))
                .thenReturn(adventure1);
        Adventure actual = adventureService.addAdventure(adventure1, image);
        verify(adventureRepositoryInterfaceMock).save(adventure1);
        assertEquals(actual, adventure1);
    }

    @DirtiesContext
    @Test
    void findById_shouldReturnCorrespondingAdventureWhenGivenId() {
        when(adventureRepositoryInterfaceMock.findById("1"))
                .thenReturn(Optional.of(adventure1));

        Adventure actual = adventureService.findById("1");
        Adventure expected = adventure1;

        verify(adventureRepositoryInterfaceMock).findById("1");
        assertEquals(expected, actual);

    }

    @DirtiesContext
    @Test
    void findById_shouldThrowExceptionWhenIdDoesNotExist() {
        when(adventureRepositoryInterfaceMock.findById("1"))
                .thenThrow(NoSuchElementException.class);
        try {
            adventureService.findById("1");
            fail();
        } catch (NoSuchElementException Ignored) {
            verify(adventureRepositoryInterfaceMock).findById("1");
        }

    }

    @DirtiesContext
    @Test
    void deleteAdventure_shouldInvokeDeleteByIDMethod() {
        adventureRepositoryInterfaceMock.save(adventure1);
        adventureService.deleteAdventure("1");
        verify(adventureRepositoryInterfaceMock).deleteById("1");
    }
    @DirtiesContext
    @Test
    void updateAdventure_shouldSaveAdventure(){
        when(adventureRepositoryInterfaceMock.save(adventure1))
                .thenReturn(adventure1);
        Adventure actual = adventureService.updateAdventure(adventure1);
        verify(adventureRepositoryInterfaceMock).save(adventure1);
        assertEquals(actual, adventure1);
    }

}

