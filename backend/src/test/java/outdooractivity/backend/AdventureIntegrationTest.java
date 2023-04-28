package outdooractivity.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AdventureIntegrationTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
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

        mockMvc.perform(get("/api/adventures/1"))
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

    @DirtiesContext
    @Test
    void deleteAdventure_shouldDeleteAdventureWithCorrespondingId() throws Exception {
        String saveResult = mockMvc.perform(
                        post("http://localhost:8080/api/adventures")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                                {
                                        "id": "1",
                                        "quote": "quote1",
                                        "name": "name1",
                                        "description": "description1"
                                        }
                                                """)

                )
                .andReturn()
                .getResponse()
                .getContentAsString();

        Adventure saveResultAdventure = objectMapper.readValue(saveResult, Adventure.class);
        String id = saveResultAdventure.id();

        mockMvc.perform(delete("/api/adventures/" + id))
                .andExpect(status().isOk());
        mockMvc.perform(get("http://localhost:8080/api/adventures"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    @DirtiesContext
    void updateAdventure_shouldReturnUpdatedAdventure() throws Exception {
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
        mockMvc.perform(put("/api/adventures/1/update")
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
}


