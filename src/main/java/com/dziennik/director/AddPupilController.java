package com.dziennik.director;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.ScheduledTaskHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
	public String toaddpupil(Model model, String message) {
		List<SchoolClass> allClasses = schoolClassRepo.findAll();
		model.addAttribute("allClasses", allClasses);
		model.addAttribute("pupil_list", pupilRepo.findAll());
		model.addAttribute("message", message);
		return "director/addpupil";
	}
	
	@PostMapping("/director/addpupil")
	public String addpupil(Pupil pupil, RedirectAttributes ra) {
		String username = (pupil.getFirstname()+pupil.getLastname()).toLowerCase();
		System.out.println(username);
		if(this.userRepo.existsByUsername(username)) {
			ra.addAttribute("message", "użytkownik o loginie " + username + " istnieje");
		}else {
			UserAuth pup = new UserAuth(username, passwordEncoder.encode(pupil.getLastname()) , "PUPIL");
			this.userRepo.save(pup);
			pupil.setId(pup.getId());
			
			pupilRepo.save(pupil);
		}
		return "redirect:/director/addpupil";
	}
}
