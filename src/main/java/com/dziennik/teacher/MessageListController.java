package com.dziennik.teacher;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.dziennik.EventService;
import com.dziennik.db.MessageRepo;
import com.dziennik.db.PupilRepo;
import com.dziennik.db.SchoolClassRepo;
import com.dziennik.model.Message;
import com.dziennik.model.Pupil;
import com.dziennik.model.SchoolClass;
import com.dziennik.model.Teacher;
import com.dziennik.view.ClassMessageView;

@Controller
public class MessageListController {

	@Autowired
	private PupilRepo pupilRepo;
	@Autowired
	private MessageRepo messageRepo;
	@Autowired
	private SchoolClassRepo schoolClassRepo;
	@Autowired
	private EventService eventService;
	
	@GetMapping("/teacher/msglist/{idclass}")
	public String msgList(@PathVariable("idclass")Long idclass, HttpSession session, Model model) {
		Teacher me = (Teacher) session.getAttribute("teacher");
		List<Pupil> pupilList = pupilRepo.findByIdschoolclass(idclass);
		List<ClassMessageView> class_msg_view = new ArrayList<>();
		
		for(Pupil p : pupilList) {
			ClassMessageView cmv = new ClassMessageView();
			cmv.setIdpupil(p.getId());
			cmv.setPupilName(p.getFirstname() + " " + p.getLastname());
			boolean isnew = messageRepo.newMessage(p.getId(), me.getId());
			System.out.println("in teacher: " + isnew);
			cmv.setHasNewMessage(isnew ? 1 : 0);
			class_msg_view.add(cmv);
		}
		SchoolClass sc = schoolClassRepo.findById(idclass).get();
		model.addAttribute("ismessge", eventService.chceckMessages(me.getId()));
		model.addAttribute("className", sc.getName());
		model.addAttribute("cmv_list", class_msg_view);
		return "teacher/msglist";
	}
	
	@GetMapping("/teacher/message/{id}")
	public String topupilmsg(@PathVariable("id")Long idpupil, HttpSession session, Model model) {
		Teacher me = (Teacher) session.getAttribute("teacher");
		Pupil pupil = pupilRepo.findById(idpupil).get();
		
		List<Message> chat = messageRepo.findChat(me.getId(), pupil.getId());
		
		for(Message m : chat) {
			if(!m.getFromid().equals(me.getId()))
				m.setIsread(0);
		}
		messageRepo.saveAll(chat);
		
		model.addAttribute("ismessge", eventService.chceckMessages(me.getId()));
		model.addAttribute("me", me.getId());
		model.addAttribute("idpupil", pupil.getId());
		model.addAttribute("pupilName", pupil.getFirstname() + " " + pupil.getLastname());
		model.addAttribute("chat", chat);
		return "teacher/messageform";
	}
}
