package com.dziennik.director;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

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
	public String toaddteacher(Model model) {	
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
		return "director/addteacher";
	}
	
	@PostMapping("/director/addteacher")
	public String addteacher(Teacher teacher, Model model) {
		UserAuth t = new UserAuth(teacher.getFirstname(), passwordEncoder.encode(teacher.getLastname()), "TEACHER");
		this.userRepo.save(t);
		teacher.setId(t.getId());
		teacherRepo.save(teacher);
		return "redirect:/director/addteacher";
	}
	
	private void setModel(Model model) {
		model.addAttribute("teacher_list", teacherRepo.findAll());
	}
}
