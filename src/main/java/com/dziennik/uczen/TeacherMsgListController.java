package com.dziennik.uczen;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.MessageCodesResolver;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.dziennik.EventService;
import com.dziennik.db.MessageRepo;
import com.dziennik.db.SubjectRepo;
import com.dziennik.db.TeacherRepo;
import com.dziennik.model.Message;
import com.dziennik.model.Pupil;
import com.dziennik.model.Teacher;
import com.dziennik.view.TeacherMsgListView;

@Controller
public class TeacherMsgListController {

	@Autowired
	private TeacherRepo teacherRepo;
	@Autowired
	private SubjectRepo subjectRepo;
	@Autowired
	private MessageRepo messageRepo;
	@Autowired
	private EventService eventService;
	
	@GetMapping("/pupil/teacherlist")
	public String teacherList(Model model, HttpSession session) {
		Pupil me = (Pupil) session.getAttribute("pupil");
		List<Teacher> allteacher = teacherRepo.findAll();
		
		List<TeacherMsgListView> tmv_list = new ArrayList<>();
		for(Teacher t : allteacher) {
			TeacherMsgListView tmv = new TeacherMsgListView();
			tmv.setIdteacher(t.getId());
			tmv.setTeacherName(t.getFirstname()+ " "+ t.getLastname());
			tmv.setSubject(subjectRepo.findById(t.getIdsubject()).get().getName());
			boolean isold = messageRepo.newMessage(t.getId(), me.getId());
			System.out.println("in pupil: " + isold);
			tmv.setHasNewMessage(isold ? 1 :0);
			tmv_list.add(tmv);
		}
		
		model.addAttribute("ismessge", eventService.chceckMessages(me.getId()));
		model.addAttribute("tmv_list", tmv_list);
		return "pupil/teacherlist";
	}
	
	@GetMapping("/pupil/message/{id}")
	public String topupilmsg(@PathVariable("id")Long idteacher, HttpSession session, Model model) {
		Pupil me = (Pupil) session.getAttribute("pupil");
		Teacher teacher = teacherRepo.findById(idteacher).get();
		
		List<Message> chat = messageRepo.findChat(me.getId(), teacher.getId());
		
		chat.sort((t1, t2) -> t1.getTimestampmsg().compareTo(t2.getTimestampmsg()));
		model.addAttribute("ismessge", eventService.chceckMessages(me.getId()));
		model.addAttribute("me", me.getId());
		model.addAttribute("idteacher", teacher.getId());
		model.addAttribute("teacherName", teacher.getFirstname() + " " + teacher.getLastname());
		model.addAttribute("chat", chat);
		return "pupil/messageform";
	}
}
