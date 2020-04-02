package com.dziennik;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dziennik.db.MessageRepo;

@Service
public class EventService {

	@Autowired
	private MessageRepo messageRepo;
	
	public boolean chceckMessages(Long meId) {
		return messageRepo.amIHaveMassage(meId);
	}
}
