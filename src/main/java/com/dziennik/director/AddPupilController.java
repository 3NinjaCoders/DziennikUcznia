package com.dziennik.director;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.ScheduledTaskHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.dziennik.db.PupilRepo;
import com.dziennik.db.SchoolClassRepo;
import com.dziennik.model.Pupil;
import com.dziennik.model.SchoolClass;

@Controller
public class AddPupilController {
	
	@Autowired
	private SchoolClassRepo schoolClassRepo;
	@Autowired
	private PupilRepo pupilRepo;

	@GetMapping("/director/addpupil")
	public String toaddpupil(Model model) {
		List<SchoolClass> allClasses = schoolClassRepo.findAll();
		model.addAttribute("allClasses", allClasses);
		return "director/addpupil";
	}
	
	@PostMapping("/director/addpupil")
	public String addpupil(Pupil pupil) {
		pupilRepo.save(pupil);
		
		return "redirect:director/addpupil";
	}
}
