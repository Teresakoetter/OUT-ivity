package outdooractivity.backend;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Optional;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AdventureIntegrationTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    AdventureRepositoryInterface adventureRepositoryInterface;
    @MockBean
    Cloudinary cloudinary;
    Uploader uploader = mock(Uploader.class);
    Adventure adventure1 = new Adventure("1", "name1", "quote1", "description1", "url1");
    Adventure adventure2 = new Adventure("2", "name2", "quote2", "description2", "url2");

    @Test
    void getAll_shouldReturnEmptyListWhenNoAdventureAvailable() throws Exception {
        mockMvc.perform(
                        get("/api/adventures"))
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
    void addAdventure_expectSuccessfulPost() throws Exception {

        MockMultipartFile file = new MockMultipartFile("file", "filename.png", MediaType.IMAGE_JPEG_VALUE, "test data".getBytes());
        MockMultipartFile data = new MockMultipartFile("data", null, MediaType.APPLICATION_JSON_VALUE, """
                {
                "id": "1",
                "quote": "quote1",
                "name": "name1",
                "description": "description1"
                }
                """.getBytes());
        File fileToUpload = File.createTempFile("image", null);
        file.transferTo(fileToUpload);

        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), any())).thenReturn(Map.of("url", "test-url"));

        String actual = mockMvc.perform(multipart("/api/adventures")
                        .file(data)
                        .file(file)
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id": "1",
                        "quote": "quote1",
                        "name": "name1",
                        "description": "description1"
                        }
                        """
                ))
                .andReturn()
                .getResponse()
                .getContentAsString();
        Adventure actualAdventure = objectMapper.readValue(actual, Adventure.class);
        assertThat(actualAdventure.id())
                .isNotBlank();
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
        MockMultipartFile file = new MockMultipartFile("file", "filename.png", MediaType.IMAGE_JPEG_VALUE, "test data".getBytes());
        MockMultipartFile data = new MockMultipartFile("data", null, MediaType.APPLICATION_JSON_VALUE, """
                {
                "id": "1",
                "quote": "quote1",
                "name": "name1",
                "description": "description1"
                }
                """.getBytes());
        File fileToUpload = File.createTempFile("image", null);
        file.transferTo(fileToUpload);

        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), any())).thenReturn(Map.of("url", "test-url"));

        String saveResult = mockMvc.perform(multipart("/api/adventures")
                        .file(data)
                        .file(file)
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id": "1",
                        "quote": "quote1",
                        "name": "name1",
                        "description": "description1"
                        }
                        """
                ))
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

        MockMultipartFile file = new MockMultipartFile("file", "filename.png", MediaType.IMAGE_JPEG_VALUE, "test data".getBytes());
        MockMultipartFile data = new MockMultipartFile("data", null, MediaType.APPLICATION_JSON_VALUE, """
                {
                "id": "1",
                "quote": "quote1",
                "name": "name1",
                "description": "description1"
                }
                """.getBytes());
        File fileToUpload = File.createTempFile("image", null);
        file.transferTo(fileToUpload);

        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), any())).thenReturn(Map.of("url", "test-url"));

        mockMvc.perform(multipart("/api/adventures")
                        .file(data)
                        .file(file)
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
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
                                "quote": "quote2",
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
                                "quote": "quote2",
                                "name": "name1",
                                "description": "description1"
                                }
                                """
                ));
    }

}


