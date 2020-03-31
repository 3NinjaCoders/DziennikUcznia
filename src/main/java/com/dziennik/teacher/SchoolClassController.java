package com.dziennik.teacher;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.dziennik.db.GradeRepo;
import com.dziennik.db.PupilRepo;
import com.dziennik.db.SchoolClassRepo;
import com.dziennik.db.SubjectRepo;
import com.dziennik.model.Grade;
import com.dziennik.model.NewGrade;
import com.dziennik.model.Pupil;
import com.dziennik.model.SchoolClass;
import com.dziennik.model.Subject;
import com.dziennik.model.Teacher;
import com.dziennik.view.ClassView;

@Controller
public class SchoolClassController {

	private PupilRepo pupilRepo;	
	private SubjectRepo subjectRepo;
	private GradeRepo gradeRepo;
	private SchoolClassRepo schoolClassRepo;
	
	@Autowired
	public SchoolClassController(PupilRepo pupilRepo, SubjectRepo subjectRepo, GradeRepo gradeRepo,
			SchoolClassRepo schoolClassRepo) {
		this.pupilRepo = pupilRepo;
		this.subjectRepo = subjectRepo;
		this.gradeRepo = gradeRepo;
		this.schoolClassRepo = schoolClassRepo;
	}
	
	@PostMapping("/teacher/showclass")
	public String addGrade(NewGrade ng) {
		System.out.println(ng);
		gradeRepo.save(new Grade(ng.getIdpupil(), ng.getIdsubject(), ng.getGrade()));
		return "redirect:/teacher/showclass/"+ng.getIdclass();
	}

	@GetMapping("/teacher/showclass/{id}")
	public String showclass(@PathVariable("id") Long idclass, HttpSession session, Model model) {
		List<ClassView> allPupils = new ArrayList<>();
		
		Teacher me = (Teacher) session.getAttribute("teacher");
		List<Pupil> classPupils = pupilRepo.findByIdschoolclass(idclass);
		Subject subject = subjectRepo.findById(me.getIdsubject()).get();
		
		for(Pupil p : classPupils) {

			ClassView cv = new ClassView();
			cv.setIdpupil(p.getId());
			cv.setName(p.getFirstname()+ " "+ p.getLastname());
			cv.setGrades(gradesList(p.getId(), subject.getId()));
			cv.setAverage(average(p.getId(), subject.getId()));
			allPupils.add(cv);
		}
		SchoolClass sclass = schoolClassRepo.findById(idclass).get();
		model.addAttribute("className", sclass.getName());
		model.addAttribute("subject", subject.getName());
		model.addAttribute("idsubject", subject.getId());
		model.addAttribute("idclass", idclass);
		model.addAttribute("allPupils", allPupils);
		return "/teacher/class";
	}
	
	private String gradesList(Long pupilId, Long idsubject){
		List<Grade> grades = gradeRepo.findPupilSubjectGrade(pupilId, idsubject);

		StringBuilder stringgrades = new StringBuilder();
		for(int i = 0; i < grades.size() ; i++) {
			if(i == 0)
				stringgrades.append(grades.get(i).getGrade());
			else
				stringgrades.append(" : "+grades.get(i).getGrade());
		}
		
		return stringgrades.toString();
	}
	
	private double average(Long pupilId, Long idsubject) {
		List<Grade> grades = gradeRepo.findPupilSubjectGrade(pupilId, idsubject);
		double sum = 0;
		if(grades.isEmpty())
			return 0;
		for(Grade d : grades)
			sum += d.getGrade();
		
		sum = sum/grades.size();
		sum = BigDecimal.valueOf(sum).setScale(1, RoundingMode.HALF_UP).doubleValue();
		return sum;
	}
}
