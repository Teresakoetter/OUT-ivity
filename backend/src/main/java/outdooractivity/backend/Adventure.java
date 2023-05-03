package outdooractivity.backend;

import org.springframework.data.annotation.Id;

public record Adventure(
        @Id
        String id,
        String name,
        String quote,
        String description,
        String url

) {
        public Adventure withUrl(String url){
                return new Adventure(id, name, quote, description, url);
        }
}
