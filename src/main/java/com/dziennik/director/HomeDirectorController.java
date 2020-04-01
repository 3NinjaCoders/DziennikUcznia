package com.dziennik.director;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeDirectorController {

	@GetMapping("/director/home")
	public String directorHome() {
		return "director/home";
	}
}
