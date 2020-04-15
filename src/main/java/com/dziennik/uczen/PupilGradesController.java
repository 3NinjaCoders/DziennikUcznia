package com.dziennik.uczen;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.dziennik.EventService;
import com.dziennik.db.GradeRepo;
import com.dziennik.db.SubjectRepo;
import com.dziennik.model.Grade;
import com.dziennik.model.Pupil;
import com.dziennik.view.GradesView;

@Controller
public class PupilGradesController {

	@Autowired
	private GradeRepo gradeRepo;
	@Autowired
	private SubjectRepo subjectRepo;
	@Autowired
	private EventService eventService;
	
	@GetMapping("/pupil/home")
	public String pupilhome(Model model, HttpSession session) {
		Pupil pupil = (Pupil) session.getAttribute("pupil");
		model.addAttribute("ismessge", eventService.chceckMessages(pupil.getId()));
		List<GradesView> grades = new ArrayList<>();
		
		
		List<Long> subjectId = gradeRepo.getPupilDistinctSubject(pupil.getId());
		
		if(subjectId.isEmpty())
			return "pupil/home";
		
		for(Long sid : subjectId) {
			List<Grade> subjectGrades = gradeRepo.findPupilSubjectGrade(pupil.getId(), sid);
			GradesView gv = new GradesView();
			
			gv.setSubject(subjectRepo.findById(sid).get().getName());
			gv.setGrades(extractValues(subjectGrades));
			gv.setAverage(average(subjectGrades));
			
			grades.add(gv);
		}

		model.addAttribute("grades", grades);
		return "pupil/home";
	}
	
	
	
	private String extractValues(List<Grade> grades){
		StringBuilder sb = new StringBuilder();
		for(Grade g : grades) {
			sb.append(String.valueOf(g.getGrade())+ "  ");
		}
		return sb.toString(); 
	}
	
	private double average(List<Grade> subjectGrades) {
		double sum = 0;
		for(Grade g : subjectGrades) {
			sum += g.getGrade();
		}
		return sum / subjectGrades.size();
	}
	
}
