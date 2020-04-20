package com.dziennik.director;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.ScheduledTaskHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.dziennik.db.PupilRepo;
import com.dziennik.db.SchoolClassRepo;
import com.dziennik.db.UserRepo;
import com.dziennik.model.Pupil;
import com.dziennik.model.SchoolClass;
import com.dziennik.model.UserAuth;

@Controller
public class AddPupilController {
	
	@Autowired
	private SchoolClassRepo schoolClassRepo;
	@Autowired
	private PupilRepo pupilRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@GetMapping("/director/addpupil")
	public String toaddpupil(Model model) {
		List<SchoolClass> allClasses = schoolClassRepo.findAll();
		model.addAttribute("allClasses", allClasses);
		return "director/addpupil";
	}
	
	@PostMapping("/director/addpupil")
	public String addpupil(Pupil pupil) {
		UserAuth pup = new UserAuth(pupil.getFirstname(), passwordEncoder.encode(pupil.getLastname()) , "PUPIL");
		this.userRepo.save(pup);
		pupil.setId(pup.getId());
		
		pupilRepo.save(pupil);
		
		return "redirect:/director/addpupil";
	}
}
