package outdooractivity.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AdventureIntegrationTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    AdventureRepositoryInterface adventureRepositoryInterface;
    Adventure adventure1 = new Adventure("1", "name1", "quote1", "description1");
    Adventure adventure2 = new Adventure("2", "name2", "quote2", "description2");

    @Test
    void getAll_shouldReturnEmptyListWhenNoAdventureAvailable() throws Exception {
        mockMvc.perform(get("/api/adventures"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                []
                                """
                ));
    }

    @Test
    void getAll_shouldReturnAllAdventuresAvailable() throws Exception {
        adventureRepositoryInterface.save(adventure1);
        adventureRepositoryInterface.save(adventure2);

        mockMvc.perform(get("/api/adventures"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                [
                                {
                                "id": "1",
                                "quote": "quote1",
                                "name": "name1",
                                "description": "description1"
                                },
                                {
                                "id": "2",
                                "quote": "quote2",
                                "name": "name2",
                                "description": "description2"
                                }
                                ]
                                """
                ));
    }

    @Test
    @DirtiesContext
    void addAdventure_shouldReturnAddedAdventure() throws Exception {
        mockMvc.perform(post("/api/adventures")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id": "1",
                                "quote": "quote1",
                                "name": "name1",
                                "description": "description1"
                                }
                                """
                        ))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                "id": "1",
                                "quote": "quote1",
                                "name": "name1",
                                "description": "description1"
                                }
                                """
                ));
    }
    @Test
    @DirtiesContext
    void findById_shouldReturnAdventureWithCorrespondingId() throws Exception {
        adventureRepositoryInterface.save(adventure1);

        mockMvc.perform(get ("/api/adventures/1"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                    {
                                "id": "1",
                                "quote": "quote1",
                                "name": "name1",
                                "description": "description1"
                                }
                                    """
                ));
    }
}



