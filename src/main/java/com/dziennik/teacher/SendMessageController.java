package com.dziennik.teacher;

import java.sql.Timestamp;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import com.dziennik.EventService;
import com.dziennik.db.MessageRepo;
import com.dziennik.model.Message;
import com.dziennik.model.Pupil;
import com.dziennik.model.Teacher;

@Controller
public class SendMessageController {

	@Autowired
	private MessageRepo messageRepo;
	
	@PostMapping("/teacher/message")
	public String sendMessage(Message msg, HttpSession session) {
		Teacher me = (Teacher) session.getAttribute("teacher");
		msg.setFromid(me.getId());
		msg.setTimestampmsg(new Timestamp(System.currentTimeMillis()));
		msg.setIsread(1);
		messageRepo.save(msg);
		
		return "redirect:/teacher/message/" + msg.getToid();
	}
	
	@PostMapping("/pupil/message")
	public String sendMessagePupil(Message msg, HttpSession session) {
		Pupil me = (Pupil) session.getAttribute("pupil");
		msg.setFromid(me.getId());
		msg.setTimestampmsg(new Timestamp(System.currentTimeMillis()));
		msg.setIsread(1);
		messageRepo.save(msg);
		
		return "redirect:/pupil/message/" + msg.getToid();
	}
}
