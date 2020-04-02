package com.dziennik.timesheet;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.dziennik.EventService;
import com.dziennik.db.PupilRepo;
import com.dziennik.db.SchoolClassRepo;
import com.dziennik.db.TimesheetRepo;
import com.dziennik.model.Pupil;
import com.dziennik.model.SchoolClass;
import com.dziennik.model.Teacher;
import com.dziennik.view.TimesheetView;

@Controller
public class TimesheetTeacherController {
	
	@Autowired
	private TimesheetRepo timesheetrepo;
	
	@Autowired
	private SchoolClassRepo schoolClassRepo;
	@Autowired
	private PupilRepo pupilRepo;
	@Autowired
	private EventService eventService;
	

	@GetMapping("/teacher/timesheetall")
	public String timesheetall(Model model, HttpSession session) {
		Teacher me = (Teacher) session.getAttribute("teacher");
		
		List<SchoolClass> classid = schoolClassRepo.findAll();
		
		model.addAttribute("ismessge", eventService.chceckMessages(me.getId()));
		model.addAttribute("classid", classid);
		model.addAttribute("idteacher", me.getId());
		return "teacher/timesheetall";
	}
	
	@GetMapping("/teacher/timesheet/{idteacher}/{idclass}")
	public String showClassTimesheet(@PathVariable("idteacher") Long idt,
										@PathVariable("idclass") Long idc,
										Model model,
										HttpSession session) {
		Teacher me = (Teacher) session.getAttribute("teacher");
		
		List<Pupil> pupil_list = pupilRepo.findByIdschoolclass(idc);
		
		List<TimesheetView> tsv = new ArrayList<>();
		for(Pupil p : pupil_list) {
			TimesheetView tv = new TimesheetView();
			tv.setIdpupil(p.getId());
			tv.setName(p.getFirstname() + " " + p.getLastname());
			tv.setValue(getDayasList(p.getId(), idt, idc));
			tsv.add(tv);
		}
		int mon = LocalDate.now().getMonthValue();
		int year = LocalDate.now().getYear();
		String currentmonth = LocalDate.now().getMonth().toString() +"-"+ LocalDate.now().getYear();
		model.addAttribute("currentmonthn", currentmonth);
		model.addAttribute("tsv", tsv);
		model.addAttribute("idteacher", idt);
		model.addAttribute("idclass", idc);
		model.addAttribute("mon", mon);
		model.addAttribute("year", year);
		model.addAttribute("ismessge", eventService.chceckMessages(me.getId()));
		return "teacher/timesheet";
	}
	
	@PostMapping("/teacher/timesheet")
	public String saveTimesheet(Timesheet ts) {
		Timesheet timesheet = timesheetrepo.findCurrentMonthPupilAndTeacher(ts.getIdpupil(), ts.getIdteacher(), ts.getMon(), ts.getYear());
		String v = ts.getValue();
		v = v.replaceAll(",", "");
		timesheet.setValue(v);
		
		timesheetrepo.save(timesheet);
		
		return "redirect:/teacher/timesheet/"+ ts.getIdteacher()+"/"+ts.getIdclass();
	}
	
	
	private List<Integer> getDayasList(Long idpupil, Long idteacher, Long idclass){
		LocalDate now = LocalDate.now();
		int mon = now.getMonthValue();
		int year = now.getYear();
		Timesheet ts = timesheetrepo.findCurrentMonthPupilAndTeacher(idpupil, idteacher, mon, year);
		if(ts == null) {
			Timesheet t = new Timesheet(idpupil, idclass, idteacher, mon, year, "");
			t.setVal();
			timesheetrepo.save(t);
			ts = timesheetrepo.findCurrentMonthPupilAndTeacher(idpupil, idteacher, mon, year);
		}
		String value = ts.getValue();
		List<Integer> list = new ArrayList<>();
		for(int i = 0; i < value.length(); i++) {
			list.add(Integer.parseInt(String.valueOf(value.charAt(i))));
		}
		return list;
	}
}
