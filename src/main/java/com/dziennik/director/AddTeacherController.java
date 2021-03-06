package com.dziennik.director;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.dziennik.db.SubjectRepo;
import com.dziennik.db.TeacherRepo;
import com.dziennik.db.UserRepo;
import com.dziennik.model.Subject;
import com.dziennik.model.Teacher;
import com.dziennik.model.UserAuth;

@Controller
public class AddTeacherController {
	
	@Autowired
	private TeacherRepo teacherRepo;
	@Autowired
	private SubjectRepo subjectRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;


	@GetMapping("/director/addteacher")
	public String toaddteacher(Model model, String message) {	
		List<Subject> allsubject = subjectRepo.findAll();
		List<Subject> freeVacation = new ArrayList<>();

		for(Subject s : allsubject) {
			if(s.getIdteacher() == null)
				freeVacation.add(s);
		}

		if(freeVacation.isEmpty())
			model.addAttribute("message", "Nie ma wolnych stanowiskl");
		else
			model.addAttribute("freeVacation", freeVacation);
		
		setModel(model);
		model.addAttribute("message", message);
		return "director/addteacher";
	}
	
	@PostMapping("/director/addteacher")
	public String addteacher(Teacher teacher, Model model, RedirectAttributes ra) {
		String username = (teacher.getFirstname()+teacher.getLastname()).toLowerCase();
		System.out.println(username);
		if(this.userRepo.existsByUsername(username)) {
			ra.addAttribute("message", "użytkownik o loginie " + username + " istnieje");
		}else {
			UserAuth t = new UserAuth(username, passwordEncoder.encode(teacher.getLastname()), "TEACHER");
			this.userRepo.save(t);
			Subject subject = subjectRepo.findById(teacher.getIdsubject()).get();
			subject.setIdteacher(t.getId());
			subjectRepo.save(subject);
			teacher.setId(t.getId());
			teacherRepo.save(teacher);
		}
		return "redirect:/director/addteacher";
	}
	
	private void setModel(Model model) {
		model.addAttribute("teacher_list", teacherRepo.findAll());
	}
}
