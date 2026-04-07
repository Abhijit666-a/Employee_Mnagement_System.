package com.example.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.google.genai.Client;

import com.google.genai.types.GenerateContentResponse;

@CrossOrigin(origins = "*")
@RestController
public class aicontroller {
	@Autowired
	public Client client;

	@PostMapping("/input")
	public String inputai(@RequestBody String Prompt) {
		GenerateContentResponse ai = client.models.generateContent("gemini-3-flash-preview", Prompt, null);
		return ai.text();

	}
}