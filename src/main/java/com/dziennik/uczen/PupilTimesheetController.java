package com.dziennik.uczen;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.dziennik.EventService;
import com.dziennik.db.SubjectRepo;
import com.dziennik.db.TeacherRepo;
import com.dziennik.db.TimesheetRepo;
import com.dziennik.model.Pupil;
import com.dziennik.model.Subject;
import com.dziennik.model.Teacher;
import com.dziennik.timesheet.Timesheet;
import com.dziennik.view.TimesheetPupilView;

@Controller
public class PupilTimesheetController {
	
	@Autowired
	private TimesheetRepo timesheetRepo;
	@Autowired
	private TeacherRepo teacherRepo;
	@Autowired
	private SubjectRepo subjectRepo;
	@Autowired
	private EventService eventService;
	
	@GetMapping("/pupil/timesheet")
	public String timesheet(Model model, HttpSession session) {
		Pupil pupil = (Pupil) session.getAttribute("pupil");
		int mon = LocalDate.now().getMonthValue();
		int year = LocalDate.now().getYear();
		List<Teacher> teachers = teacherRepo.findAll();
		
		List<TimesheetPupilView> tpv_list = new ArrayList<>();
		for(Teacher t : teachers) {
			Timesheet timesheet = timesheetRepo.findCurrentMonthPupilAndTeacher(pupil.getId(), t.getId(), mon, year);
			if(timesheet == null) {
				Timesheet newts = new Timesheet(pupil.getId(), pupil.getIdschoolclass(), t.getId(), mon, year, "");
				newts.setVal();
				timesheetRepo.save(newts);
				timesheet = newts;
			}
			Subject subject = subjectRepo.findByIdteacher(t.getId());
			TimesheetPupilView tpv = new TimesheetPupilView(pupil.getId(), subject.getName(), (t.getFirstname()+" "+t.getLastname()), split(timesheet.getValue()));
			tpv_list.add(tpv);
		}
		model.addAttribute("ismessge", eventService.chceckMessages(pupil.getId()));
		model.addAttribute("lenMon", YearMonth.of(year, mon).lengthOfMonth());
		model.addAttribute("tpv_list", tpv_list);
		return "pupil/timesheet";
	}
	
	private List<String> split(String val){
		List<String> slist= new ArrayList<>();
		for(int i = 0; i < val.length(); i++) {
			slist.add(String.valueOf(val.charAt(i)));
		}
		return slist;
	}

}
