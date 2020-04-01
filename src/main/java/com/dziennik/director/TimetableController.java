package com.dziennik.director;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TimetableController {

	@GetMapping("/director/timetableall")
	public String timetableall() {
		return "director/timetableall";
	}
}
