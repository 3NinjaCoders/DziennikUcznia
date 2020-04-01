package com.dziennik.director;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.dziennik.db.SchoolClassRepo;
import com.dziennik.model.SchoolClass;

@Controller
public class AddClassController {
	@Autowired
	private SchoolClassRepo schoolRepo;

	@GetMapping("/director/addclass")
	public String toAddClass(Model model) {
		
		model.addAttribute("schoolClass", new SchoolClass());
		setModel(model);
		return "director/addclass";
	}
	
	@PostMapping("/director/addclass")
	public String addClass(SchoolClass schoolClass, Model model) {
		if(schoolRepo.existsByName(schoolClass.getName())) {
			model.addAttribute("message", "Klasa o takiej nazwie istnieje");
			model.addAttribute("schoolClass", schoolClass);
			setModel(model);
			return "director/addclass";
		}
		
		schoolRepo.save(schoolClass);
		return "redirect:/director/addclass";
	}
	
	private void setModel(Model model) {
		model.addAttribute("class_list", schoolRepo.findAll());
	}
}
