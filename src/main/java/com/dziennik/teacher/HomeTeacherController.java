package com.dziennik.teacher;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.dziennik.EventService;
import com.dziennik.db.SchoolClassRepo;
import com.dziennik.model.SchoolClass;
import com.dziennik.model.Teacher;

@Controller
public class HomeTeacherController {

	@Autowired
	private SchoolClassRepo schoolClassRepo;
	@Autowired
	private EventService eventService;
	
	@GetMapping("/teacher/home")
	public String teacherhome(Model model, HttpSession session){
		Teacher me = (Teacher) session.getAttribute("teacher");
		List<SchoolClass> classes = schoolClassRepo.findAll();
		
		model.addAttribute("classes", classes);
		model.addAttribute("ismessge", eventService.chceckMessages(me.getId()));
		return "teacher/home";
	}
}
