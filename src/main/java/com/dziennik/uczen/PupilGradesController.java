package com.dziennik.uczen;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

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
	
	@GetMapping("/pupil/home")
	public String pupilhome(Model model, HttpSession session) {
		List<GradesView> grades = new ArrayList<>();
		
		Pupil pupil = (Pupil) session.getAttribute("pupil");
		List<Long> subjectId = gradeRepo.getPupilDistinctSubject(pupil.getId());
		
		if(subjectId.isEmpty())
			return "pupil/home";
		
		for(Long sid : subjectId) {
			List<Grade> subjectGrades = gradeRepo.findPupilSubjectGrade(pupil.getId(), sid);
			GradesView gv = new GradesView();
			
			gv.setSubject(subjectRepo.findById(sid).get().getName());
			gv.setGrades(extractValues(subjectGrades));
			gv.setAverage(average(gv.getGrades()));
			
			grades.add(gv);
		}
		

		
		model.addAttribute("grades", grades);
		return "pupil/home";
	}
	
	private List<Double> extractValues(List<Grade> grades){
		List<Double> values = new ArrayList<>();
		
		for(Grade g : grades) {
			values.add(g.getGrade());
		}
		return values; 
	}
	
	private double average(List<Double> grades) {
		double sum = 0;
		for(Double d : grades) {
			sum += d;
		}
		return sum / grades.size();
	}
	
}
