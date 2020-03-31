package com.dziennik.teacher;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.dziennik.db.SchoolClassRepo;
import com.dziennik.model.SchoolClass;

@Controller
public class HomeTeacherController {

	@Autowired
	private SchoolClassRepo schoolClassRepo;
	
	@GetMapping("/teacher/home")
	public String teacherhome(Model model){
		List<SchoolClass> classes = schoolClassRepo.findAll();
		System.out.println(classes);
		model.addAttribute("classes", classes);
		return "teacher/home";
	}
}
