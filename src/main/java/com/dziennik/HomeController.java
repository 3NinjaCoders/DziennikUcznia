package com.dziennik;

import java.security.Principal;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.dziennik.db.PupilRepo;
import com.dziennik.db.TeacherRepo;
import com.dziennik.db.UserRepo;
import com.dziennik.model.Pupil;
import com.dziennik.model.Teacher;
import com.dziennik.model.UserAuth;

@Controller
public class HomeController {
	
	private UserRepo userAuthRepo;
	private PupilRepo pupilRepo;
	private TeacherRepo teacherRepo;
	private ResetService resetService;

	@Autowired
	public HomeController(UserRepo userAuthRepo, PupilRepo pupilRepo, TeacherRepo teacherRepo,
			ResetService resetService) {
		this.userAuthRepo = userAuthRepo;
		this.pupilRepo = pupilRepo;
		this.teacherRepo = teacherRepo;
		this.resetService = resetService;
	}

	@GetMapping("/")
	public String home() {
		return "home";
	}
	
	@GetMapping("/reset")
	public String reset() {
		resetService.reset();
		return "home";
	}
	
	@GetMapping("/pupil/setsession")
	public String pupilSession(HttpSession session, Principal principal) {
		UserAuth ua = userAuthRepo.findByUsername(principal.getName());
		Pupil pupil = pupilRepo.findById(ua.getId()).get();
		
		session.setAttribute("pupil", pupil);
		
		return "redirect:/pupil/home";
	}
	
	@GetMapping("/teacher/setsession")
	public String teacherSession(HttpSession session, Principal principal) {
		UserAuth ua = userAuthRepo.findByUsername(principal.getName());
		Teacher teacher = teacherRepo.findById(ua.getId()).get();
		
		session.setAttribute("teacher", teacher);
		
		return "redirect:/teacher/home";
	}

}
